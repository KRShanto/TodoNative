import { StyleSheet } from "react-native";

export const colors = {
    navbar: { bg: "#1e2b69", text: "white" },
    body: { bg: "#121a42", text: "white" },
};

export const styles = StyleSheet.create({
    bodyStyle: {
        flex: 1,
        backgroundColor: colors.body.bg,
        // paddingBottom: 150,
    },
});
