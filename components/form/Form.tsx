import { View, Text, TextInput, Pressable } from "react-native";
import React from "react";

export default function Form({
  title,
  handleSubmit,
  submitText = "Submit",
  children,
}: {
  title?: string;
  handleSubmit: () => void;
  submitText?: string;
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
      {title && (
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "#25a88a",
            textAlign: "center",
          }}
        >
          {title}
        </Text>
      )}

      {children}

      <Pressable
        style={{
          padding: 5,
          width: 90,
          alignSelf: "center",
          borderRadius: 5,
          backgroundColor: "#25a860",
          marginTop: 10,
        }}
        onPress={() => {
          handleSubmit();
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
          {submitText}
        </Text>
      </Pressable>
    </View>
  );
}
