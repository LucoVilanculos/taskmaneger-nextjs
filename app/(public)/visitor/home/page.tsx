"use client";

import { useState } from "react";
import { Plus, Trash } from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TaskProps } from "../../../../types/taskprops";

export const VisitorPage = () => {
  const [task, setTasks] = useState<TaskProps[]>([]);
  const [taskText, setTaskText] = useState("");
  const router = useRouter()

  const handleAdd = () => {
    const trimmed = taskText.trim();
    if (!trimmed) return;

    const newTask: TaskProps = {
      id: Date.now().toString(),
      text: trimmed,
      done: false,
      createdAt: new Date().toLocaleString(),
    };

    setTasks((prev) => [...prev, newTask]);
    setTaskText("");
  };

  const handleToggle = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleLogin = () => {
    router.push('/auth/register')
  }

  const handleRegister = () => {
    router.push('/auth/register')
  }


  return (
    <div className="min-h-screen bg-slate-200 p-4 flex flex-col gap-6">
      <div className="flex justify-end gap-2">
        <Button
          onClick={handleLogin}
          className="bg-cyan-500 text white hover:bg-cyan-700 w-26"
        >
          Login
        </Button>

        <Button
          onClick={handleRegister}
          className="bg-cyan-500 text white hover:bg-cyan-700 w-25"
        >
          Register
        </Button>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-l from-cyan-900 via-cyan-500 to-cyan-800"
      >
        Welcome
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }} 
        className="text-2xl md:text-4xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-l from-cyan-900 via-cyan-500 to-cyan-800 font-bold"
      >
        What You Will Do?
      </motion.h2>

      <div className="flex gap-2">
        <Input
          placeholder="Add a task..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="flex-1 font-medium text-cyan-950"
        />
        <Button onClick={handleAdd} className="hover:bg-blue-400 w-15 bg-cyan-600">
          <Plus className="h-4 w-10" />
        </Button>
      </div>

      {/* Lista de tarefas */}
      <ul className="space-y-3">
        <AnimatePresence>
        {task.map((task) => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between bg-gradient-to-l from-cyan-900 via-cyan-500 to-cyan-800 px-4 py-2 rounded-3xl shadow text-white"
          >
            <div
              className="flex flex-col flex-1 cursor-pointer"
              onClick={() => handleToggle(task.id)}
            >
              <span
                className={`text-lg select-none ${
                  task.done ? "line-through text-green-400" : ""
                }`}
              >
                {task.text}
              </span>
              <p className="text-sm text-gray-400">{task.createdAt}</p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(task.id)}
              className="ml-4"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </motion.li>
        ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};
export default VisitorPage;
