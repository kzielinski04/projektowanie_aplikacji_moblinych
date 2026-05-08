import { useEffect, useState } from "react"
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { Post } from "@/types/Post";
import ApiPostItem from "@/components/ApiPostItem";
import { ApiPostsScreenProps } from "@/types/Navigation";
import { useFetch } from "@/hooks/useFetch";

export default function ApiPostsScreen({ navigation }: ApiPostsScreenProps) {
    // const [posts, setPosts] = useState<Post[]>([]);
    // const [isLoading, setIsLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string>("");

    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         try {
    //             setIsLoading(true);
    //             setError("");

    //             const response = await fetch(
    //                 "https://jsonplaceholder.typicode.com/posts"
    //             );

    //             if (!response.ok) {
    //                 throw new Error();
    //             }

    //             const data: Post[] = await response.json();
    //             setPosts(data.slice(0, 10));
    //         } catch (err) {
    //             setError("Nie udało się połączyć z serwerem. Sprawdź swoje połączenie i spróbuj ponownie.");
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };
    //     fetchPosts();
    // }, []);

    const {
        data: posts,
        isLoading,
        error,
    } = useFetch<Post[]>("https://jsonplaceholder.typicode.com/posts");

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#007AFF" />
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
            {/* <View style={styles.headerContainer}>
                <Text style={styles.header}>Posty z API</Text>
                <Text style={styles.countText}>Liczba pobranych postów: {posts.length}</Text>
            </View> */}
            <Text style={styles.header}>Posty z API</Text>

            <FlatList
                data={posts ?? []}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ApiPostItem
                        id={item.id}
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
        paddingTop: 10,
    },
    headerContainer: {
        paddingHorizontal: 16,
        paddingBottom: 10,
    },
    header: {
        fontSize: 26,
        fontWeight: "900",
        color: "#1a1a1a",
    },
    countText: {
        fontSize: 14,
        color: "#666",
        marginTop: 2,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    infoText: {
        marginTop: 12,
        fontSize: 16,
        color: "#444",
    },
    errorText: {
        fontSize: 16,
        color: '#b00020',
        textAlign: 'center',
        lineHeight: 22,
    },
});