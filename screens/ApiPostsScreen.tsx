import React from "react";
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