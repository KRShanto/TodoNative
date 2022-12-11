import {
    FlatList,
    Text,
    View,
    StyleSheet,
    TextInput,
    Button,
} from "react-native";
import { useState } from "react";
import { useContext } from "react";
import { TodoProjectContext } from "../constants/contexts";
import React from "react";

export default function Project({ route }: { route: any }) {
    const [todoText, setTodoText] = useState("");
    const projectContext = useContext(TodoProjectContext);
    const todoTextRef = React.useRef<TextInput>(null);
    const projectName = route.params.projectName;
    const currentProject = projectContext?.projects.find(
        (project) => project.name === projectName
    );

    const sortedTodos = currentProject?.todos.sort((a, b) => {
        if (a.completed && !b.completed) {
            return 1;
        }
        if (!a.completed && b.completed) {
            return -1;
        }
        return 0;
    });

    function handleCreateTodo() {
        if (!projectContext) {
            return;
        }
        // check if the todo text is empty
        if (todoText === "") {
            console.log("Todo text is empty");
            return;
        }
        // create a new todo
        const newTodo = {
            name: todoText,
            completed: false,
        };

        if (!currentProject) {
            return;
        }

        // create a new project with the new todo
        const newProject = {
            name: projectName,
            todos: [...currentProject.todos, newTodo],
        };

        // remove the old project
        const newProjects = projectContext.projects.filter(
            (project) => project.name !== projectName
        );

        // add the new project to the projects array
        projectContext.setProjects([...newProjects, newProject]);

        // clear the todo text
        setTodoText("");

        // unfocus the input
        todoTextRef.current?.blur();
    }

    return (
        <View style={styles.container}>
            <Text>{projectName}</Text>

            <View>
                {/* Show a form to create new todos */}
                <Text>Create a new todo</Text>
                <TextInput
                    onChangeText={setTodoText}
                    value={todoText}
                    placeholder="Enter your task"
                    ref={todoTextRef}
                />
                <Button title="Create" onPress={handleCreateTodo} />
            </View>

            {/* Show a list of todos */}
            <View>
                <Text>Todos</Text>
                <FlatList
                    data={sortedTodos}
                    renderItem={({ item }) => (
                        <View>
                            {!item.completed ? (
                                <Text style={{}}>{item.name}</Text>
                            ) : (
                                <Text
                                    style={{
                                        textDecorationLine: "line-through",
                                    }}
                                >
                                    {item.name}
                                </Text>
                            )}
                            {!item.completed ? (
                                <View>
                                    <Button
                                        title="Complete"
                                        onPress={() => {
                                            if (!currentProject) {
                                                return;
                                            }

                                            // create a new project with the new todo
                                            const newProject = {
                                                name: projectName,
                                                todos: currentProject.todos.map(
                                                    (todo) => {
                                                        if (
                                                            todo.name ===
                                                            item.name
                                                        ) {
                                                            return {
                                                                name: todo.name,
                                                                completed: true,
                                                            };
                                                        }
                                                        return todo;
                                                    }
                                                ),
                                            };

                                            // remove the old project
                                            const newProjects =
                                                projectContext?.projects.filter(
                                                    (project) =>
                                                        project.name !==
                                                        projectName
                                                );

                                            if (!newProjects) {
                                                return;
                                            }

                                            // add the new project to the projects array
                                            projectContext?.setProjects([
                                                ...newProjects,
                                                newProject,
                                            ]);
                                        }}
                                    />
                                    <Button
                                        title="Delete"
                                        onPress={() => {
                                            if (!currentProject) {
                                                return;
                                            }

                                            // create a new project with the new todo
                                            const newProject = {
                                                name: projectName,
                                                todos: currentProject.todos.filter(
                                                    (todo) => {
                                                        if (
                                                            todo.name ===
                                                            item.name
                                                        ) {
                                                            return false;
                                                        }
                                                        return true;
                                                    }
                                                ),
                                            };

                                            // remove the old project
                                            const newProjects =
                                                projectContext?.projects.filter(
                                                    (project) =>
                                                        project.name !==
                                                        projectName
                                                );

                                            if (!newProjects) {
                                                return;
                                            }

                                            // add the new project to the projects array
                                            projectContext?.setProjects([
                                                ...newProjects,
                                                newProject,
                                            ]);
                                        }}
                                    />
                                </View>
                            ) : (
                                <></>
                            )}
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightblue",
    },
});
