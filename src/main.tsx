import { ErrorPage } from "@/components";
import { databaseAtom } from "@/data";
import { load } from "@/lib";
import { Body, Feet, Hand, Head, Home, Items, LeftRing, Neck, Other, Shield, Use, Weapon } from "@/routes";
import { getDefaultStore } from "jotai";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

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
						element: <Body />,
						errorElement: <ErrorPage />,
					},
					{
						path: "weapon",
						element: <Weapon />,
						errorElement: <ErrorPage />,
					},
					{
						path: "shield",
						element: <Shield />,
						errorElement: <ErrorPage />,
					},
					{
						path: "head",
						element: <Head />,
						errorElement: <ErrorPage />,
					},
					{
						path: "hand",
						element: <Hand />,
						errorElement: <ErrorPage />,
					},
					{
						path: "feet",
						element: <Feet />,
						errorElement: <ErrorPage />,
					},
					{
						path: "leftring",
						element: <LeftRing />,
						errorElement: <ErrorPage />,
					},
					{
						path: "neck",
						element: <Neck />,
						errorElement: <ErrorPage />,
					},
					{
						path: "use",
						element: <Use />,
						errorElement: <ErrorPage />,
					},
					{
						path: "other",
						element: <Other />,
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
