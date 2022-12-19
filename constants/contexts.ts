import React from "react";

export type ProjectType = {
    id: string;
    name: string;
    userId: string;
};

export type TodoType = {
    id: string;
    task: string;
    completed: boolean;
    projectId: string;
    userId: string;
};

export type UserType = {
    id: string;
    name: string;
    email: string;
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

export type UserContextType = {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

export const UserContext = React.createContext<UserContextType | null>(null);
