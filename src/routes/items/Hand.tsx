import { ItemTable } from "@/components";
import { Item, databaseAtom } from "@/data";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { columns } from ".";

export const Hand = () => {
	const data = useAtomValue(databaseAtom);
	const [itemsData, setItemsList] = useState<Item[]>([]);

	useEffect(() => {
		if (data) {
			const { items } = data;
			if (items) {
				const temp = items.filter((i) => i.categoryLink.inventorySlot === "hand");
				setItemsList(temp);
			}
		}
	}, [data]);

	return <div>{<ItemTable columns={columns} data={itemsData} />}</div>;
};
