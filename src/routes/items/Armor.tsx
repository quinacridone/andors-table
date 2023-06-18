import { ItemIcon, ItemTable } from "@/components";
import { Item } from "@/data";
import { createColumnHelper } from "@tanstack/react-table";
import { useAtomValue } from "jotai";
import { databaseAtom } from "@/data";
import { useEffect, useState } from "react";

const columnHelper = createColumnHelper<Item>();

const columns = [
	columnHelper.accessor((row) => row, {
		id: "name",
		header: () => "Name",
		cell: (info) => (
			<div className="flex items-center space-x-3">
				<ItemIcon item={info.getValue()} />
				<div>
					<div className="font-bold">{info.getValue().name}</div>
					<div className="text-sm opacity-50">{info.getValue().category}</div>
				</div>
			</div>
		),
	}),
	columnHelper.accessor("equipEffect", {
		id: "attackCost",
		header: () => "Attack Cost",
		cell: (info) => info.renderValue()?.attackCost,
	}),
	columnHelper.accessor("equipEffect", {
		id: "attackDamageMin",
		header: () => (
			<span className="tooltip" data-tip="Attack Damage">
				Attack Damage [min]
			</span>
		),
		cell: (info) => info.renderValue()?.increaseAttackDamage?.min,
	}),
	columnHelper.accessor("equipEffect", {
		id: "attackDamageMax",
		header: () => (
			<span className="tooltip" data-tip="Attack Damage">
				Attack Damage [max]
			</span>
		),
		cell: (info) => info.renderValue()?.increaseAttackDamage?.max,
	}),
	columnHelper.accessor("equipEffect", {
		id: "attackChance",
		header: () => "Attack Chance",
		cell: (info) => info.renderValue()?.increaseAttackChance,
	}),
	columnHelper.accessor("equipEffect", {
		id: "blockChance",
		header: () => "Block Chance",
		cell: (info) => info.renderValue()?.increaseBlockChance,
	}),
	columnHelper.accessor("equipEffect", {
		id: "criticalSkill",
		header: () => "Critical Skill",
		cell: (info) => info.renderValue()?.increaseCriticalSkill,
	}),
	columnHelper.accessor("equipEffect", {
		id: "criticalMultiplier",
		header: () => "Critical Multiplier",
		cell: (info) => info.renderValue()?.setCriticalMultiplier,
	}),
	columnHelper.accessor("equipEffect", {
		id: "maxHP",
		header: () => "Max HP",
		cell: (info) => info.renderValue()?.increaseMaxHP,
	}),
	columnHelper.accessor("equipEffect", {
		id: "maxAP",
		header: () => "Max AP",
		cell: (info) => info.renderValue()?.increaseMaxAP,
	}),
	columnHelper.accessor("equipEffect", {
		id: "moveCost",
		header: () => "Move Cost",
		cell: (info) => info.renderValue()?.increaseMoveCost,
	}),
	columnHelper.accessor("equipEffect", {
		id: "useItemCost",
		header: () => "Use Item Cost",
		cell: (info) => info.renderValue()?.increaseUseItemCost,
	}),
	columnHelper.accessor("equipEffect", {
		id: "reEquipCost",
		header: () => "Re-equip Cost",
		cell: (info) => info.renderValue()?.increaseReequipCost,
	}),
	columnHelper.accessor("equipEffect", {
		id: "nonWeaponDamageModifier",
		header: () => "Non-weapon Damage Modifier",
		cell: (info) => info.renderValue()?.setNonWeaponDamageModifier,
	}),
	columnHelper.accessor("equipEffect", {
		id: "damageResistance",
		header: () => "Damage Resistance",
		cell: (info) => info.renderValue()?.setNonWeaponDamincreaseDamageResistanceageModifier,
	}),
	columnHelper.accessor("conditionsCount", {
		header: () => "Conditions",
		cell: (info) => info.renderValue(),
	}),
	columnHelper.accessor("baseMarketCost", {
		header: () => "Price",
		cell: (info) => info.renderValue(),
	}),
	columnHelper.accessor("categoryLink", {
		header: () => "Category",
		cell: (info) => info.renderValue()?.name,
	}),
];

export const Armor = () => {
	const data = useAtomValue(databaseAtom);
	const [armorData, setArmorData] = useState<Item[]>([]);

	useEffect(() => {
		if (data) {
			const { items } = data;
			if (items) {
				const temp = items.filter((i) => i.categoryLink.inventorySlot === "body");
				setArmorData(temp);
				console.log(temp);
			}
		}
	}, [data]);

	return <div>{<ItemTable columns={columns} data={armorData} />}</div>;
};
