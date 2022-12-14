import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Pressable,
  Button,
  Linking,
} from "react-native";
import { useEffect, useState } from "react";
import { useContext } from "react";
import {
  TodoContext,
  ProjectContext,
  UserContext,
} from "../constants/contexts";
import Dialog from "react-native-dialog";
import React from "react";
import { colors, styles } from "../constants/styles";
import createProject from "../utils/firebase/projects/createProject";
import removeProject from "../utils/firebase/projects/removeProject";
import renameProject from "../utils/firebase/projects/renameProject";
import Form from "../components/form/Form";
import FormInput from "../components/form/FormInput";
import { firebase } from "@react-native-firebase/auth";
import ShowNotLoggedIn from "../components/ShowNotLoggedIn";

export default function Home({ navigation }: { navigation: any }) {
  const [projectText, setProjectText] = useState("");
  const [renamedProjectName, setRenamedProjectName] = useState("");
  const [renderDialog, setRenderDialog] = useState<string | null>(
    // id | null
    null
  );

  console.log("Navigation: ", navigation);

  const projectContext = useContext(ProjectContext);
  const todoContext = useContext(TodoContext);
  const userContext = useContext(UserContext);

  const projectTextRef = React.useRef<TextInput>(null);

  async function handleCreateProject() {
    if (!projectContext || !userContext?.user) {
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

    const newProjectName = projectText;

    // clear the project text
    setProjectText("");
    // unfocus the input
    projectTextRef.current?.blur();

    // create the project in the database
    const newProjectId = await createProject(
      newProjectName,
      userContext.user.id
    );

    if (newProjectId) {
      // add the new project to the projects array
      setProjects([
        ...projects,
        {
          name: newProjectName,
          id: newProjectId,
          userId: userContext.user.id,
        },
      ]);
    } else {
      // TODO handle error in an alert box
    }
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
      if (project.id === renderDialog?.toString()) {
        return {
          ...project,
          name: renamedProjectName,
        };
      }
      return project;
    });

    if (!newProjects || !renderDialog) {
      return;
    }

    // update the database
    renameProject(renderDialog, renamedProjectName);

    // // update the todo state
    // todoContext?.setTodos(newTodos);

    // update the project state
    projectContext?.setProjects(newProjects);
    // clear the project name
    setRenamedProjectName("");
    // close the dialog
    setRenderDialog(null);

    // rename the project in the database
  }

  function handleCancelRename() {
    // close the dialog
    setRenderDialog(null);
  }

  function handleDeleteProject(projectId: string) {
    // delete the project from the database
    removeProject(projectId);

    // delete the project
    const newProjects = projectContext?.projects.filter(
      (project) => project.id !== projectId
    );

    // delete the todos of the project
    const newTodos = todoContext?.todos.filter(
      (todo) => todo.projectId !== projectId
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
    <View style={styles.bodyStyle}>
      <Dialog.Container visible={!!renderDialog}>
        <Dialog.Title>Rename project</Dialog.Title>
        <Dialog.Description>Enter the new project name</Dialog.Description>
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

      {userContext?.user ? (
        <FlatList
          keyboardShouldPersistTaps="always"
          ListHeaderComponent={
            <>
              {/* TODO icons */}
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                <Pressable
                  onPress={() => {
                    // redirect to the github
                    Linking.openURL("https://github.com/KRShanto/TodoNative");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "white",
                    }}
                  >
                    Github
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    navigation.navigate("About");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "white",
                    }}
                  >
                    About
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    // Settings
                    navigation.navigate("Settings");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "white",
                    }}
                  >
                    Settings
                  </Text>
                </Pressable>
              </View>

              <Form
                title="Create a new project"
                submitText="Create"
                handleSubmit={handleCreateProject}
              >
                <FormInput
                  value={projectText}
                  setState={setProjectText}
                  placeholder="Project name"
                  props={{
                    onSubmitEditing: {
                      handleCreateProject,
                    },
                    ref: { projectTextRef },
                  }}
                />
              </Form>

              <Text
                style={{
                  fontSize: 27,
                  color: "#00c3ff",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: 10,
                  marginTop: 10,
                }}
              >
                Your Projects
              </Text>
            </>
          }
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
                        projectId: item.id,
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
                    onPress={() => handleDeleteProject(item.id)}
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
                      setRenderDialog(item.id);
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
      ) : (
        <ShowNotLoggedIn navigation={navigation} />
      )}
      {/* TODO: Pull to Refresh */}

      <StatusBar style="auto" />
    </View>
  );
}
