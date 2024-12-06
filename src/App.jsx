import React, { useState } from "react";
import './App.css';

function App() {
    const [tasks, setTasks] = useState([
        { id: 1, name: "Aprender useState", completed: false },
        { id: 2, name: "Criar exemplo prático", completed: true },
    ]);
    const [filter, setFilter] = useState("all"); // Opções: "all", "pending", "completed"
    const [newTaskName, setNewTaskName] = useState("");

    const addTask = () => {
        if (newTaskName.trim()) {
            const newTask = {
                id: Date.now(),
                name: newTaskName,
                completed: false,
            };
            setTasks([...tasks, newTask]);
            setNewTaskName("");
        }
    };

    const toggleTask = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const removeTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "pending") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    });

    return (
        <div className="main">
            <h1>Gerenciador de Tarefas</h1>
            <div>
                <input
                    type="text"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    placeholder="Nova tarefa"
                />
                <button onClick={addTask}>Adicionar</button>
            </div>
            <div className="comandos">
                <button onClick={() => setFilter("all")}>Todos</button>
                <button onClick={() => setFilter("pending")}>Pendentes</button>
                <button onClick={() => setFilter("completed")}>Concluídas</button>
            </div>
            <ul>
                {filteredTasks.map((task) => (
                    <li key={task.id}>
                        <span
                            style={{
                                textDecoration: task.completed ? "line-through" : "none",
                            }}
                        >
                            {task.name}
                        </span>
                        <button onClick={() => toggleTask(task.id)}>
                            {task.completed ? "Desfazer" : "Concluir"}
                        </button>
                        <button onClick={() => removeTask(task.id)}>Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
