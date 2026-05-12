import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface TodoItemProps {
    title: string;
    completed: boolean;
}

export default function TodoItem({ title, completed }: TodoItemProps) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.statusContainer}>
                <Text style={styles.label}>Status: </Text>
                <Text style={[styles.status, completed ? styles.completed : styles.pending]}>
                    {completed ? "Wykonane" : "Niewykonane"}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#333",
    },
    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    label: {
        fontSize: 14,
        color: "#666",
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