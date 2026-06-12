import { Text, View, Pressable } from "react-native";
import { styles } from "@/styles/ListItemStyles";

type ListItemProps = {
    title: string;
    date: string;
    category: string;
    isWorkshop?: boolean;
    onPress?: () => void;
};

export default function ListItem({ title, date, category, isWorkshop, onPress }: ListItemProps) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.container,
                isWorkshop ? styles.important : styles.default,
                pressed && styles.active,
                { opacity: pressed ? 0.7 : 1 }
            ]}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.location}>{date}</Text>
                <Text style={styles.location}>{category}</Text>
            </View>
        </Pressable>
    );
}