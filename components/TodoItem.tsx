import { Pressable, StyleSheet, Text } from "react-native";

type TodoItemProps = {
    title: string;
    completed: boolean;
    onPress: () => void;
};

export default function TodoItem({ title, completed, onPress }: TodoItemProps) {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text
                style={[
                    styles.status,
                    completed ? styles.completed : styles.pending,
                ]}
            >
                {completed ? "Wykonane" : "Niewykonane"}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        padding: 16,
        marginHorizontal: 12,
        marginVertical: 6,
        borderRadius: 10,
        elevation: 2,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 6,
        color: "#1a1a1a",
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
