import { useAtomValue } from "jotai";
import { useState, useEffect } from "react";
import { columns } from ".";
import { ItemTable } from "@/components";
import { databaseAtom, Item } from "@/data";

export const Weapon = () => {
	const data = useAtomValue(databaseAtom);
	const [itemsData, setItemsList] = useState<Item[]>([]);

	useEffect(() => {
		if (data) {
			const { items } = data;
			if (items) {
				const temp = items.filter((i) => i.categoryLink.inventorySlot === "weapon");
				setItemsList(temp);

				console.log(temp);
			}
		}
	}, [data]);

	return <ItemTable columns={columns} data={itemsData} />;
};
