import { events as initialEvents } from "@/data/event";
import { styles } from "@/styles/HomeScreenStyles";
import { Event } from "@/types/Event";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useMemo, useState } from "react";
import {
    Button,
    FlatList,
    Modal,
    ScrollView,
    Text,
    TextInput,
    View
} from "react-native";

import AddEventForm from "@/components/AddEventForm";
import { RootStackParamList } from "@/types/Navigation";
import ListItem from "../components/ListItem";

type HomeScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Home">; 
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
    const [events, setEvents] = useState<Event[]>(initialEvents);
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const addEvent = (newEvent: Omit<Event, "id">) => {
        const eventToAdd: Event = {
            id: Date.now(),
            ...newEvent,
        };

        setEvents((prevEvents) => [eventToAdd, ...prevEvents]);
    };

    // Logika filtrowania wydzielona za pomocą useMemo
    const filteredEvents = useMemo(() => {
        return events.filter((event) => {
            const searchLower = searchText.toLowerCase();
            const matchesSearch =
                event.title.toLowerCase().includes(searchLower) ||
                event.description.toLowerCase().includes(searchLower);

            const matchesCategory =
                selectedCategory === null || event.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [events, searchText, selectedCategory]);

    // Unikalne kategorie z bieżących danych
    const availableCategories = useMemo(() => {
        const categories = Array.from(new Set(events.map((e) => e.category)));
        return categories.sort();
    }, [events]);

    const [count, setCount] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    const handlePress = () => {
        const nextCount = count + 1;
        setCount(nextCount);
        if (nextCount > 4) setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <AddEventForm onAddEvent={addEvent}/>
            <FlatList
                data={filteredEvents}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={
                    <>
                        <View style={styles.counterSection}>
                            <Text style={styles.counterText}>Licznik: {count}</Text>
                            <Button title="Zwiększ" onPress={handlePress} />
                        </View>
                        <Text style={styles.header}>Wydarzenia</Text>

                        {/* Sekcja wyszukiwania */}
                        <TextInput
                            placeholder="Szukaj po nazwie lub opisie..."
                            placeholderTextColor="#999"
                            value={searchText}
                            onChangeText={setSearchText}
                            style={{
                                borderWidth: 1,
                                borderColor: "#ccc",
                                borderRadius: 8,
                                paddingHorizontal: 12,
                                paddingVertical: 10,
                                marginHorizontal: 16,
                                marginVertical: 12,
                                fontSize: 14,
                                backgroundColor: "#fff",
                            }}
                        />

                        {/* Sekcja filtrowania po kategorii */}
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{
                                marginHorizontal: 16,
                                marginBottom: 12,
                                maxHeight: 50,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    gap: 8,
                                }}
                            >
                                <View
                                    style={{
                                        paddingHorizontal: 12,
                                        paddingVertical: 8,
                                        backgroundColor:
                                            selectedCategory === null
                                                ? "#007AFF"
                                                : "#ddd",
                                        borderRadius: 6,
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text
                                        onPress={() => setSelectedCategory(null)}
                                        style={{
                                            color:
                                                selectedCategory === null
                                                    ? "#fff"
                                                    : "#000",
                                            fontWeight: "600",
                                            fontSize: 12,
                                        }}
                                    >
                                        Wszystkie
                                    </Text>
                                </View>

                                {availableCategories.map((category) => (
                                    <View
                                        key={category}
                                        style={{
                                            paddingHorizontal: 12,
                                            paddingVertical: 8,
                                            backgroundColor:
                                                selectedCategory === category
                                                    ? "#007AFF"
                                                    : "#ddd",
                                            borderRadius: 6,
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Text
                                            onPress={() =>
                                                setSelectedCategory(category)
                                            }
                                            style={{
                                                color:
                                                    selectedCategory === category
                                                        ? "#fff"
                                                        : "#000",
                                                fontWeight: "600",
                                                fontSize: 12,
                                            }}
                                        >
                                            {category}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>

                        {/* Licznik wyników */}
                        <Text
                            style={{
                                marginHorizontal: 16,
                                marginBottom: 8,
                                color: "#666",
                                fontSize: 12,
                            }}
                        >
                            Wyników: {filteredEvents.length}
                        </Text>
                    </>
                }
                ListEmptyComponent={
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            paddingVertical: 40,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                color: "#999",
                                marginBottom: 8,
                            }}
                        >
                            Brak wyników
                        </Text>
                        <Text
                            style={{
                                fontSize: 13,
                                color: "#ccc",
                                textAlign: "center",
                                paddingHorizontal: 20,
                            }}
                        >
                            Spróbuj zmienić filtry lub frażę wyszukiwania
                        </Text>
                    </View>
                }
                renderItem={({ item }: { item: Event }) => (
                    <ListItem 
                        title={item.title}
                        description={item.description}
                        location={item.location}
                        hour={item.hour}
                        date={item.date}
                        category={item.category}
                        speaker={item.speaker}
                        isWorkshop={item.category === "Warsztaty"}
                        isHighlighted={item.id % 2 === 0}
                        onPress={() => navigation.navigate("Details", {
                            title: item.title,
                            description: item.description,
                            location: item.location,
                            hour: item.hour,
                            date: item.date,
                            category: item.category,
                            speaker: item.speaker,
                        })}
                    />
                )}
            />
            <Button 
                title="Pokaż posty z API"
                onPress={() => navigation.navigate("ApiPosts")}
            />
            <Button
                title="Pokaż ulubione posty"
                onPress={() => navigation.navigate("FavoritePosts")}
            />
            <Button 
                title="Pokaż użytkowników z API"
                onPress={() => navigation.navigate("Users")}
            />
            <Button 
                title="Pokaż listę zadań"
                onPress={() => navigation.navigate("Todos")}
            />
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Limit kliknięć!</Text>
                        <Text>Kliknąłeś już {count} razy.</Text>
                        <Button title="Zamknij" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}