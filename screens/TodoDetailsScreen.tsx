import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { TodoDetailsScreenProps } from "@/types/Navigation";
import { useFetch } from "@/hooks/useFetch";
import { Todo } from "@/types/Todo";
import { styles } from "@/styles/TodoDetailsScreenStyles";

export default function TodoDetailsScreen({ route }: TodoDetailsScreenProps) {
    const { id } = route.params;

    const { data: todo, isLoading, error } = useFetch<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
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

    if (!todo) {
        return (
            <View style={styles.centered}>
                <Text style={styles.infoText}>Nie znaleziono zadania.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{todo.title}</Text>

            <View style={styles.row}>
                <Text style={styles.label}>ID zadania:</Text>
                <Text style={styles.value}>{todo.id}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>ID użytkownika:</Text>
                <Text style={styles.value}>{todo.userId}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Status:</Text>
                <Text
                    style={[
                        styles.value,
                        todo.completed ? styles.completed : styles.pending,
                    ]}
                >
                    {todo.completed ? "Wykonane" : "Niewykonane"}
                </Text>
            </View>
        </View>
    );
}

