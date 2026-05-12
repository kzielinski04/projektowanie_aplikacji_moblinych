import React from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Todo } from "@/types/Todo";
import TodoItem from "@/components/TodoItem";
import { useFetch } from "@/hooks/useFetch";

export default function TodosScreen() {
    const {
        data: todos,
        isLoading,
        error,
    } = useFetch<Todo[]>("https://jsonplaceholder.typicode.com/todos");

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.infoText}>Ładowanie zadań...</Text>
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

    if (!isLoading && !error && todos?.length === 0) {
        return (
            <View style={styles.centered}>
                <Text style={styles.infoText}>Brak danych do wyświetlenia.</Text>
            </View>
        );
    }

    const limitedTodos = todos?.slice(0, 20) ?? [];

    return (
        <View style={styles.container}>
            <FlatList 
                data={limitedTodos}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <TodoItem 
                        title={item.title}
                        completed={item.completed}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    listContainer: {
        paddingVertical: 8,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    errorText: {
        color: "red",
        fontSize: 16,
        textAlign: "center",
    },
    infoText: {
        marginTop: 12,
        fontSize: 16,
        color: "#555",
    },
});