import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    FlatList,
    Pressable,
} from "react-native";
import { useState } from "react";
import { useContext } from "react";
import { TodoContext, ProjectContext } from "../constants/contexts";
import Dialog from "react-native-dialog";
import React from "react";
import colors from "../constants/colors";

export default function Home({ navigation }: { navigation: any }) {
    const [projectText, setProjectText] = useState("");
    const [renamedProjectName, setRenamedProjectName] = useState("");
    const [renderDialog, setRenderDialog] = useState<string | null>(
        // name | null
        null
    );

    const projectContext = useContext(ProjectContext);
    const todoContext = useContext(TodoContext);
    const projectTextRef = React.useRef<TextInput>(null);

    function handleCreatProject() {
        if (!projectContext) {
            return;
        }
        const projects = projectContext.projects;
        const setProjects = projectContext.setProjects;

        // check if the project text is empty
        if (projectText === "") {
            return;
        }

        // check if the project already exists
        const isProjectExists = projects.find(
            (project) => project.name === projectText
        );

        if (isProjectExists) {
            return;
        }

        // create a new project
        const newProject = {
            name: projectText,
        };
        // add the new project to the projects array
        setProjects([...projects, newProject]);
        // clear the project text
        setProjectText("");
        // unfocus the input
        projectTextRef.current?.blur();
    }

    function handleRename() {
        // check if the project name is empty
        if (renamedProjectName === "") {
            return;
        }

        // check if the project already exists
        const isProjectExists = projectContext?.projects.find(
            (project) => project.name === renamedProjectName
        );
        if (isProjectExists) {
            return;
        }

        // rename the project
        const newProjects = projectContext?.projects.map((project) => {
            if (project.name === renderDialog?.toString()) {
                return {
                    ...project,
                    name: renamedProjectName,
                };
            }
            return project;
        });

        if (!newProjects) {
            return;
        }

        // rename the todos of the project
        const newTodos = todoContext?.todos.map((todo) => {
            if (todo.project === renderDialog?.toString()) {
                return {
                    ...todo,
                    project: renamedProjectName,
                };
            }
            return todo;
        });

        if (!newTodos) {
            return;
        }

        // update the todo state
        todoContext?.setTodos(newTodos);
        // update the project state
        projectContext?.setProjects(newProjects);
        // clear the project name
        setRenamedProjectName("");
        // close the dialog
        setRenderDialog(null);
    }

    function handleCancelRename() {
        // close the dialog
        setRenderDialog(null);
    }

    function handleDeleteProject(projectName: string) {
        // delete the project
        const newProjects = projectContext?.projects.filter(
            (project) => project.name !== projectName
        );

        // delete the todos of the project
        const newTodos = todoContext?.todos.filter(
            (todo) => todo.project !== projectName
        );

        if (!newProjects) {
            return;
        }
        if (!newTodos) {
            return;
        }

        // update the todo state
        todoContext?.setTodos(newTodos);
        // update the project state
        projectContext?.setProjects(newProjects);
    }

    return (
        <View style={styles.container}>
            <Dialog.Container visible={!!renderDialog}>
                <Dialog.Title>Rename project</Dialog.Title>
                <Dialog.Description>
                    Enter the new project name for the project{" "}
                    {renderDialog?.toString()}
                </Dialog.Description>
                <Dialog.Input
                    value={renamedProjectName}
                    onChangeText={setRenamedProjectName}
                />
                <Dialog.Button label="Cancel" onPress={handleCancelRename} />
                <Dialog.Button
                    label="OK"
                    onPress={() => (renderDialog ? handleRename() : null)}
                />
            </Dialog.Container>

            {/* Show a form to create new projects */}
            <View>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#25a88a",
                        textAlign: "center",
                    }}
                >
                    Create a new project
                </Text>
                <TextInput
                    placeholder="Project name"
                    placeholderTextColor="gray"
                    onChangeText={setProjectText}
                    keyboardType="default"
                    value={projectText}
                    ref={projectTextRef}
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
                {/* <Button title="Create" onPress={handleCreatProject} /> */}
                <Pressable
                    style={{
                        padding: 5,
                        width: 90,
                        alignSelf: "center",
                        borderRadius: 5,
                        backgroundColor: "#25a860",
                    }}
                    onPress={handleCreatProject}
                >
                    <Text
                        style={{
                            color: "white",
                            textAlign: "center",
                            fontSize: 17,
                            fontWeight: "bold",
                        }}
                    >
                        Create
                    </Text>
                </Pressable>
            </View>

            {/* Show a list of projects */}
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
                    Your Projects
                </Text>

                <FlatList
                    data={projectContext?.projects}
                    renderItem={({ item }) => {
                        return (
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
                                        onPress={() => {
                                            navigation.navigate("Project", {
                                                projectName: item.name,
                                            });
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: "white",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            View
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
                                            handleDeleteProject(item.name)
                                        }
                                    >
                                        <Text
                                            style={{
                                                color: "white",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Delete
                                        </Text>
                                    </Pressable>
                                    <Pressable
                                        style={{
                                            backgroundColor: "#a83f0a",
                                            paddingVertical: 3,
                                            paddingHorizontal: 20,
                                            borderRadius: 5,
                                        }}
                                        onPress={() => {
                                            setRenderDialog(item.name);
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: "white",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Rename
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        );
                    }}
                />
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.body.bg,
        paddingBottom: 150,
    },
});
