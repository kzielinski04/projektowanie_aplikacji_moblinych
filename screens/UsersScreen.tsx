import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { User } from "@/types/User";
import UserItem from "@/components/UserItem";
import { useFetch } from "@/hooks/useFetch";

export default function UsersScreen() {
    const {
        data: users,
        isLoading,
        error,
    } = useFetch<User[]>("https://jsonplaceholder.typicode.com/users");

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
                <Text style={styles.infoText}>Ładowanie użytkowników...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
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
                        onPress={() => console.log("Kliknięto użytkownika: ", item.id)}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    header: {},
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {},
    infoText: {},
});