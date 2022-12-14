import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";

export default function Form({
    title,
    handleSubmit,
    children,
}: {
    title?: string;
    handleSubmit: () => void;
    children?: React.ReactNode;
}) {
    return (
        <View
            style={{
                borderColor: "gray",
                borderWidth: 1,
                marginVertical: 15,
                borderRadius: 5,
                padding: 5,
                width: "95%",
                alignSelf: "center",
            }}
        >
            {/* <Text
                style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#25a88a",
                    textAlign: "center",
                }}
            >
                Create a new project
            </Text> */}

            {title && (
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#25a88a",
                        textAlign: "center",
                    }}
                >
                    {title}
                </Text>
            )}

            {/* <TextInput
                placeholder="Project name"
                placeholderTextColor="gray"
                onChangeText={setProjectText}
                keyboardType="default"
                onBlur={() => console.log("blur")}
                onSubmitEditing={handleCreateProject}
                value={projectText}
                ref={projectTextRef}
                cursorColor="cyan"
                returnKeyLabel="Create"
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
            /> */}

            {children}

            {/* <Button title="Create" onPress={handleCreatProject} /> */}
            <Pressable
                style={{
                    padding: 5,
                    width: 90,
                    alignSelf: "center",
                    borderRadius: 5,
                    backgroundColor: "#25a860",
                }}
                onPress={() => {
                    // handleCreateProject();
                    handleSubmit();
                    // console.log("create");
                }}
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
    );
}
