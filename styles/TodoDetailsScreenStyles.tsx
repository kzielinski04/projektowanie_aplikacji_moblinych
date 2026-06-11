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
        marginBottom: 24,
        color: "#1a1a1a",
        lineHeight: 28,
    },
    row: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        color: "#333",
        lineHeight: 22,
    },
    completed: {
        color: "#2e7d32",
        fontWeight: "600",
    },
    pending: {
        color: "#c62828",
        fontWeight: "600",
    },
});
