import { create } from "zustand";
import { TodoItem } from "../types";

interface TodoList {
    todoList: TodoItem[],
    setTodoList: (newTodoList: TodoItem[]) => void
}

const useTodoList = create<TodoList>((set) => ({
    todoList: [],
    setTodoList: (newTodoList: TodoItem[])=> set({todoList: newTodoList})
}))

export default useTodoList