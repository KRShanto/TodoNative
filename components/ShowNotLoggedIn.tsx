import { View, Text, Pressable } from "react-native";
import React from "react";

export default function ShowNotLoggedIn({ navigation }: { navigation: any }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 30,
          fontWeight: "bold",
          color: "white",
          marginBottom: 30,
        }}
      >
        You are not logged in
      </Text>

      <Pressable
        style={{
          backgroundColor: "#1ba677",
          padding: 10,
          marginHorizontal: 50,
          marginBottom: 20,
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 23,
            fontWeight: "bold",
          }}
        >
          Login
        </Text>
      </Pressable>
      <Pressable
        style={{
          backgroundColor: "#1ba677",
          padding: 10,
          marginHorizontal: 50,
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate("Register")}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: 23,
            fontWeight: "bold",
          }}
        >
          Register
        </Text>
      </Pressable>
    </View>
  );
}
