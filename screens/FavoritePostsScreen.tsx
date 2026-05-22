import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Pressable,
} from "react-native";

import { FavoritePostsScreenProps } from "@/types/Navigation";
import {
  clearFavoritePostIds,
  getFavoritePostIds,
} from "../services/favoritesStorage";

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
  buttons: {
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 24,
    paddingHorizontal: 20,
  },
});