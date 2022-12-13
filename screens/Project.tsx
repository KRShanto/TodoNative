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
import updateTodo from "../utils/firebase/todos/updateTodos";
import deleteTodo from "../utils/firebase/todos/deleteTodo";
import createTodo from "../utils/firebase/todos/createTodo";

export default function Project({ route }: { route: any }) {
    const [todoText, setTodoText] = useState("");
    // contexts
    const projectContext = useContext(ProjectContext);
    const todoContext = useContext(TodoContext);
    // ref of the todo text input
    const todoTextRef = React.useRef<TextInput>(null);
    // current project id
    const projectId: string = route.params.projectId;

    // current todos
    const currentTodos = todoContext?.todos.filter(
        (todo) => todo.projectId === projectId
    );

    console.log("currentTodos: ", currentTodos);
    console.log("todos: ", todoContext?.todos);

    const sortedTodos = currentTodos?.sort((a, b) => {
        if (a.completed && !b.completed) {
            return 1;
        }
        if (!a.completed && b.completed) {
            return -1;
        }
        return 0;
    });

    async function handleCreateTodo() {
        if (!projectContext) {
            return;
        }
        // check if the todo text is empty
        if (todoText === "") {
            return;
        }
        const newTodoText = todoText;

        // clear the todo text
        setTodoText("");

        // unfocus the input
        todoTextRef.current?.blur();

        // create a new todo in the database
        const newTodoID = await createTodo(projectId, newTodoText);

        if (newTodoID) {
            // create a new todo
            const newTodo = {
                id: newTodoID,
                task: newTodoText,
                completed: false,
                projectId,
            };

            if (!currentTodos) {
                return;
            }

            // add the new todo to the todos array
            todoContext?.setTodos([...currentTodos, newTodo]);
        } else {
            // TODO: show an error message to the user (alert)
        }
    }

    function handleCompleteTodo(todoId: string) {
        if (!currentTodos) {
            return;
        }

        // get the todo
        const todo = currentTodos.find((todo) => todo.id === todoId);

        if (!todo) {
            return;
        }

        // update the todo in the database
        updateTodo(todoId, todo.task, true);

        // create a new todo with the new todo
        const newTodo = {
            id: todoId,
            task: todo.task,
            completed: true,
            projectId,
        };

        // remove the old todo
        const newTodos = todoContext?.todos.filter(
            (todo) => todo.id !== todoId
        );

        if (!newTodos) {
            return;
        }

        // add the new todo to the todos array
        todoContext?.setTodos([...newTodos, newTodo]);
    }

    function handleDeleteTodo(todoId: string) {
        if (!currentTodos) {
            return;
        }

        // delete the todo from the database
        deleteTodo(todoId);

        // create a new list of todos without the deleted todo
        const newTodos = todoContext?.todos.filter(
            (todo) => todo.id !== todoId
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
                {/* TODO: Put the above code into FlatList's header prop */}
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
                                            handleCompleteTodo(item.id)
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
                                        onPress={() =>
                                            handleDeleteTodo(item.id)
                                        }
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
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-around",
                                    }}
                                >
                                    <Pressable
                                        style={{
                                            backgroundColor: "#990814",
                                            paddingVertical: 3,
                                            paddingHorizontal: 20,
                                            borderRadius: 5,
                                        }}
                                        onPress={() =>
                                            handleDeleteTodo(item.id)
                                        }
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
