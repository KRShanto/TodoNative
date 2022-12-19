import { View, Text, Pressable } from "react-native";
import React from "react";
import { firebase } from "@react-native-firebase/auth";

export default function ShowAlreadyLoggedIn({
  navigation,
}: {
  navigation: any;
}) {
  return (
    <>
      <Text style={{ color: "white", fontSize: 25 }}>
        You are already logged in
      </Text>
      <Pressable
        style={{
          padding: 10,
          alignSelf: "center",
          borderRadius: 5,
          backgroundColor: "#25a860",
          marginTop: 10,
        }}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 23,
          }}
        >
          Go Home
        </Text>
      </Pressable>
      <Pressable
        style={{
          padding: 10,
          alignSelf: "center",
          borderRadius: 5,
          backgroundColor: "red",
          marginTop: 10,
        }}
        onPress={() => {
          firebase.auth().signOut();
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 23,
          }}
        >
          Logout
        </Text>
      </Pressable>
    </>
  );
}
