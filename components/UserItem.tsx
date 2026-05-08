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
    )
}

const styles = StyleSheet.create({
    container: {

    },
    name: {
        
    },
    username: {

    },
    email: {
        
    }
})