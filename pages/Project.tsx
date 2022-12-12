import {
    FlatList,
    Text,
    View,
    StyleSheet,
    TextInput,
    Pressable,
} from "react-native";
import { useState } from "react";
import { useContext } from "react";
import { TodoProjectContext, TodoType } from "../constants/contexts";
import React from "react";
import colors from "../constants/colors";

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

    function handleCompleteTodo(item: TodoType) {
        if (!currentProject) {
            return;
        }

        // create a new project with the new todo
        const newProject = {
            name: projectName,
            todos: currentProject.todos.map((todo) => {
                if (todo.name === item.name) {
                    return {
                        name: todo.name,
                        completed: true,
                    };
                }
                return todo;
            }),
        };

        // remove the old project
        const newProjects = projectContext?.projects.filter(
            (project) => project.name !== projectName
        );

        if (!newProjects) {
            return;
        }

        // add the new project to the projects array
        projectContext?.setProjects([...newProjects, newProject]);
    }

    function handleDeleteTodo(item: TodoType) {
        if (!currentProject) {
            return;
        }

        // create a new project with the new todo
        const newProject = {
            name: projectName,
            todos: currentProject.todos.filter((todo) => {
                if (todo.name === item.name) {
                    return false;
                }
                return true;
            }),
        };

        // remove the old project
        const newProjects = projectContext?.projects.filter(
            (project) => project.name !== projectName
        );

        if (!newProjects) {
            return;
        }

        // add the new project to the projects array
        projectContext?.setProjects([...newProjects, newProject]);
    }

    return (
        <View style={styles.container}>
            <Text>{projectName}</Text>

            <View>
                {/* Show a form to create new todos */}
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#25a88a",
                        textAlign: "center",
                    }}
                >
                    Create a new todo
                </Text>
                <TextInput
                    onChangeText={setTodoText}
                    value={todoText}
                    placeholder="Enter your task"
                    placeholderTextColor="gray"
                    keyboardType="default"
                    ref={todoTextRef}
                    style={{
                        color: "white",
                        fontSize: 20,
                        marginVertical: 10,
                        borderColor: "white",
                        borderBottomWidth: 1,
                        width: "95%",
                        padding: 5,
                        alignSelf: "center",
                    }}
                />
                {/* <Button title="Create" onPress={handleCreateTodo} /> */}
                <Pressable
                    style={{
                        padding: 5,
                        width: 90,
                        alignSelf: "center",
                        borderRadius: 5,
                        backgroundColor: "#25a860",
                    }}
                    onPress={handleCreateTodo}
                >
                    <Text
                        style={{
                            color: "white",
                            textAlign: "center",
                            fontSize: 17,
                            fontWeight: "bold",
                        }}
                    >
                        {" "}
                        Create{" "}
                    </Text>
                </Pressable>
            </View>

            {/* Show a list of todos */}
            <View
                style={{
                    marginTop: 30,
                }}
            >
                <Text
                    style={{
                        fontSize: 27,
                        color: "#00c3ff",
                        fontWeight: "bold",
                        textAlign: "center",
                        marginBottom: 10,
                    }}
                >
                    Todos
                </Text>
                <FlatList
                    data={sortedTodos}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                width: "95%",
                                marginVertical: 2,
                                borderRadius: 5,
                                borderColor: "white",
                                borderWidth: 1,
                                alignSelf: "center",
                                padding: 10,
                            }}
                        >
                            {!item.completed ? (
                                <Text
                                    style={{
                                        fontSize: 20,
                                        color: "white",
                                        marginBottom: 10,
                                        marginLeft: 10,
                                    }}
                                >
                                    {item.name}
                                </Text>
                            ) : (
                                <Text
                                    style={{
                                        fontSize: 20,
                                        color: "white",
                                        marginBottom: 10,
                                        marginLeft: 10,
                                        textDecorationLine: "line-through",
                                    }}
                                >
                                    {item.name}
                                </Text>
                            )}
                            {!item.completed ? (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-around",
                                    }}
                                >
                                    <Pressable
                                        style={{
                                            backgroundColor: "#0948ad",
                                            paddingVertical: 3,
                                            paddingHorizontal: 20,
                                            borderRadius: 5,
                                        }}
                                        onPress={() => handleCompleteTodo(item)}
                                    >
                                        <Text
                                            style={{
                                                color: "white",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {" "}
                                            Complete{" "}
                                        </Text>
                                    </Pressable>

                                    <Pressable
                                        style={{
                                            backgroundColor: "#990814",
                                            paddingVertical: 3,
                                            paddingHorizontal: 20,
                                            borderRadius: 5,
                                        }}
                                        onPress={() => handleDeleteTodo(item)}
                                    >
                                        <Text
                                            style={{
                                                color: "white",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {" "}
                                            Delete{" "}
                                        </Text>
                                    </Pressable>
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
        backgroundColor: colors.body.bg,
    },
});
