import { Item } from "@/data";
import {
	ColumnDef,
	SortingState,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface Props {
	data: Item[];
	columns: ColumnDef<Item, any>[];
	category?: string;
}

export const ItemTable = ({ data, columns, category }: Props) => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnVisibility, setColumnVisibility] = useState({});
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnVisibility,
			columnPinning: {
				left: ["name"],
			},
		},
		onColumnVisibilityChange: (v) => {
			console.log(v);
			setColumnVisibility(v);
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	useEffect(() => {
		if (category === "body") {
			setColumnVisibility({
				criticalMultiplier: false,
				maxAP: false,
				nonWeaponDamageModifier: false,
			});
		}
	}, []);

	return (
		<>
			<div className="m-2 h-full">
				<div className="overflow-auto" style={{ height: "calc(100vh - 200px)" }}>
					{/* <table className="table-xs table-zebra table border-collapse text-xs"> */}
					<table className="table-xs table">
						<thead className="sticky top-0 z-20 bg-neutral-content">
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<th className="whitespace-nowrap p-2" key={header.id} colSpan={header.colSpan}>
												{header.isPlaceholder ? null : (
													<div
														className={header.column.getCanSort() ? "cursor-pointer select-none" : ""}
														onClick={header.column.getToggleSortingHandler()}>
														{flexRender(header.column.columnDef.header, header.getContext())}
														{{
															asc: " 🔼",
															desc: " 🔽",
														}[header.column.getIsSorted() as string] ?? null}
													</div>
												)}
											</th>
										);
									})}
								</tr>
							))}
						</thead>
						<tbody>
							{table.getRowModel().rows.map((row) => {
								return (
									<tr key={row.id} className="hover">
										{row.getVisibleCells().map((cell) => {
											return (
												<td className="whitespace-nowrap border border-secondary p-2" key={cell.id}>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</td>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};
