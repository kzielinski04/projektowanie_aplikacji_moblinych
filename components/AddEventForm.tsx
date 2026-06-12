import { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { Event } from "@/types/Event";
import { styles } from "@/styles/InputStyle";

type AddEventFormProps = {
    onAddEvent: (event: Omit<Event, "id">) => void;
};

export default function AddEventForm({ onAddEvent }: AddEventFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [hour, setHour] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");    
    const [speaker, setSpeaker] = useState("");

    const handleAddEvent = () => {
        if (title.length < 3) {
            Alert.alert("Błąd", "Tytuł musi mieć co najmniej 3 znaki.");
            return;
        }

        if (!date.trim()) {
            Alert.alert("Błąd", "Data nie może być pusta.");
            return;
        }

        if (!description || !hour || !location || !category || !speaker) {
            Alert.alert("Błąd", "Wszystkie pola muszą być uzupełnione.");
            return;
        }

        onAddEvent({
            title,
            description,
            hour,
            location,
            date,
            category,
            speaker,
        });

        Alert.alert("Sukces!", "Wydarzenie zostało pomyślnie dodane.");
        handleClearForm();
    }

    const handleClearForm = () => {
        setTitle("");
        setDescription("");
        setHour("");
        setLocation("");
        setDate("");
        setCategory("");
        setSpeaker("");
    }

    return (
        <View>
            <TextInput 
                placeholder="Tytuł"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <TextInput 
                placeholder="Opis"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />
            <TextInput 
                placeholder="Godzina"
                value={hour}
                onChangeText={setHour}
                style={styles.input}
            />
            <TextInput 
                placeholder="Lokalizacja"
                value={location}
                onChangeText={setLocation}
                style={styles.input}
            />
            <TextInput 
                placeholder="Data"
                value={date}
                onChangeText={setDate}
                style={styles.input}
            />
            <TextInput 
                placeholder="Kategoria"
                value={category}
                onChangeText={setCategory}
                style={styles.input}
            />
            <TextInput 
                placeholder="Prelegent"
                value={speaker}
                onChangeText={setSpeaker}
                style={styles.input}
            />
            <Button title="Dodaj wydarzenie" onPress={handleAddEvent} />
            <Button title="Wyczyść formularz" onPress={handleClearForm} />
        </View>
    )
}