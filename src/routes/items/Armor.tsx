import { ItemIcon, ItemTable } from "@/components";
import { Item } from "@/data";
import { createColumnHelper } from "@tanstack/react-table";
import { useAtomValue } from "jotai";
import { databaseAtom } from "@/data";
import { useEffect, useState } from "react";

const columnHelper = createColumnHelper<Item>();

const columns = [
	columnHelper.accessor((row) => row, {
		id: (info) => info.column.id,
		header: () => "Icon",
		cell: (info) => <ItemIcon item={info.getValue()} />,
	}),
	columnHelper.accessor("name", {
		header: () => "Name",
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor("baseMarketCost", {
		header: () => "Price",
		cell: (info) => info.renderValue(),
	}),
	columnHelper.accessor("category", {
		header: () => "Category",
		cell: (info) => info.renderValue(),
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
			}
		}
	}, [data]);

	return <div>{<ItemTable columns={columns} data={armorData} />}</div>;
};
