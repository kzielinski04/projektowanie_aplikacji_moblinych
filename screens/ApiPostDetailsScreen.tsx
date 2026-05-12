import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ApiPostDetailsScreenProps } from "@/types/Navigation";

export default function ApiPostDetailsScreen({
    route,
}: ApiPostDetailsScreenProps) {
    const { id, title, body } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.meta}>ID posta: {id}</Text>
            <Text style={styles.body}>{body}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
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
});