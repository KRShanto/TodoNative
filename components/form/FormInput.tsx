import { View, TextInput } from "react-native";
import React from "react";

export default function FormInput({
  value,
  setState,
  placeholder,
  props,
}: {
  value: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  props?: any;
}) {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="gray"
      onChangeText={setState}
      keyboardType="default"
      value={value}
      cursorColor="cyan"
      style={{
        color: "white",
        // color: "black",
        fontSize: 20,
        marginVertical: 10,
        borderColor: "white",
        borderBottomWidth: 1,
        width: "95%",
        padding: 5,
        alignSelf: "center",
      }}
      {...props}
    />
  );
}
