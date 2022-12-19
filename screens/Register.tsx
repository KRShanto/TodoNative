import { colors } from "../constants/styles";
import { View, Text, Pressable, Button } from "react-native";
import React, { useState, useRef, useContext } from "react";
import Form from "../components/form/Form";
import FormInput from "../components/form/FormInput";
import { firebase } from "@react-native-firebase/auth";
import { TextInput } from "react-native";
import { UserContext } from "../constants/contexts";
import ShowAlreadyLoggedIn from "../components/ShowAlreadyLoggedIn";

export default function Register({ navigation }: { navigation: any }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const userContext = useContext(UserContext);

  const register = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User after register: ", user);

        // Update the user's profile
        user
          ?.updateProfile({
            displayName: name,
          })
          .then(() => {
            console.log("User profile updated");
            // home
            navigation.navigate("Home");
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error: ", errorMessage);
      });
  };

  return (
    <View
      style={{
        backgroundColor: colors.body.bg,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {userContext?.user ? (
        <ShowAlreadyLoggedIn navigation={navigation} />
      ) : (
        <>
          <Form
            title="Register a new account"
            handleSubmit={register}
            submitText="Create"
          >
            <FormInput
              value={name}
              setState={setName}
              placeholder="Your Name"
              props={{
                ref: nameRef,
                onSubmitEditing: () => emailRef.current?.focus(),
              }}
            />
            <FormInput
              value={email}
              setState={setEmail}
              placeholder="Your Email"
              props={{
                ref: emailRef,
                onSubmitEditing: () => passwordRef.current?.focus(),
                keyboardType: "email-address",
              }}
            />
            <FormInput
              value={password}
              setState={setPassword}
              placeholder="Your Password"
              props={{
                ref: passwordRef,
                onSubmitEditing: register,
                secureTextEntry: true,
              }}
            />
          </Form>
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                marginBottom: 10,
              }}
            >
              Already have an account?
            </Text>
            <Button
              title="Login"
              onPress={() => navigation.navigate("Login")}
            />
          </View>
        </>
      )}
    </View>
  );
}
