import { getTodosFromLocalStorage, setIntoLocalStorage } from "helpers";
import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import deleteIcon from "./delete.svg";
import checkedIcon from "./checked.svg";
import editIcon from "./edit.svg";
import emptyIcon from "./empty.svg";

type Todo = {
	text: string;
	id: string;
	done: boolean;
};

const TodoForm = () => {
	const [todos, setTodos] = useState<Todo[]>(getTodosFromLocalStorage() || []);
	const [showModal, setShowModel] = useState(false);
	const inputRef = useRef<any>(null);
	const inputRefModal = useRef<any>(null);

	const handleAdd = async (e: { preventDefault: () => void }): Promise<any> => {
		e.preventDefault();
		setTodos([
			...todos,
			{ id: nanoid(), text: inputRef.current.value, done: false },
		] as any);
		inputRef.current.value = "";
		inputRef.current.focus();
	};

	const handleRemove = (key: string) => {
		const newTodos = getTodosFromLocalStorage().filter(
			(item: any) => item.id !== key
		);
		setTodos(newTodos);
		setIntoLocalStorage(newTodos);

		console.log("newTodos", newTodos);
	};

	const handleUpdate = (key: string) => {
		const editedTodo = todos.filter((item: Todo) => item.id === key);
		setShowModel(true);
	};

	const handleChecked = (key: string) => {
		const localTodos = getTodosFromLocalStorage();
		const filteredTodos = localTodos.filter((item: Todo) => item.id !== key);
		const todo = localTodos.filter((item: Todo) => item.id === key)[0];
		setTodos([
			...filteredTodos,
			{
				id: todo.id,
				text: todo.text,
				done: true,
			},
		]);
	};

	const handleDeleteAll = () => {
		setIntoLocalStorage();
		setTodos(getTodosFromLocalStorage());
	};

	useEffect(() => {
		setIntoLocalStorage(todos);
	}, [todos]);

	return (
		<div className="pt-20 flex justify-center flex-col items-center gap-10">
			{showModal && (
				<div className="modal">
					<input
						id="message"
						name="message"
						type="text"
						className="text-black"
						ref={inputRefModal}
					/>
				</div>
			)}
			<h1 className="text-4xl uppercase font-bold text-transparent bg-clip-text bg-hero-pattern">
				Todo list
			</h1>
			<form onSubmit={handleAdd} className="flex gap-3">
				<input
					id="message"
					name="message"
					type="text"
					className="text-black"
					ref={inputRef}
				/>
				<button>Add</button>
			</form>

			<div className="todos">
				<ul className="w-[500px]">
					{todos?.length ? (
						todos.map((todo: { id: string; text: string; done: boolean }) => (
							<li
								key={todo.id}
								className="flex items-center justify-between mb-4"
							>
								<span className={todo.done ? "line-through" : ""}>
									{todo.text}
								</span>

								<div className="actions flex items-center gap-3">
									<span
										className="cursor-pointer w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-slate-800 transition duration-500 group"
										onClick={() => handleRemove(todo.id)}
									>
										<img
											src={deleteIcon}
											alt=""
											className="w-5 max-w-full group-hover:brightness-0 group-hover:invert transition duration-500"
										/>
									</span>
									<span
										className="cursor-pointer w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-slate-800 transition duration-500 group"
										onClick={() => handleChecked(todo.id)}
									>
										<img
											src={checkedIcon}
											alt=""
											className="w-5 max-w-full group-hover:brightness-0 group-hover:invert transition duration-500"
										/>
									</span>
									<span
										className="cursor-pointer w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-slate-800 transition duration-500 group"
										onClick={() => handleUpdate(todo.id)}
									>
										<img
											src={editIcon}
											alt=""
											className="w-5 max-w-full group-hover:brightness-0 group-hover:invert transition duration-500"
										/>
									</span>
								</div>
							</li>
						))
					) : (
						<img src={emptyIcon} alt="" className="w-full max-w-full mt-16" />
					)}
				</ul>
				{todos?.length ? (
					<button
						onClick={handleDeleteAll}
						className="block p-[10px] border border-transparent rounded-md m-auto mt-10 bg-red-900 hover:bg-transparent hover:border-red-900 transition duration-500 px-5"
					>
						Delete All
					</button>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default TodoForm;
