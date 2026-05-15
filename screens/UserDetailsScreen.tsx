import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { UserDetailsScreenProps } from "@/types/Navigation";
import { useFetch } from "@/hooks/useFetch";
import { User } from "@/types/User";

export default function UserDetailsScreen({ route }: UserDetailsScreenProps) {
    const { id } = route.params;

    const { data: user, isLoading, error } = useFetch<User>(
        `https://jsonplaceholder.typicode.com/users/${id}`,
    );

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.infoText}>Ładowanie szczegółów...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    if (!user) {
        return (
            <View style={styles.centered}>
                <Text style={styles.infoText}>Nie znaleziono użytkownika.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{user.name}</Text>

            <View style={styles.row}>
                <Text style={styles.label}>Username:</Text>
                <Text style={styles.value}>@{user.username}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{user.email}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Telefon:</Text>
                <Text style={styles.value}>{user.phone}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Strona www:</Text>
                <Text style={styles.value}>{user.website}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    name: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
        color: "#1a1a1a",
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
});
