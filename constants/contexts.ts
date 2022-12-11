import React from "react";

export const TodoProjectContext =
    React.createContext<TodoProjectContextType | null>(null);

export type TodoProjectType = {
    name: string;
    todos: {
        name: string;
        completed: boolean;
    }[];
};

export type TodoProjectContextType = {
    projects: TodoProjectType[];
    setProjects: React.Dispatch<React.SetStateAction<TodoProjectType[]>>;
};
