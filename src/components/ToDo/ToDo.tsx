import React, { SetStateAction, useEffect, useState } from "react";
import styles from "./todo.module.css";
import { v1 as uuidv1 } from "uuid";
import trashIcon from "../../assets/icons/trash.png";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  FieldValue,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "../../hooks/useAuth";
import {
  loadTodosFromLocalStorage,
  LOCAL_STORAGE_KEY,
  saveTodosToLocalStorage,
} from "./utils";

const PRIORITIES = ["low", "medium", "high"] as const;

type Priority = (typeof PRIORITIES)[number];

export type Todo = {
  id: string;
  todo: string;
  completed: boolean;
  priority: Priority;
  createdAt: FieldValue;
};

export const ToDo = ({
  setIsLogin,
}: {
  setIsLogin: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [error, setError] = useState<string>("");
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (!user) return loadTodosFromLocalStorage();
    return [];
  });
  const userName = user?.displayName;
  const posApostrophe =
    userName?.charAt(userName.length - 1) === "s" ? "'" : "'s";
  const todosOwner = user
    ? userName
      ? `${userName + posApostrophe}`
      : "Your"
    : "Iris'";

  useEffect(() => {
    if (!user) {
      saveTodosToLocalStorage(todos);
    }
  }, [todos, user]);

  useEffect(() => {
    if (!user) return;

    const migrateLocalTodos = async () => {
      const localTodos = loadTodosFromLocalStorage();

      if (localTodos.length > 0) {
        try {
          for (const todo of localTodos) {
            await addDoc(collection(db, "users", user.uid, "todos"), {
              todo: todo.todo,
              completed: todo.completed,
              priority: todo.priority,
              createdAt: serverTimestamp(),
            });
          }
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        } catch (err) {
          console.error("Failed to migrate local todos", err);
        }
      }
    };

    migrateLocalTodos();

    const q = query(
      collection(db, "users", user.uid, "todos"),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todoList = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as Todo,
      );
      console.log("tdl", todoList);
      setTodos(todoList);
    });

    return () => unsubscribe();
  }, [user]);

  const percentageDone =
    todos.length === 0
      ? 0
      : (todos.filter((todo) => todo.completed === true).length * 100) /
        todos.length;

  const [currTodo, setCurrTodo] = useState<{
    todo: string;
    priority: Priority;
  }>({ todo: "", priority: "low" });

  const handleAdd = async () => {
    setError("");
    if (!currTodo.todo.trim())
      return setError("Ooops, looks like you tried to add an empty task");
    const todo = {
      todo: currTodo.todo,
      completed: false,
      priority: currTodo.priority,
      createdAt: serverTimestamp(),
    };
    if (user) {
      await addDoc(collection(db, "users", user.uid, "todos"), todo);
    } else {
      setTodos((prev) => [...prev, { ...todo, id: uuidv1() }]);
    }
    setCurrTodo({ ...currTodo, todo: "" });
  };

  const handleDelete = async (id: string) => {
    setError("");
    if (user) {
      await deleteDoc(doc(db, "users", user.uid, "todos", id));
    } else {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
    }
  };

  const toggleStatus = async (id: string, completed: boolean) => {
    setError("");
    if (user) {
      await updateDoc(doc(db, "users", user.uid, "todos", id), {
        completed: !completed,
      });
    } else {
      setTodos((prevTodos) => {
        return prevTodos.map((prevTodo) =>
          prevTodo.id === id
            ? {
                ...prevTodo,
                completed: !prevTodo.completed,
              }
            : prevTodo,
        );
      });
    }
  };
  return (
    <section className={styles.tasks}>
      <h3>{todosOwner} ToDos</h3>
      <div className={styles.todoinput}>
        <input
          placeholder="What's on you plate?"
          onChange={(e) => setCurrTodo({ ...currTodo, todo: e.target.value })}
          onKeyDown={(e) => (e.key === "Enter" ? handleAdd() : null)}
          value={currTodo.todo}
          type="text"
        ></input>
        <select
          id="priority"
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
      {!user && (
        <button className={styles.login} onClick={() => setIsLogin(true)}>
          Login to store todos
        </button>
      )}
    </section>
  );
};

const TodoRow = ({
  todo,
  toggleStatus,
  handleDelete,
}: {
  todo: Todo;
  toggleStatus: (id: string, completed: boolean) => void;
  handleDelete: (id: string) => void;
}) => {
  return (
    <div
      key={todo.id}
      className={`${todo.completed ? styles.done : ""} ${styles.todorow} ${styles[todo.priority]}`}
    >
      <button
        className={styles.status_button}
        onClick={() => toggleStatus(todo.id, todo.completed)}
      >
        {todo.completed && "x"}
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
