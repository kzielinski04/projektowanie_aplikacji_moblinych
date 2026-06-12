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
import { SafeAreaView } from "react-native-safe-area-context";

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
    const [addEventModalVisible, setAddEventModalVisible] = useState(false);

    const handlePress = () => {
        const nextCount = count + 1;
        setCount(nextCount);
        if (nextCount > 4) setModalVisible(true);
    };

    const handleAddEvent = (newEvent: Omit<Event, "id">) => {
        addEvent(newEvent);
        setAddEventModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={filteredEvents}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={
                    <>
                        <View style={styles.counterSection}>
                            <Text style={styles.counterText}>Licznik: {count}</Text>
                            <Button title="Zwiększ" onPress={handlePress} />
                        </View>
                        <View style={styles.navigationButtons}>
                            <Button title="Dodaj wydarzenie" onPress={() => setAddEventModalVisible(true)} />
                            <Button title="Posty z API" onPress={() => navigation.navigate("ApiPosts")} />
                            <Button title="Ulubione posty" onPress={() => navigation.navigate("FavoritePosts")} />
                            <Button title="Użytkownicy" onPress={() => navigation.navigate("Users")} />
                            <Button title="Lista zadań" onPress={() => navigation.navigate("Todos")} />
                        </View>
                        <Text style={styles.header}>Wydarzenia</Text>

                        {/* Sekcja wyszukiwania */}
                        <TextInput
                            placeholder="Szukaj po nazwie lub opisie..."
                            placeholderTextColor="#999"
                            value={searchText}
                            onChangeText={setSearchText}
                            style={styles.searchInput}
                        />

                        {/* Sekcja filtrowania po kategorii */}
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.categoryScrollView}
                        >
                            <View style={styles.categoryList}>
                                <View
                                    style={[
                                        styles.categoryButton,
                                        selectedCategory === null
                                            ? styles.categoryButtonActive
                                            : styles.categoryButtonInactive,
                                    ]}
                                >
                                    <Text
                                        onPress={() => setSelectedCategory(null)}
                                        style={[
                                            styles.categoryButtonText,
                                            selectedCategory === null
                                                ? styles.categoryButtonTextActive
                                                : styles.categoryButtonTextInactive,
                                        ]}
                                    >
                                        Wszystkie
                                    </Text>
                                </View>

                                {availableCategories.map((category) => (
                                    <View
                                        key={category}
                                        style={[
                                            styles.categoryButton,
                                            selectedCategory === category
                                                ? styles.categoryButtonActive
                                                : styles.categoryButtonInactive,
                                        ]}
                                    >
                                        <Text
                                            onPress={() => setSelectedCategory(category)}
                                            style={[
                                                styles.categoryButtonText,
                                                selectedCategory === category
                                                    ? styles.categoryButtonTextActive
                                                    : styles.categoryButtonTextInactive,
                                            ]}
                                        >
                                            {category}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>

                        <Text style={styles.resultsCount}>
                            Wyników: {filteredEvents.length}
                        </Text>
                    </>
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Brak wyników</Text>
                        <Text style={styles.emptySubtext}>
                            Spróbuj zmienić filtry lub frazę wyszukiwania
                        </Text>
                    </View>
                }
                renderItem={({ item }: { item: Event }) => (
                    <ListItem
                        title={item.title}
                        date={item.date}
                        category={item.category}
                        isWorkshop={item.category === "Warsztaty"}
                        onPress={() => navigation.navigate("Details", {
                            id: item.id,
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={addEventModalVisible}
                onRequestClose={() => setAddEventModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Dodaj wydarzenie</Text>
                        <AddEventForm onAddEvent={handleAddEvent} />
                        <Button title="Anuluj" onPress={() => setAddEventModalVisible(false)} />
                    </View>
                </View>
            </Modal>
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
        </SafeAreaView>
    );
}