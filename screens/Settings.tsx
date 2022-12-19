import { View, Text, Pressable } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../constants/contexts";
import { firebase } from "@react-native-firebase/auth";
import ShowNotLoggedIn from "../components/ShowNotLoggedIn";
import { colors } from "../constants/styles";

export default function Settings({ navigation }: { navigation: any }) {
  const userContext = useContext(UserContext);

  console.log("User context: ", userContext);

  function logout() {
    firebase.auth().signOut();
  }

  return (
    <View
      style={{
        backgroundColor: colors.body.bg,
        flex: 1,
      }}
    >
      {userContext?.user ? (
        <View style={{}}>
          <Text
            style={{
              fontSize: 23,
              marginVertical: 20,
              color: colors.body.text,
              textAlign: "center",
            }}
          >
            Your name is{" "}
            <Text style={{ fontWeight: "bold" }}>{userContext.user.name}</Text>
          </Text>
          <Text
            style={{
              fontSize: 23,
              marginVertical: 20,
              color: colors.body.text,
              textAlign: "center",
            }}
          >
            Your email is{" "}
            <Text style={{ fontWeight: "bold" }}>{userContext.user.email}</Text>
          </Text>

          <Pressable
            style={{
              backgroundColor: "red",
              padding: 10,
              margin: 30,
              borderRadius: 10,
            }}
            onPress={() => {
              logout();
              // home
              navigation.navigate("Home");
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 23,
                fontWeight: "bold",
              }}
            >
              Logout
            </Text>
          </Pressable>
        </View>
      ) : (
        <ShowNotLoggedIn navigation={navigation} />
      )}
    </View>
  );
}
