// project:
// A todo app with React Native
// it will have a list of projects
// and a list of todos for each project
// users can add new projects and then view the projects in the home screen
// users can add new todos and view them in the project screen
// users can mark todos as complete
// users can delete todos
// users can delete projects
// users can edit todos
// users can edit projects
// users can view the number of todos in each project
// There also will be a about screen

import { SafeAreaView, useSafeArea } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { View, TouchableOpacity, Text, Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { useState } from "react";
import Home from "./screens/Home";
import Project from "./screens/Project";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Settings from "./screens/Settings";
import {
  TodoContext,
  ProjectContext,
  ProjectType,
  TodoType,
  UserContext,
  UserType,
} from "./constants/contexts";
import { colors } from "./constants/styles";
import getProjects from "./utils/firebase/projects/getProjects";
import getTodos from "./utils/firebase/todos/getTodos";
import { firebase } from "@react-native-firebase/auth";
import { Dimensions } from "react-native";
import About from "./screens/About";

const Stack = createNativeStackNavigator();

// TODO: set security rules for the database
// TODO: add a loading screen
// TODO: use icons for buttons
export default function App() {
  const [user, setUser] = useState<UserType | null>(null);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [todos, setTodos] = useState<TodoType[]>([]);

  //   const safeArea = useSafeArea();
  //   const navbarWidth = safeArea.left + safeArea.right;

  // const navigation = useNavigation();

  // useEffect(() => {
  //     async function getProjectsFromFirebase() {
  //         const projects = await getProjects();
  //         setProjects(projects);
  //     }
  //     getProjectsFromFirebase();
  // }, []);

  // useEffect(() => {
  //     async function getTodosFromFirebase() {
  //         const todos = await getTodos();
  //         console.log("Collection todos: ", todos);
  //         setTodos(todos);
  //     }
  //     getTodosFromFirebase();
  // }, []);

  // Check if the user is logged in
  // If not, redirect to the login screen
  useEffect(() => {
    async function checkIfUserIsLoggedIn() {
      const subscriber = firebase.auth().onAuthStateChanged((user) => {
        console.log("User auth changed: ", user);

        if (user) {
          if (user.displayName && user.email) {
            setUser({
              id: user.uid,
              name: user.displayName,
              email: user.email,
            });
          }
        } else {
          // redirect to login screen
          // @ts-ignore
          // navigation.navigate("Login");

          setUser(null);
          setProjects([]);
          setTodos([]);
        }
      });
      return subscriber;
    }
    checkIfUserIsLoggedIn();
  }, []);

  useEffect(() => {
    console.log("User: ", user);
  }, [user]);

  // get the projects from firebase
  useEffect(() => {
    async function getProjectsFromFirebase() {
      if (user) {
        const projects = await getProjects(user.id);
        setProjects(projects);
      }
    }
    getProjectsFromFirebase();
  }, [user]);

  // get the todos from firebase
  useEffect(() => {
    async function getTodosFromFirebase() {
      if (user) {
        const todos = await getTodos(user.id);
        setTodos(todos);
      }
    }
    getTodosFromFirebase();
  }, [user]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <ProjectContext.Provider value={{ projects, setProjects }}>
        <UserContext.Provider value={{ user, setUser }}>
          {/* <SafeAreaView> */}
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={(options) => {
                return {
                  headerStyle: {
                    backgroundColor: colors.navbar.bg,
                  },
                  headerTintColor: colors.navbar.text,
                };
              }}
            >
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  title: "Home",
                }}
              />
              <Stack.Screen
                name="Project"
                component={Project}
                options={({ route }) => ({
                  // @ts-ignore
                  title: route.params.projectName,
                })}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  title: "Login",
                }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{
                  title: "Register",
                }}
              />
              <Stack.Screen
                name="Settings"
                component={Settings}
                options={{
                  title: "Settings",
                }}
              />
              <Stack.Screen
                name="About"
                component={About}
                options={{
                  title: "About",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
          {/* </SafeAreaView> */}
        </UserContext.Provider>
      </ProjectContext.Provider>
    </TodoContext.Provider>
  );
}
