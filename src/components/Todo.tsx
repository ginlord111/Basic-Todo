"use client";
import React, { useEffect, useState } from "react";

interface TodoProps {
  name: string;
  done: boolean;
}

const Todo = () => {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [userId, setUserId] = useState<string>("");

  const handleAdd = () => {
    if (newTodo) {
      if (editingIndex !== null) {
        const updatedTodos = todos.map((todo, i) =>
          i === editingIndex ? { ...todo, name: newTodo } : todo
        );
        setTodos(updatedTodos);
        setEditingIndex(null); 
      } else {
        setTodos([...todos, { name: newTodo, done: false }]);
      }
      setNewTodo("");
    }
  };

  const handleToggle = (index: number) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDelete = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };


  const saveTodo = async () => {
    await fetch("api/todo", {
      method: "POST",
      body: JSON.stringify({ todos, userId }),
    });
  };

  useEffect(() => {
    setUserId(JSON.parse(localStorage.getItem("transactions") as string));
  }, []);

  return (
    <div className="flex items-center justify-center bg-blue-400 flex-col p-6">
      <div className="text-red-500 w-[500px] h-[400px] flex flex-col justify-start bg-white p-4 shadow-md rounded-md overflow-y-auto">
        {todos.length > 0 ? (
          todos.map((todo, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2 border-b border-gray-200"
            >
              <label className={`flex-1 ${todo.done ? "line-through" : ""}`}>
                {todo.name}
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => handleToggle(i)}
                  className="w-5 h-5 text-green-500 cursor-pointer"
                />
 
                <button
                  onClick={() => handleDelete(i)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No todos yet. Add some!</p>
        )}
      </div>

      <div className="mt-4 flex space-x-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="p-2 border rounded-lg w-64"
        />
        <button
          className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
          onClick={handleAdd}
        >
          {editingIndex !== null ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default Todo;
