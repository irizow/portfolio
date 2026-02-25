import { Todo } from "./ToDo";

export const LOCAL_STORAGE_KEY = "todos";

export const saveTodosToLocalStorage = (todos: Todo[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
};

export const loadTodosFromLocalStorage = (): Todo[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};
