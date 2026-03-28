import { StyleSheet, Text, View, Pressable } from "react-native";

type ListItemProps = {
    title: string;
    description: string;
    location: string;
    isHighlighted: boolean;
};

export default function ListItem({ title, description, location, isHighlighted }: ListItemProps) {
    return (
        <Pressable
            style={({ hovered, pressed }) => [
                styles.container,
                isHighlighted ? styles.important : styles.default,
                (hovered || pressed) && styles.active
            ]}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.location}>{location}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 8,
    },
    default: {
        backgroundColor: "#4a90e2",
    },
    important: {
        backgroundColor: "#f39c12",
    },
    active: {
        backgroundColor: "#1f4f85",
        transform: [{ scale: 1.02 }],
    },
    title: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    description: {
        color: "white",
        fontSize: 14,
    },
    location: {
        color: "white",
        fontSize: 12,
        marginTop: 5,
        fontStyle: 'italic',
    }
});