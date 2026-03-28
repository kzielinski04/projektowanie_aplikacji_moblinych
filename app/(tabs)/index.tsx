import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
	Button,
	Modal, Pressable,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text, View
} from "react-native";

export type RootStackParamList = {
  	Home: undefined;
  	Details: {
    	title: string;
    	description: string;
    	location: string;
    	hour: string;
  	};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Header = ({ title }: { title: string }) => (
  	<View style={styles.header}>
    	<Text style={styles.headerTitle}>{title}</Text>
  	</View>
);

const ListItem = ({ title, location, hour, onPress }: any) => (
  	<Pressable style={styles.listItem} onPress={onPress}>
    	<View style={styles.itemRow}>
      		<Text style={styles.itemTitle}>{title}</Text>
      		<Text style={styles.itemHour}>{hour}</Text>
    	</View>
    	<Text style={styles.itemLocation}>{location}</Text>
  	</Pressable>
);
a
function HomeScreen({ navigation }: any) {
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

  	const handleCounter = () => {
    	const nextCount = count + 1;
    	setCount(nextCount);
    	if (nextCount > 4) setModalVisible(true);
  	};

  	return (
    	<View style={styles.container}>
      	<StatusBar barStyle="light-content" />
      	<Header title="Smart Campus" />

      	<View style={styles.counterSection}>
        	<Text style={styles.title}>Licznik kliknięć: {count}</Text>
        	<Button title="Zwiększ licznik" onPress={handleCounter} />
      	</View>

      	<Text style={styles.sectionTitle}>Harmonogram dnia:</Text>
      	<ScrollView style={styles.list}>
        	{events.map((event) => (
				<ListItem 
					key={event.id}
					title={event.title}
					location={event.location}
					hour={event.hour}
					onPress={() => navigation.navigate("Details", { 
						title: event.title, 
						description: event.description,
						location: event.location,
						hour: event.hour
					})}
				/>
        	))}
      	</ScrollView>

      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Osiągnąłeś limit!</Text>
            <Text style={{ marginBottom: 15 }}>Licznik wskazuje: {count}</Text>
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Zamknij</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function DetailsScreen({ route }: any) {
  const { title, description, location, hour } = route.params;
  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.detailsTitle}>{title}</Text>
      <View style={styles.detailsInfoBox}>
        <Text style={styles.detailsLabel}>Godzina:</Text>
        <Text style={styles.detailsValue}>{hour}</Text>
        
        <Text style={styles.detailsLabel}>Miejsce:</Text>
        <Text style={styles.detailsValue}>{location}</Text>
        
        <Text style={styles.detailsLabel}>Opis:</Text>
        <Text style={styles.detailsValue}>{description}</Text>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen} 
        options={{ title: 'Szczegóły wydarzenia' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  header: { backgroundColor: '#4a90e2', padding: 20, paddingTop: 50, alignItems: 'center' },
  headerTitle: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  counterSection: { padding: 20, alignItems: 'center', borderBottomWidth: 1, borderColor: '#ddd', backgroundColor: '#fff' },
  title: { fontSize: 18, marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', margin: 15, color: '#333' },
  list: { flex: 1 },
  listItem: { backgroundColor: 'white', padding: 15, marginHorizontal: 15, marginBottom: 10, borderRadius: 12, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  itemTitle: { fontSize: 18, fontWeight: 'bold', color: '#4a90e2' },
  itemHour: { fontSize: 14, fontWeight: 'bold', color: '#666', backgroundColor: '#eee', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5 },
  itemLocation: { color: '#888', fontStyle: 'italic' },
  
  detailsContainer: { flex: 1, padding: 20, backgroundColor: '#4a90e2' },
  detailsTitle: { fontSize: 30, color: 'white', fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  detailsInfoBox: { backgroundColor: 'white', borderRadius: 20, padding: 20, elevation: 5 },
  detailsLabel: { fontSize: 14, color: '#888', fontWeight: 'bold', marginTop: 10 },
  detailsValue: { fontSize: 18, color: '#333', marginBottom: 5 },

  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)' },
  modalView: { backgroundColor: 'white', borderRadius: 20, padding: 30, alignItems: 'center', width: '80%' },
  modalText: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#d9534f' },
  closeButton: { backgroundColor: '#4a90e2', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 10 },
  closeButtonText: { color: 'white', fontWeight: 'bold' }
});