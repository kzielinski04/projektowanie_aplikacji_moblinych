import { Pressable, Text } from "react-native";
import { styles } from "@/styles/TodoItemStyles";

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

