import React, { useState } from 'react';

interface Todo {
	id: number;
	text: string;
	completed: boolean;
}

export default function Todo() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [input, setInput] = useState('');

	const handleAddTodo = () => {
		if (input.trim() === '') return;

		const newTodo: Todo = {
			id: Date.now(),
			text: input,
			completed: false,
		};

		setTodos([...todos, newTodo]);
		setInput('');
	};

	const handleToggleTodo = (id: number) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo,
			),
		);
	};

	const handleDeleteTodo = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	return (
		<div className="max-w-md mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Todo List</h1>

			<div className="flex mb-4">
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
					className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none"
					placeholder="Add a new todo..."
				/>
				<button
					onClick={handleAddTodo}
					className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
				>
					Add
				</button>
			</div>

			<ul className="space-y-2">
				{todos.map((todo) => (
					<li
						key={todo.id}
						className="flex items-center justify-between p-3 border rounded-md"
					>
						<div className="flex items-center">
							<input
								type="checkbox"
								checked={todo.completed}
								onChange={() => handleToggleTodo(todo.id)}
								className="mr-2 h-4 w-4"
							/>
							<span
								className={
									todo.completed
										? 'line-through text-gray-500'
										: ''
								}
							>
								{todo.text}
							</span>
						</div>
						<button
							onClick={() => handleDeleteTodo(todo.id)}
							className="text-red-500 hover:text-red-700"
						>
							Delete
						</button>
					</li>
				))}
			</ul>

			{todos.length === 0 && (
				<p className="text-center text-gray-500 mt-4">
					No todos yet. Add one above!
				</p>
			)}
		</div>
	);
}
