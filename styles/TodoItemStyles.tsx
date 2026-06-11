import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        padding: 16,
        marginHorizontal: 12,
        marginVertical: 6,
        borderRadius: 10,
        elevation: 2,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 6,
        color: "#1a1a1a",
    },
    status: {
        fontSize: 14,
        fontWeight: "600",
    },
    completed: {
        color: "#2e7d32",
    },
    pending: {
        color: "#c62828",
    },
});
