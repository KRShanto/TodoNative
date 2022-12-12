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

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useState } from "react";
import Home from "./pages/Home";
import Project from "./pages/Project";
import { TodoProjectContext } from "./constants/contexts";
import colors from "./constants/colors";

const Stack = createNativeStackNavigator();

export default function App() {
    const [projects, setProjects] = useState([
        {
            name: "Everyday Tasks",
            todos: [
                {
                    name: "Brush Teeth",
                    completed: false,
                },
                {
                    name: "Feed cat",
                    completed: false,
                },
            ],
        },
    ]);

    return (
        <TodoProjectContext.Provider value={{ projects, setProjects }}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: colors.navbar.bg,
                        },
                        headerTintColor: colors.navbar.text,
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
                </Stack.Navigator>
            </NavigationContainer>
        </TodoProjectContext.Provider>
    );
}
