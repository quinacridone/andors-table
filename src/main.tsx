import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { getDefaultStore } from "jotai";
import { Armor, Home, Items } from "@/routes";
import { load } from "@/lib";
import { databaseAtom } from "@/data";
import { ErrorPage } from "./components";

const defaultStore = getDefaultStore();

const router = createBrowserRouter([
	{
		path: "/andors-table",
		element: <Home />,
		loader: async () => {
			const db = await load();
			defaultStore.set(databaseAtom, { ...db });
			return true;
		},
		errorElement: <ErrorPage />,
		children: [
			{
				path: "items",
				element: <Items />,
				errorElement: <ErrorPage />,
				children: [
					{
						path: "body",
						element: <Armor />,
						errorElement: <ErrorPage />,
					},
					{
						path: "weapon",
						element: <Items />,
						errorElement: <ErrorPage />,
					},
				],
			},
			{
				path: "monsters",
				element: <></>,
				errorElement: <ErrorPage />,
			},
			{
				path: "npc",
				element: <></>,
				errorElement: <ErrorPage />,
			},
			{
				path: "conditions",
				element: <></>,
				errorElement: <ErrorPage />,
			},
			{
				path: "quests",
				element: <></>,
				errorElement: <ErrorPage />,
			},
			{
				path: "categories",
				element: <></>,
				errorElement: <ErrorPage />,
			},
			{
				path: "map",
				element: <></>,
				errorElement: <ErrorPage />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
