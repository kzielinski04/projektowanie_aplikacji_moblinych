import { Pressable, StyleSheet, Text } from "react-native";

type ApiPostItemProps = {
    title: string;
    body: string;
    onPress: () => void;
};

export default function ApiPostItem({
    title,
    body,
    onPress,
}: ApiPostItemProps) {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.body} numberOfLines={2}>
                {body}
            </Text>
        </Pressable>
    )
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
        marginBottom: 8,
        textTransform: "capitalize",
    },
    body: {
        fontSize: 14,
        color: "#555",
    },
});