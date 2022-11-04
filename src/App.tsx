import { Header, TodoForm } from "./components";
import { OurApp } from "./context/appContext";

function App() {
	return (
		<div className="bg-slate-100 dark:bg-slate-900 h-screen dark:text-white">
			<OurApp>
				<Header />
				<TodoForm />
			</OurApp>
		</div>
	);
}

export default App;
