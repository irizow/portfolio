import { useState } from "react";
import styles from "./todo.module.css";
import { v1 as uuidv1 } from "uuid";

const PRIORITIES = ["low", "medium", "high"] as const;

type Priority = (typeof PRIORITIES)[number];

type Todo = {
  id: string;
  todo: string;
  status: "pending" | "done";
  priority: Priority;
};

export const ToDo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currTodo, setCurrTodo] = useState<{
    todo: string;
    priority: Priority;
  }>({ todo: "", priority: "low" });

  const handleAdd = () => {
    const id = uuidv1();
    console.log("about to add a todo with theid", id);
    setTodos((prev) => [
      ...prev,
      {
        id,
        todo: currTodo.todo,
        status: "pending",
        priority: currTodo.priority,
      },
    ]);
  };

  const handleDelete = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const toggleStatus = (id: string) => {
    setTodos((prevTodos) => {
      return prevTodos.map((prevTodo) =>
        prevTodo.id === id
          ? {
              ...prevTodo,
              status: prevTodo.status === "done" ? "pending" : "done",
            }
          : prevTodo,
      );
    });
  };
  return (
    <section className={styles.tasks}>
      <div className={styles.todolist}>
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`${todo.status === "done" ? styles.done : ""} ${styles.todorow} ${styles[todo.priority]}`}
          >
            <button onClick={() => toggleStatus(todo.id)}>
              {todo.status === "done" && "x"}
            </button>{" "}
            <p>{todo.todo}</p>
            <button onClick={() => handleDelete(todo.id)}>delete</button>
          </div>
        ))}
      </div>
      <div className={styles.todoinput}>
        <label>
          <input
            placeholder="What's on you plate?"
            onChange={(e) => setCurrTodo({ ...currTodo, todo: e.target.value })}
            value={currTodo.todo}
            type="text"
          ></input>
        </label>
        <label>
          <select
            onChange={(e) =>
              setCurrTodo((todo) => ({
                ...todo,
                priority: e.target.value as Priority,
              }))
            }
          >
            {PRIORITIES.map((priority) => (
              <option value={priority}>{priority}</option>
            ))}
          </select>
        </label>
        <button onClick={handleAdd}>Add Todo</button>
      </div>
    </section>
  );
};
