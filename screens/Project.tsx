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
import { ProjectContext, TodoContext, TodoType } from "../constants/contexts";
import React from "react";
import colors from "../constants/colors";

export default function Project({ route }: { route: any }) {
    const [todoText, setTodoText] = useState("");
    // contexts
    const projectContext = useContext(ProjectContext);
    const todoContext = useContext(TodoContext);
    // ref of the todo text input
    const todoTextRef = React.useRef<TextInput>(null);
    // current project name
    const projectName: string = route.params.projectName;
    // const currentProject = projectContext?.projects.find(
    //     (project) => project.name === projectName
    // );
    // current todos
    const currentTodos = todoContext?.todos.filter(
        (todo) => todo.project === projectName
    );

    const sortedTodos = currentTodos?.sort((a, b) => {
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
            task: todoText,
            completed: false,
            project: projectName,
        };

        if (!currentTodos) {
            return;
        }

        // add the new todo to the todos array
        todoContext?.setTodos([...currentTodos, newTodo]);

        // clear the todo text
        setTodoText("");

        // unfocus the input
        todoTextRef.current?.blur();
    }

    function handleCompleteTodo(todoTask: string) {
        if (!currentTodos) {
            return;
        }

        // create a new todo with the new todo
        const newTodo = {
            task: todoTask,
            completed: true,
            project: projectName,
        };

        // remove the old todo
        const newTodos = todoContext?.todos.filter(
            (todo) => todo.task !== todoTask
        );

        if (!newTodos) {
            return;
        }

        // add the new todo to the todos array
        todoContext?.setTodos([...newTodos, newTodo]);
    }

    function handleDeleteTodo(item: TodoType) {
        if (!currentTodos) {
            return;
        }

        // create a new list of todos without the deleted todo
        const newTodos = todoContext?.todos.filter(
            (todo) => todo.task !== item.task
        );

        if (!newTodos) {
            return;
        }

        // update the todos array
        todoContext?.setTodos(newTodos);
    }

    return (
        <View style={styles.container}>
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
                                    {item.task}
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
                                    {item.task}
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
                                        onPress={() =>
                                            handleCompleteTodo(item.task)
                                        }
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
