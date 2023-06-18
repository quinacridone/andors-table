import { Outlet } from "react-router-dom";
import { NavBar } from "../components";

export const Home = () => {
	return (
		<>
			<NavBar />
			<Outlet />
		</>
	);
};
