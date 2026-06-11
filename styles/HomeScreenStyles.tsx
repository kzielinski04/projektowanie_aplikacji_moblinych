import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        margin: 15,
    },
    counterSection: {
        padding: 20,
        backgroundColor: "white",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    counterText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    centeredView: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalView: {
        backgroundColor: "white", 
        padding: 35, 
        borderRadius: 20, 
        alignItems: "center"
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15
    },
    navigationButtons: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginHorizontal: 16,
        marginTop: 12,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginHorizontal: 16,
        marginVertical: 12,
        fontSize: 14,
        backgroundColor: "#fff",
    },
    categoryScrollView: {
        marginHorizontal: 16,
        marginBottom: 12,
        maxHeight: 50,
    },
    categoryList: {
        flexDirection: "row",
        gap: 8,
    },
    categoryButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
        justifyContent: "center",
    },
    categoryButtonActive: {
        backgroundColor: "#007AFF",
    },
    categoryButtonInactive: {
        backgroundColor: "#ddd",
    },
    categoryButtonText: {
        fontWeight: "600",
        fontSize: 12,
    },
    categoryButtonTextActive: {
        color: "#fff",
    },
    categoryButtonTextInactive: {
        color: "#000",
    },
    resultsCount: {
        marginHorizontal: 16,
        marginBottom: 8,
        color: "#666",
        fontSize: 12,
    },
    emptyContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 16,
        color: "#999",
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 13,
        color: "#ccc",
        textAlign: "center",
        paddingHorizontal: 20,
    },
});