import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { Todo } from "@/types/Todo";
import TodoItem from "@/components/TodoItem";
import { useFetch } from "@/hooks/useFetch";
import { TodosScreenProps } from "@/types/Navigation";

export default function TodosScreen({ navigation }: TodosScreenProps) {
    const {
        data: todos,
        isLoading,
        error,
    } = useFetch<Todo[]>("https://jsonplaceholder.typicode.com/todos");

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#007AFF" />
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
            <Text style={styles.header}>Lista zadań</Text>

            <FlatList
                data={limitedTodos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TodoItem
                        title={item.title}
                        completed={item.completed}
                        onPress={() =>
                            navigation.navigate("TodoDetails", { id: item.id })
                        }
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
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
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f2f2f2",
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
});
