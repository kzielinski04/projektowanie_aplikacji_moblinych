import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    infoText: {
        marginTop: 12,
        fontSize: 16,
        color: "#444",
    },
    errorText: {
        fontSize: 16,
        color: "#b00020",
        textAlign: "center",
        lineHeight: 22,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 16,
        textTransform: "capitalize",
    },
    meta: {
        fontSize: 14,
        color: "#666",
        marginBottom: 12,
    },
    body: {
        fontSize: 16,
        lineHeight: 24,
        color: "#333",
    },
    author: {
        fontSize: 14,
        color: "#666",
        marginBottom: 12,
    },
    comments: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 20,
    },
});
