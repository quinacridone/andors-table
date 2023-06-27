import { ItemIcon } from "@/components";
import { Item } from "@/data";
import { createColumnHelper } from "@tanstack/react-table";
const columnHelper = createColumnHelper<Item>();

const numberRender = (value: any) => {
	return <p className="text-end">{value}</p>;
};
export const columns = [
	columnHelper.accessor("name", {
		id: "name",
		header: () => "Name",
		cell: (info) => (
			<div className="flex items-center space-x-3">
				<ItemIcon item={info.row.original} />
				<div>
					<div className="font-bold">{info.getValue()}</div>
				</div>
			</div>
		),
	}),
	columnHelper.accessor("baseMarketCost", {
		header: () => "Price",
		cell: (info) => numberRender(info.renderValue()),
	}),
	columnHelper.accessor("equipEffect", {
		id: "attackCost",
		header: () => "Attack Cost",
		cell: (info) => numberRender(info.renderValue()?.increaseAttackCost),
		sortingFn: "alphanumeric",
	}),
	columnHelper.accessor("equipEffect", {
		id: "attackDamage",
		header: () => "Attack Damage",
		cell: (info) => {
			const min = info.renderValue()?.increaseAttackDamage?.min;
			const max = info.renderValue()?.increaseAttackDamage?.max;
			if (min === undefined && max === undefined) {
				return undefined;
			}
			if (min === max && min !== 0 && max !== 0) {
				return numberRender(min);
			}
			return numberRender(`${min}-${max}`);
		},
	}),
	columnHelper.accessor("equipEffect", {
		id: "attackChance",
		header: () => "Attack Chance",
		cell: (info) => numberRender(info.renderValue()?.increaseAttackChance),
	}),
	columnHelper.accessor("equipEffect", {
		id: "blockChance",
		header: () => "Block Chance",
		cell: (info) => numberRender(info.renderValue()?.increaseBlockChance),
	}),
	columnHelper.accessor("equipEffect", {
		id: "criticalSkill",
		header: () => "Critical Skill",
		cell: (info) => numberRender(info.renderValue()?.increaseCriticalSkill),
	}),
	columnHelper.accessor("equipEffect", {
		id: "criticalMultiplier",
		header: () => "Critical Multiplier",
		cell: (info) => numberRender(info.renderValue()?.setCriticalMultiplier),
	}),
	columnHelper.accessor("equipEffect", {
		id: "maxHP",
		header: () => "Max HP",
		cell: (info) => numberRender(info.renderValue()?.increaseMaxHP),
	}),
	columnHelper.accessor("equipEffect", {
		id: "maxAP",
		header: () => "Max AP",
		cell: (info) => numberRender(info.renderValue()?.increaseMaxAP),
	}),
	columnHelper.accessor("equipEffect", {
		id: "moveCost",
		header: () => "Move Cost",
		cell: (info) => numberRender(info.renderValue()?.increaseMoveCost),
	}),
	columnHelper.accessor("equipEffect", {
		id: "useItemCost",
		header: () => "Use Item Cost",
		cell: (info) => numberRender(info.renderValue()?.increaseUseItemCost),
	}),
	columnHelper.accessor("equipEffect", {
		id: "reEquipCost",
		header: () => "Re-equip Cost",
		cell: (info) => numberRender(info.renderValue()?.increaseReequipCost),
	}),
	columnHelper.accessor("equipEffect", {
		id: "nonWeaponDamageModifier",
		header: () => "Damage Modifier",
		cell: (info) => numberRender(info.renderValue()?.setNonWeaponDamageModifier),
	}),
	columnHelper.accessor("equipEffect", {
		id: "damageResistance",
		header: () => "Damage Resistance",
		cell: (info) => numberRender(info.renderValue()?.increaseDamageResistance),
	}),
	columnHelper.accessor("conditionsCount", {
		header: () => "Conditions",
		cell: (info) => numberRender(info.renderValue()),
	}),
	columnHelper.accessor("categoryLink", {
		header: () => "Category",
		cell: (info) => info.renderValue()?.name,
	}),
];
