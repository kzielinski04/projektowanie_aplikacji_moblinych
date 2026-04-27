import { useEffect, useState } from "react"
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Post } from "@/types/Post";
import ApiPostItem from "@/components/ApiPostItem";
import { ApiPostsScreenProps } from "@/types/Navigation";

export default function ApiPostsScreen({ navigation }: ApiPostsScreenProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
            const fetchPosts = async () => {
                try {
                    setIsLoading(true);
                    setError("");

                    const response = await fetch(
                        "https://jsonplaceholder.typicode.com/posts"
                    );

                    if (!response.ok) {
                        throw new Error("Nie udało się pobrać danych z serwera.");
                    }

                    const data: Post[] = await response.json();
                    setPosts(data);
                } catch (err) {
                    setError("Wystąpił błąd podczas pobierania danych.");
                } finally {
                    setIsLoading(false);
                }
            };
            fetchPosts();
        }, []
    );

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large"/>
                <Text style={styles.infoText}>Ładowanie danych...</Text>
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

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Posty z API</Text>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ApiPostItem
                        title={item.title}
                        body={item.body}
                        onPress={() =>
                            navigation.navigate("ApiPostDetails", {
                                id: item.id,
                                title: item.title,
                                body: item.body,
                            })
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
        paddingTop: 20, 
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginHorizontal: 12,
        marginBottom: 12,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoText: {
        marginTop: 12,
        fontSize: 16,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginHorizontal: 20,
    },
});