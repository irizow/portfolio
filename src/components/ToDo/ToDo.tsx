import { useEffect, useState } from "react";
import styles from "./todo.module.css";
import { v1 as uuidv1 } from "uuid";
import trashIcon from "../../assets/icons/trash.png";

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
  const [error, setError] = useState<string>("");

  const percentageDone =
    todos.length === 0
      ? 0
      : (todos.filter((todo) => todo.status === "done").length * 100) /
        todos.length;

  const [currTodo, setCurrTodo] = useState<{
    todo: string;
    priority: Priority;
  }>({ todo: "", priority: "low" });

  const handleAdd = () => {
    setError("");
    if (!currTodo.todo)
      return setError("Ooops, looks like you tried to add an empty task");
    const id = uuidv1();
    setTodos((prev) => [
      ...prev,
      {
        id,
        todo: currTodo.todo,
        status: "pending",
        priority: currTodo.priority,
      },
    ]);
    setCurrTodo({...currTodo, todo: ''})
  };

  const handleDelete = (id: string) => {
    setError("");
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const toggleStatus = (id: string) => {
    setError("");
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
      <h3>My ToDo's</h3>
      <div className={styles.todoinput}>
          <input
            placeholder="What's on you plate?"
            onChange={(e) => setCurrTodo({ ...currTodo, todo: e.target.value })}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') ? handleAdd() : null}
            value={currTodo.todo}
            type="text"
          ></input>
          <select
          id='priority'
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
        {error && <span className={styles.error}>{error}</span>}
        <button onClick={handleAdd}>Add Todo</button>
      </div>
      <div className={styles.todolist}>
        {todos.map((todo) => (
          <TodoRow
            todo={todo}
            toggleStatus={toggleStatus}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <ProgressBar percentage={percentageDone} />
    </section>
  );
};

const TodoRow = ({
  todo,
  toggleStatus,
  handleDelete,
}: {
  todo: Todo;
  toggleStatus: (id: string) => void;
  handleDelete: (id: string) => void;
}) => {
  return (
    <div
      key={todo.id}
      className={`${todo.status === "done" ? styles.done : ""} ${styles.todorow} ${styles[todo.priority]}`}
    >
      <button
        className={styles.status_button}
        onClick={() => toggleStatus(todo.id)}
      >
        {todo.status === "done" && "x"}
      </button>{" "}
      <div className={styles.status_marker}></div>
      <p>{todo.todo}</p>
      <button
        className={styles.delete_button}
        onClick={() => handleDelete(todo.id)}
      >
        <img alt="trash icon" src={trashIcon}></img>
      </button>
    </div>
  );
};

const ProgressBar = ({ percentage }: { percentage: number }) => {
  const color =
    percentage <= 33 ? "red" : percentage < +66 ? "yellow" : "green";
  const radius = 25;
  const stroke = 6;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg className={styles.progress_bar} height={radius * 2} width={radius * 2}>
      <circle
        stroke="#eee"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="16"
        fontWeight="bold"
      >
        {Math.round(percentage)}%
      </text>
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        style={{ transition: "stroke-dashoffset 0.35s" }}
      />
    </svg>
  );
};
