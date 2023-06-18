export type AndorsData = {
	actorconditions: any[];
	container: any[];
	conversations: any[];
	droplists: any[];
	itemcategories: any[];
	items: Item[];
	maps: any[];
	monsters: any[];
	scripts: any[];
};

export type Item = {
	baseMarketCost: number;
	category: string;
	categoryLink: CategoryLink;
	conditionsCount: number;
	conv_links: any;
	displaytype: string;
	equipEffect: any;
	iconBg: number;
	iconID: string;
	id: string;
	name: string;
	rootLink: string;
	droplists: any[];
};

type EquipEffect = {
	increaseBlockChance: number;
};

export type CategoryLink = {
	actionType: string;
	id: string;
	inventorySlot: string;
	name: string;
	size: string;
};
