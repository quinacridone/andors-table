import { Link, Outlet, useLocation } from "react-router-dom";

const menuItems = [
	{
		label: "Armor",
		path: "body",
	},
	{
		label: "Weapon",
		path: "weapon",
	},
	{
		label: "Shield",
		path: "shield",
	},
	{
		label: "Helm",
		path: "head",
	},
	{
		label: "Glove",
		path: "hand",
	},
	{
		label: "Boot",
		path: "feet",
	},
	{
		label: "Ring",
		path: "leftring",
	},
	{
		label: "Necklace",
		path: "neck",
	},
	{
		label: "Usable",
		path: "use",
	},
	{
		label: "Other",
		path: "other",
	},
];

export const Items = () => {
	const location = useLocation();

	return (
		<>
			<div className="flex justify-center">
				<div className="tabs tabs-boxed justify-center">
					{menuItems.map(({ label, path }) => (
						<Link
							key={path}
							className={`tab tab-sm ${location.pathname.includes(path) ? "tab-active" : ""}`}
							to={`${path}`}>
							{label}
						</Link>
					))}
				</div>
			</div>

			<Outlet />
		</>
	);
};
