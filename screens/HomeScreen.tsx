import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
    Button,
    Modal, Pressable,
    ScrollView,
    StyleSheet,
    Text, View
} from "react-native";
import { RootStackParamList } from "../app/(tabs)/index";

type HomeScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "Home">; 
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
    const [count, setCount] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    const events = [
        { id: 1, title: "Wykład React", description: "Wstęp do hooks i props", location: "Sala A1", hour: "10:00" },
        { id: 2, title: "Warsztaty AI", description: "Tworzenie promptów w praktyce", location: "Sala B2", hour: "12:00" },
        { id: 3, title: "Spotkanie koła", description: "Planowanie hackathonu", location: "Sala C3", hour: "15:00" },
        { id: 4, title: "Konferencja Tech", description: "Nowinki ze świata IT", location: "Aula Główna", hour: "09:00" },
        { id: 5, title: "Mecz Koszykówki", description: "Reprezentacja vs Absolwenci", location: "Hala Sportowa", hour: "17:30" },
        { id: 6, title: "Kurs UX/UI", description: "Podstawy projektowania makiet", location: "Laboratorium 4", hour: "11:15" },
        { id: 7, title: "Wieczór Gier", description: "Planszówki i integracja", location: "Klub Studencki", hour: "19:00" },
        { id: 8, title: "Webinar: Kariera", description: "Jak napisać pierwsze CV", location: "Online (Teams)", hour: "14:00" },
    ];

    const handlePress = () => {
        const nextCount = count + 1;
        setCount(nextCount);
        if (nextCount > 4) {
            setModalVisible(true);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.counterSection}>
                <Text style={styles.counterText}>Licznik: {count}</Text>
                <Button title="Zwiększ" onPress={handlePress} />
            </View>

            <Text style={styles.sectionTitle}>Lista wydarzeń</Text>
            
            <ScrollView style={styles.scrollContainer}>
                {events.map((event) => (
                    <Pressable 
                        key={event.id} 
                        style={styles.eventCard}
                        onPress={() => navigation.navigate("Details", {
                            title: event.title,
                            description: event.description,
                            location: event.location,
                            hour: event.hour
                        })}
                    >
                        <View style={styles.eventHeader}>
                            <Text style={styles.eventTitle}>{event.title}</Text>
                            <Text style={styles.eventHour}>{event.hour}</Text>
                        </View>
                        <Text style={styles.eventLocation}>{event.location}</Text>
                    </Pressable>
                ))}
            </ScrollView>

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
                        <Pressable
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Zamknij</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#f2f2f2",
    },
    counterSection: {
        padding: 20,
        backgroundColor: "white",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#ddd",
    },
    counterText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        margin: 15,
        color: "#333",
    },
    scrollContainer: {
        flex: 1,
    },
    eventCard: {
        backgroundColor: "white",
        marginHorizontal: 15,
        marginBottom: 10,
        padding: 15,
        borderRadius: 10,
        elevation: 3,
    },
    eventHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#4a90e2",
    },
    eventHour: {
        fontSize: 14,
        color: "#666",
        fontWeight: "bold",
    },
    eventLocation: {
        fontSize: 14,
        color: "#888",
        marginTop: 5,
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalView: {
        backgroundColor: "white",
        padding: 30,
        borderRadius: 20,
        alignItems: "center",
        elevation: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: "#4a90e2",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    closeButtonText: {
        color: "white",
        fontWeight: "bold",
    }
});