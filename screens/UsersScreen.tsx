import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { User } from "@/types/User";
import UserItem from "@/components/UserItem";
import { useFetch } from "@/hooks/useFetch";
import { UsersScreenProps } from "@/types/Navigation";

export default function UsersScreen({ navigation }: UsersScreenProps) {
    const {
        data: users,
        isLoading,
        error,
    } = useFetch<User[]>("https://jsonplaceholder.typicode.com/users");

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.infoText}>Ładowanie użytkowników...</Text>
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

    if (!isLoading && !error && users?.length === 0) {
        return (
            <View style={styles.centered}>
                <Text style={styles.infoText}>Brak danych do wyświetlenia.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Użytkownicy</Text>

            <FlatList
                data={users ?? []}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <UserItem
                        name={item.name}
                        username={item.username}
                        email={item.email}
                        onPress={() =>
                            navigation.navigate("UserDetails", { id: item.id })
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
