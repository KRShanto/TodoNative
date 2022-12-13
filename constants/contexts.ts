import React from "react";

export type ProjectType = {
    name: string;
};

export type TodoType = {
    task: string;
    completed: boolean;
    project: string;
};

export type TodoContextType = {
    todos: TodoType[];
    setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

export const TodoContext = React.createContext<TodoContextType | null>(null);

export type ProjectContextType = {
    projects: ProjectType[];
    setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>;
};

export const ProjectContext = React.createContext<ProjectContextType | null>(
    null
);
