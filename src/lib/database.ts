import { XMLParser } from "fast-xml-parser";
import { calculateCost } from "./calculator";

export const ssr = false;
export const status = { progress: 0, maxProgress: 0 };
export let temp: any = {};

export const load = async () => {
	temp = {};
	const resources = await getListOfResources();
	await loadAllJSONResources(resources);
	return Promise.resolve(temp);
};

const getListOfResources = async () => {
	const xmlData = await fetch("/values/loadresources.xml", {
		headers: {
			"Content-Type": "text/xml",
			Accept: "text/xml",
		},
	});
	const xmlString = await xmlData.text();
	const parser = new XMLParser({
		ignoreAttributes: false,
		attributeNamePrefix: "a_",
	});
	const xml = parser.parse(xmlString);
	const resources = xml.resources.array.reduce((acc, current) => {
		acc[current["a_name"]] = current.item;
		return acc;
	}, {});
	return Promise.resolve(resources);
};

const loadAllJSONResources = async (resources) => {
	const resourcesList = [
		[resources.loadresource_itemcategories, "itemcategories"],
		[resources.loadresource_items, "items"],
		[resources.loadresource_actorconditions, "actorconditions"],
		[resources.loadresource_monsters, "monsters"],
		[resources.loadresource_droplists, "droplists"],
		[resources.loadresource_conversationlists, "conversations"],
		[resources.loadresource_quests, "quests"],
	];

	const p = resourcesList.map((r) => r[0].length).reduce((a, b) => a + b, 0);

	const counter = { progress: 0 };
	status.progress = p;
	status.maxProgress = p;

	await Promise.all(
		resourcesList.map(([loadResource, resourceName]) => loadJSONResource(loadResource, resourceName, counter))
	);
};

const loadJSONResource = async (resource, name, counter) => {
	counter.progress += resource.length;
	await Promise.all(resource.map((path) => fetchJSONData(path.replace("@", "/"), name, counter)));
	status.progress = status.progress - resource.length;
};

const fetchJSONData = async (fileName, name, counter) => {
	const jsonData = await fetch(`${fileName}.json`, {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	});
	const json = await jsonData.json();
	temp[name] = temp[name] || [];
	temp[name] = temp[name].concat(json);
	counter.progress--;
	if (counter.progress === 0) {
		linkTemp();
	}
};

const linkTemp = () => {
	temp.scripts = [];
	temp.containers = [];

	temp.maps = {};

	temp.maps.conditions = temp.actorconditions.reduce((obj, item) => Object.assign(obj, { [item.id]: item }), {});
	temp.maps.categories = temp.itemcategories.reduce((obj, item) => Object.assign(obj, { [item.id]: item }), {});
	temp.maps.droplists = temp.droplists.reduce((obj, item) => Object.assign(obj, { [item.id]: item }), {});
	temp.maps.items = temp.items.reduce((obj, item) => Object.assign(obj, { [item.id]: item }), {});
	temp.maps.monsters = temp.monsters.reduce((obj, item) => Object.assign(obj, { [item.id]: item }), {});
	temp.maps.conversations = temp.conversations.reduce((obj, item) => Object.assign(obj, { [item.id]: item }), {});
	temp.maps.quests = temp.quests.reduce((obj, item) => Object.assign(obj, { [item.id]: item }), {});
	temp.maps.spawngroups = {};
	temp.maps.containers = {};
	temp.maps.scripts = {};

	temp.actorconditions.forEach((condition) => {
		condition.iconBg = 1;
		condition.rootLink = "/conditions#";
	});

	temp.items.forEach((item, index) => {
		if (temp.maps.items[item.id] !== item) {
			console.warn("More than one item with id '" + item.id + "'");
			console.warn(item);
			temp.items.splice(index, 1, false);
		} else {
			item.displaytype = item.displaytype || "ordinary";
			item.iconBg = getItemIconBg(item);
			item.categoryLink = temp.maps.categories[item.category];
			item.rootLink = getItemRootLink(item.categoryLink);
			item.baseMarketCost = calculateCost(item, item.categoryLink.inventorySlot == "weapon");

			item.conditionsCount =
				countConditions(item.equipEffect) +
				countConditions(item.hitEffect) +
				countConditions(item.hitReceivedEffect) +
				countConditions(item.killEffect) +
				countConditions(item.useEffect);

			linkConditions(item.equipEffect, item, "equipEffect");
			linkConditions(item.hitEffect, item, "hitEffect");
			linkConditions(item.hitReceivedEffect, item, "hitReceivedEffect");
			linkConditions(item.killEffect, item, "killEffect");
			linkConditions(item.useEffect, item, "useEffect");

			item.conv_links = item.conv_links?.filter(unique);
		}
	});

	temp.items = temp.items.filter((e) => e);

	temp.containers.forEach((container) => {
		container.iconID = "items_g03_package_omi1:0";
		container.id = container.name;
		container.droplistLink = temp.maps.droplists[container.name];
		if (container.droplistLink) {
			container.droplistLink.links = container.droplistLink.links || [];
			container.droplistLink.links.push(container);
			container.droplistLink.type = "container";
		}
	});

	temp.droplists.forEach((droplist) => {
		droplist.items.forEach((item) => {
			item.droplist = droplist;
			item.link = temp.maps.items[item.itemID];
			item.link.droplists = item.link.droplists || [];
			item.link.droplists.push(item);
			item.type = droplist.type;
		});
	});
};

const getItemIconBg = (o) => {
	switch (o.displaytype) {
		case "legendary":
			return -4;
		case "extraordinary":
			return -2;
		case "rare":
			return -3;
		case "quest":
			return -1;
		default:
			return 1;
	}
};

const getItemRootLink = (category) => {
	if (category.actionType == "use") return "/items/use#";
	if (category.actionType == "equip") return "/items/" + category.inventorySlot + "#";
	return "/items/other#";
};

const countConditions = (effect, item?, type?) => {
	let count = effect?.addedConditions?.length || 0;
	count += effect?.conditionsTarget?.length || 0;
	count += effect?.conditionsSource?.length || 0;
	count += effect?.increaseCurrentAP ? 1 : 0;
	count += effect?.increaseCurrentHP ? 0.9 : 0; // for potions
	return count;
};

const linkConditions = (effect, item, type) => {
	effect?.addedConditions?.forEach((e) => linkCondition(e, item, type, "On source"));
	effect?.conditionsTarget?.forEach((e) => linkCondition(e, item, type, "On target"));
	effect?.conditionsSource?.forEach((e) => linkCondition(e, item, type, "On source"));
};

const linkCondition = (condition, item, type, aim) => {
	condition.link = temp.maps.conditions[condition.condition];
	condition.link.links = condition.link.links || [];
	const stub = getStub(item, condition, type, aim);
	condition.link.links.push(stub);
};

const getStub = (item, condition, type, aim) => {
	const { id, name, category, iconID, displaytype, rootLink } = item;
	const { chance, duration, magnitude } = condition;
	return { id, name, category, iconID, displaytype, chance, duration, magnitude, type, aim, rootLink };
};

const unique = (item, pos, self) => {
	return self.indexOf(item) == pos;
};
