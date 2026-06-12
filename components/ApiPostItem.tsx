import { Pressable, Text } from "react-native";
import { styles } from "@/styles/ApiPostItemStyles";

type ApiPostItemProps = {
    id: number;
    title: string;
    body: string;
    onPress: () => void;
};

export default function ApiPostItem({
    id,
    title,
    body,
    onPress,
}: ApiPostItemProps) {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.body}>#{id}</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.body} numberOfLines={2}>
                {body}
            </Text>
        </Pressable>
    );
}

