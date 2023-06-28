import { CgMenu } from "react-icons/cg";
import { Link } from "react-router-dom";

const menuItems = [
	{
		label: "Home",
		path: "",
	},
	{
		label: "Items",
		path: "items",
	},
	{
		label: "Monsters",
		path: "monsters",
	},
	{
		label: "NPC",
		path: "npc",
	},
	{
		label: "Conditions",
		path: "conditions",
	},
	{
		label: "Quests",
		path: "quests",
	},
	{
		label: "Categories",
		path: "categories",
	},
	{
		label: "Map",
		path: "map",
	},
];

export const NavBar = () => {
	return (
		<div className="navbar flex-grow-0 bg-base-100">
			<div className="navbar-start">
				<div className="dropdown">
					<span className="btn-ghost btn lg:hidden">
						<CgMenu className="h-5 w-5" />
					</span>
					<ul className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow">
						{menuItems.map(({ label, path }) => (
							<li key={path}>
								<Link to={`${path}`}>{label}</Link>
							</li>
						))}
					</ul>
				</div>
				<a className="btn-ghost btn text-xl normal-case" href="/">
					Andor's Table
				</a>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					{menuItems.map(({ label, path }) => (
						<li key={path}>
							<Link to={`${path}`}>{label}</Link>
						</li>
					))}
				</ul>
			</div>
			<div className="navbar-end" />
		</div>
	);
};
