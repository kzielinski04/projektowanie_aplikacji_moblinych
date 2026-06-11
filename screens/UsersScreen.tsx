import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { User } from "@/types/User";
import UserItem from "@/components/UserItem";
import { useFetch } from "@/hooks/useFetch";
import { UsersScreenProps } from "@/types/Navigation";
import { styles } from "@/styles/UsersScreenStyles";

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

