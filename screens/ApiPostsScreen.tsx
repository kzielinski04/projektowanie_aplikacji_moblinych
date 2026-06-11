import React from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { Post } from "@/types/Post";
import ApiPostItem from "@/components/ApiPostItem";
import { ApiPostsScreenProps } from "@/types/Navigation";
import { useFetch } from "@/hooks/useFetch";
import { styles } from "@/styles/ApiPostsScreenStyles";

export default function ApiPostsScreen({ navigation }: ApiPostsScreenProps) {
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

    if (!isLoading && !error && posts?.length === 0) {
        return (
            <View style={styles.centered}>
                <Text style={styles.infoText}>Brak danych do wyświetlenia.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
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
                            })
                        }
                    />
                )}
            />
        </View>
    );
}

