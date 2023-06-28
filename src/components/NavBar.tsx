import { Link } from "react-router-dom";

const menuItems = [
	{
		label: "Items",
		path: "items",
		subMenu: [
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
		],
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
					<label tabIndex={0} className="btn-ghost btn lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
						</svg>
					</label>
					<ul
						tabIndex={0}
						className="menu-sm dropdown-content menu rounded-box z-[100] mt-3 w-52 bg-base-100 p-2 shadow">
						{menuItems.map(({ label, path, subMenu }) => (
							<li key={path}>
								<Link to={`${path}`}>{label}</Link>
								{subMenu && subMenu.length > 0 && (
									<ul className="p-2">
										{subMenu.map((item) => (
											<li key={item.path}>
												<Link to={`${path}/${item.path}`}>{item.label}</Link>
											</li>
										))}
									</ul>
								)}
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
					{menuItems.map(({ label, path, subMenu }) => (
						<>
							{subMenu && subMenu.length > 0 && (
								<li tabIndex={0} key={path}>
									<details>
										<summary>{label}</summary>
										<ul className="menu-dropdown-toggle z-[100] p-2">
											{subMenu.map((item) => (
												<li key={item.path}>
													<Link to={`${path}/${item.path}`}>{item.label}</Link>
												</li>
											))}
										</ul>
									</details>
								</li>
							)}
							{!subMenu && (
								<li key={path}>
									<Link to={`${path}`}>{label}</Link>
								</li>
							)}
						</>
					))}
				</ul>
			</div>
			<div className="navbar-end" />
		</div>
	);
};
