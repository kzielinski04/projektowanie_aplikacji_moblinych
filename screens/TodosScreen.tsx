import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { Todo } from "@/types/Todo";
import TodoItem from "@/components/TodoItem";
import { useFetch } from "@/hooks/useFetch";
import { TodosScreenProps } from "@/types/Navigation";
import { styles } from "@/styles/TodosScreenStyles";

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

