import { createContext, useState } from "react";

interface AppContextInterface {
	dark: boolean;
	changeMode: () => void;
}

export const AppCtx = createContext<AppContextInterface | null>(null);

export const OurApp = (props: any) => {
	const [dark, setDark] = useState(true);
	const AppContext: AppContextInterface = {
		dark: dark,
		changeMode: () => {
			setDark((old) => !old);
		},
	};

	return <AppCtx.Provider value={AppContext}>{props.children}</AppCtx.Provider>;
};
