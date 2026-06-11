import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Button } from "react-native";
import { ApiPostDetailsScreenProps } from "@/types/Navigation";
import { useFetch } from "@/hooks/useFetch";
import { Post } from "@/types/Post";
import { Comment } from "@/types/Comment";
import {
    addFavoritePostId,
    removeFavoritePostId,
    isFavoritePost,
} from "../services/favoritesStorage";
import { styles } from "@/styles/ApiPostDetailsScreenStyles";

export default function ApiPostDetailsScreen({
    route,
}: ApiPostDetailsScreenProps) {
    const { id } = route.params;
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const { data: comments, isLoading: areCommentsLoading, error: commentsError } = useFetch<Comment[]>(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
    );

    const { data: post, isLoading, error } = useFetch<Post>(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
    );

    useEffect(() => {
        const checkFavorite = async () => {
            const result = await isFavoritePost(id);
            setIsFavorite(result);
        };
        checkFavorite();
    }, [id]);

    const toggleFavorite = async () => {
        if (isFavorite) {
            await removeFavoritePostId(id);
            setIsFavorite(false);
        } else {
            await addFavoritePostId(id);
            setIsFavorite(true);
        }
    };

    if (isLoading || areCommentsLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.infoText}>Ładowanie szczegółów...</Text>
            </View>
        );
    }

    if (error || commentsError) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    if (!post) {
        return (
            <View style={styles.centered}>
                <Text style={styles.infoText}>Nie znaleziono posta.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{post.title}</Text>
            <Button
                title={isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
                  onPress={toggleFavorite}
            />      
            <Text style={styles.meta}>ID posta: {id}</Text>
            <Text style={styles.body}>{post.body}</Text>
            <Text style={styles.author}>Autor: {post.userId}</Text>
            <Text style={styles.comments}>
                Liczba komentarzy: {comments?.length ?? 0}
            </Text>
        </View>
    );
}

