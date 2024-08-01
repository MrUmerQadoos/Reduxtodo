"use client";

import TodoForm from "@/components/TodoForm";
import ToggleMode from "@/components/ToggleMode";
import TodoLists from "./TodoLists";

const MainLayout: React.FC = () => {
  return (
    <div className="relative z-20 pt-[78px]">
      <div className="min-h-screen bg-transparent text-white  flex flex-col items-center ">
        <header className="flex flex-row items-center justify-between lg:w-[540px] md:w-[380px] w-[280px] mb-4">
          <h1 className="text-5xl leading-[50px] font-bold text-gray-100">
            Todo
          </h1>
          <ToggleMode />
        </header>

        <div>
          <TodoForm />
        </div>
        <div>
          <TodoLists />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
