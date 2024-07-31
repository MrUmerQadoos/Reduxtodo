"use client";

import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, toggleTodo } from "@/redux/TodoSlice";
import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

const TodoLists = () => {
  const todoList = useSelector((state: any) => state.todo.todoList);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const handleToggle = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleClearCompleted = () => {
    const completedTodos: Todo[] = todoList.filter(
      (todo: Todo) => todo.isCompleted
    );
    completedTodos.forEach((todo: Todo) => dispatch(deleteTodo(todo.id)));
  };

  const filteredTodos = todoList.filter((item: Todo) => {
    if (filter === "active") return !item.isCompleted;
    if (filter === "completed") return item.isCompleted;
    return true; // For 'all'
  });

  const incompleteCount = todoList.filter(
    (item: Todo) => !item.isCompleted
  ).length;

  return (
    <div className="m-4 rounded-lg bg-white dark:bg-[#25273d] flex flex-col items-center bg-transparent lg:w-[540px] md:w-[380px] w-[280px] shadow-md">
      {/* Todo list items */}
      <div className="w-full">
        {filteredTodos.length > 0 && (
          <div>
            {filteredTodos.map((item: Todo) => (
              <motion.div
                key={item.id}
                className={`text-card-foreground px-4 py-2 flex items-center border rounded-md bg-transparent border-[#edeef6] dark:border-[#313346] justify-between text-[#4e597a] dark:text-[#bcb2b4] ${
                  item.isCompleted ? "line-through text-gray-400" : ""
                }`}
                style={{ height: "67px" }}
                onClick={() => handleToggle(item.id)}
              >
                <div
                  className={`ml-2 w-[25px] h-[25px] border rounded-full flex items-center justify-center cursor-pointer ${
                    item.isCompleted
                      ? "bg-gradient-to-r from-[#66c8fe] to-[#b269f4]"
                      : "bg-transparent border-gray-400"
                  }`}
                >
                  {item.isCompleted && (
                    <FaCheck className="text-white text-[10px]" />
                  )}
                </div>
                <p className="ml-4 flex-1 text-sm md:text-base">{item.text}</p>
                <motion.div
                  onClick={() => dispatch(deleteTodo(item.id))}
                  className="text-lg mr-2 text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer transition-transform duration-300"
                  whileHover={{ scale: 1.4, rotate: 15 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <RxCross2 />
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer with buttons */}
      <div className="w-full">
        {/* For large screens: all five buttons in one row */}
        <div className="hidden lg:flex lg:flex-row lg:justify-between lg:items-center lg:p-6 lg:gap-x-4  w-full">
          <span className="text-sm lg:text-base dark:lg:text-gray-300 text-gray-800">
            {incompleteCount} item{incompleteCount !== 1 ? "s" : ""} left
          </span>
          <div className="flex flex-row gap-x-2">
            <button
              onClick={() => setFilter("all")}
              className={`text-sm lg:text-base font-medium ${
                filter === "all" ? "text-blue-500" : "text-gray-500"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`text-sm lg:text-base font-medium ${
                filter === "active" ? "text-blue-500" : "text-gray-500"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`text-sm lg:text-base font-medium ${
                filter === "completed" ? "text-blue-500" : "text-gray-500"
              }`}
            >
              Completed
            </button>
          </div>
          <button
            onClick={() => handleClearCompleted()}
            className="text-sm lg:text-base font-medium text-gray-500 hover:text-red-600 transition-colors duration-300"
          >
            Clear Completed
          </button>
        </div>

        {/* For medium and small screens: separate containers */}
        <div className="flex flex-col lg:hidden w-full mb-4">
          {/* Upper container */}
          <div className="  flex flex-row justify-between items-center mb-4 border rounded-lg border-[#edeef6] bg-white dark:bg-[#25273d] dark:border-[#313346] text-gray-400 dark:text-gray-500 py-2 px-4">
            <span className="text-sm dark:lg:text-gray-300 text-gray-800  lg:text-base">
              {incompleteCount} item{incompleteCount !== 1 ? "s" : ""} left
            </span>
            <button
              onClick={() => handleClearCompleted()}
              className="text-sm lg:text-base font-medium text-gray-500 hover:text-red-600 transition-colors duration-300"
            >
              Clear Completed
            </button>
          </div>

          {/* Lower container */}
          <div className="flex flex-row justify-center gap-x-4">
            <button
              onClick={() => setFilter("all")}
              className={`text-sm lg:text-base font-medium ${
                filter === "all" ? "text-blue-500" : "text-gray-500"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`text-sm lg:text-base font-medium ${
                filter === "active" ? "text-blue-500" : "text-gray-500"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`text-sm lg:text-base font-medium ${
                filter === "completed" ? "text-blue-500" : "text-gray-500"
              }`}
            >
              Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoLists;
