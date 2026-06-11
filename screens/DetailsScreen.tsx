import { RootStackParamList } from "@/types/Navigation";
import { RouteProp } from "@react-navigation/native";
import { Text, View } from "react-native";
import { styles } from "@/styles/DetailsScreenStyles";

type DetailsScreenRouteProp = RouteProp<RootStackParamList, "Details">;

type Props = {
    route: DetailsScreenRouteProp;
};

export default function DetailsScreen({ route }: Props) {
    const { title, description, location, hour, date, category, speaker } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.infoBox}>
                <Text style={styles.label}>Godzina:</Text>
                <Text style={styles.value}>{hour}</Text>

                <Text style={styles.label}>Miejsce:</Text>
                <Text style={styles.value}>{location}</Text>

                <Text style={styles.label}>Opis:</Text>
                <Text style={styles.value}>{description}</Text>

                <Text style={styles.label}>Data:</Text>
                <Text style={styles.value}>{date}</Text>

                <Text style={styles.label}>Kategoria:</Text>
                <Text style={styles.value}>{category}</Text>

                <Text style={styles.label}>Prelegent:</Text>
                <Text style={styles.value}>{speaker}</Text>
            </View>
        </View>
    );
}
