import React, { useState } from "react";
import "./App.css"; // Make sure to import your CSS file here!

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");

  // Add & Update Todo
  const getData = (e) => {
    e.preventDefault();
    if (todo.trim() === "") return;

    if (editId === null) {
      const newTodo = {
        id: Date.now(),
        text: todo,
        isCompleted: false,
      };
      setTodos([...todos, newTodo]);
    } else {
      const updatedTodos = todos.map((item) =>
        item.id === editId ? { ...item, text: todo } : item
      );
      setTodos(updatedTodos);
      setEditId(null);
    }
    setTodo("");
  };

  // Delete Todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  // Edit Todo
  const editTodo = (item) => {
    setEditId(item.id);
    setTodo(item.text);
  };

  // Complete Todo
  const toggleComplete = (id) => {
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updatedTodos);
  };

  // Filter Todos
  const filteredTodos = todos.filter((item) => {
    if (filter === "active") return !item.isCompleted;
    if (filter === "completed") return item.isCompleted;
    return true;
  });

  return (
    <div className="todo-app-container">
      <h1 className="todo-title">Task Manager</h1>

      <form className="todo-form" onSubmit={getData}>
        <input
          className="todo-input"
          type="text"
          placeholder="What needs to be done?"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button className="todo-btn submit-btn" type="submit">
          {editId === null ? "Add" : "Update"}
        </button>
      </form>

      <div className="todo-filters">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === "active" ? "active" : ""}`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`filter-btn ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map((item) => (
          <li
            key={item.id}
            className={`todo-item ${item.isCompleted ? "completed" : ""}`}
          >
            <div className="todo-item-left">
              <input
                className="todo-checkbox"
                type="checkbox"
                checked={item.isCompleted}
                onChange={() => toggleComplete(item.id)}
              />
              <span className="todo-text">{item.text}</span>
            </div>

            <div className="todo-item-actions">
              <button
                className="todo-btn edit-btn"
                onClick={() => editTodo(item)}
              >
                Edit
              </button>
              <button
                className="todo-btn delete-btn"
                onClick={() => deleteTodo(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      
      {filteredTodos.length === 0 && (
        <p className="empty-state">No tasks to display here!</p>
      )}
    </div>
  );
}

export default App;