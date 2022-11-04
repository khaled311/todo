import React, { useContext, useEffect } from "react";
import { AppCtx } from "../../context/appContext";

const Header = () => {
	const ourCTX = useContext(AppCtx);
	const darkMode = ourCTX?.dark;

	useEffect(() => {
		const root = window.document.documentElement;
		darkMode ? root.classList.add("dark") : root.classList.remove("dark");
	}, [darkMode]);

	return (
		<div onClick={() => ourCTX?.changeMode()} className={` dark:bg-blue`}>
			<div className="fixed right-9 top-5 dark:text-white cursor-pointer">
				{darkMode ? "Dark 🌛" : "Light 🌞"}
			</div>
		</div>
	);
};

export default Header;
