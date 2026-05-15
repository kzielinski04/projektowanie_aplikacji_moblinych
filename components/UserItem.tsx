import { Pressable, StyleSheet, Text } from "react-native";

type UserItemProps = {
    name: string;
    email: string;
    username: string;
    onPress: () => void;
};

export default function UserItem({
    name,
    email,
    username,
    onPress,
}: UserItemProps) {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.username}>@{username}</Text>
            <Text style={styles.email}>{email}</Text>
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
    name: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 6,
        color: "#1a1a1a",
    },
    username: {
        fontSize: 14,
        color: "#007AFF",
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: "#555",
    },
});
