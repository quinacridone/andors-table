import { ItemTable } from "@/components";
import { Item, databaseAtom } from "@/data";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { columns } from ".";

export const Body = () => {
	const itemType = "body";
	const data = useAtomValue(databaseAtom);
	const [itemsData, setItemsList] = useState<Item[]>([]);

	useEffect(() => {
		if (data) {
			const { items } = data;
			if (items) {
				const temp = items.filter((i) => i.categoryLink.inventorySlot === itemType);
				setItemsList(temp);
				console.log(temp);
			}
		}
	}, [data]);

	return <ItemTable columns={columns} data={itemsData} category={itemType} />;
};
