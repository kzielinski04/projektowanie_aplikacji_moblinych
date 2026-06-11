import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        paddingTop: 10,
    },
    header: {
        fontSize: 26,
        fontWeight: "900",
        color: "#1a1a1a",
        paddingHorizontal: 16,
        paddingBottom: 10,
    },
    buttons: {
        paddingHorizontal: 16,
        gap: 8,
        marginBottom: 8,
    },
    card: {
        backgroundColor: "#ffffff",
        padding: 16,
        marginHorizontal: 12,
        marginVertical: 6,
        borderRadius: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    cardText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1a1a1a",
    },
    emptyText: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginTop: 24,
        paddingHorizontal: 20,
    },
});
