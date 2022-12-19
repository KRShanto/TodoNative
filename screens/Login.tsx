import { firebase } from "@react-native-firebase/auth";
import Form from "../components/form/Form";
import FormInput from "../components/form/FormInput";
import React, { useContext, useRef, useState } from "react";
import { TextInput, View } from "react-native";
import { Button, Text } from "react-native";
import { colors } from "../constants/styles";
import { UserContext } from "../constants/contexts";
import ShowAlreadyLoggedIn from "../components/ShowAlreadyLoggedIn";

export default function Login({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const userContext = useContext(UserContext);

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User after login: ", user.displayName);

        // home
        navigation.navigate("Home");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
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
            handleSubmit={login}
            title="Login to your account"
            submitText="Login"
          >
            <FormInput
              // label="Email"
              value={email}
              setState={setEmail}
              placeholder="Enter your email"
              props={{
                ref: emailRef,
                onSubmitEditing: () => passwordRef.current?.focus(),
                keyboardType: "email-address",
              }}
            />

            <FormInput
              // label="Password"
              value={password}
              setState={setPassword}
              placeholder="Enter your password"
              props={{
                ref: passwordRef,
                onSubmitEditing: login,
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
              Don't have an account?
            </Text>
            <Button
              title="Register"
              onPress={() => navigation.navigate("Register")}
            />
          </View>
        </>
      )}
    </View>
  );
}
