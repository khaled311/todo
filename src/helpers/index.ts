export const setIntoLocalStorage = (value?: any) => {
	if (!value) {
		localStorage.clear();
	} else {
		localStorage.setItem("todos", JSON.stringify(value));
	}
};

export const getTodosFromLocalStorage = () => {
	return JSON.parse(localStorage.getItem("todos") as any);
};
