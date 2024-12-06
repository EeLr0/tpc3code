import React, { useReducer, useState } from "react";

function AppWuseReducer() {
    const [filter, setFilter] = useState("all"); // Opções: "all", "pending", "completed"
    const [newTaskName, setNewTaskName] = useState("");
    // estado inicial
    const initialTasksState = [
        { id: 1, name: "Aprender useState", completed: false },
        { id: 2, name: "Criar exemplo prático", completed: true },
    ];
    // ações a serem realizadas
    const actions = {
        ADD_TASK: 'ADD_TASK',
        TOGGLE_TASK: 'TOGGLE_TASK',
        REMOVE_TASK: 'REMOVE_TASK',
        SET_FILTER: 'SET_FILTER'
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case actions.ADD_TASK:
                return [
                    ...state,
                    {
                        id: Date.now(),
                        name: action.payload.name,
                        completed: false
                    }
                ];
            case actions.TOGGLE_TASK:
                return state.map((task) =>
                    task.id === action.payload.id ? { ...task, completed: !task.completed } : task
                );
            case actions.REMOVE_TASK:
                return state.filter((task) => task.id !== action.payload.id);
            case actions.SET_FILTER:
                if (action.payload === "pending") {
                    return state.filter((task) => !task.completed);
                }
                if (action.payload === "completed") {
                    return state.filter((task) => task.completed);
                }
                return state; // return all tasks if "all" is selected
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialTasksState);

    const handleAddTask = () => {
        dispatch({ type: actions.ADD_TASK, payload: { name: newTaskName } });
        setNewTaskName(""); // Reset task name after dispatch
    };

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
                <button onClick={handleAddTask}>Adicionar</button>
            </div>
            <div className="comandos">
                <button onClick={() => setFilter("all")}>Todos</button>
                <button onClick={() => setFilter("pending")}>Pendentes</button>
                <button onClick={() => setFilter("completed")}>Concluídas</button>
            </div>
            <ul>
                {state.filter((task) => {
                    if (filter === "pending") return !task.completed;
                    if (filter === "completed") return task.completed;
                    return true;
                }).map((task) => (
                    <li key={task.id}>
                        <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                            {task.name}
                        </span>
                        <button onClick={() => dispatch({ type: actions.TOGGLE_TASK, payload: { id: task.id } })}>
                            {task.completed ? "Desfazer" : "Concluir"}
                        </button>
                        <button onClick={() => dispatch({ type: actions.REMOVE_TASK, payload: { id: task.id } })}>Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AppWuseReducer;
