import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  Pressable,
} from "react-native";

import { FavoritePostsScreenProps } from "@/types/Navigation";
import {
  clearFavoritePostIds,
  getFavoritePostIds,
} from "../services/favoritesStorage";
import { styles } from "@/styles/FavoritePostsScreenStyles";

export default function FavoritePostsScreen({
  navigation,
}: FavoritePostsScreenProps) {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  const loadFavorites = async () => {
    const ids = await getFavoritePostIds();
    setFavoriteIds(ids);
  };

  const handleClearFavorites = async () => {
    await clearFavoritePostIds();
    setFavoriteIds([]);
  };

  useEffect(() => {
    loadFavorites();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ulubione posty</Text>

      <View style={styles.buttons}>
        <Button title="Odśwież" onPress={loadFavorites} />
        <Button title="Wyczyść ulubione" onPress={handleClearFavorites} />
      </View>

      <FlatList
        data={favoriteIds}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate("ApiPostDetails", { id: item })
            }
          >
            <Text style={styles.cardText}>Ulubiony post numer {item}</Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Brak ulubionych postów.</Text>
        }
      />
    </View>
  );
}

