import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#4a90e2',
    },
    title: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    infoBox: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        elevation: 5,
    },
    label: {
        fontSize: 14,
        color: '#888',
        fontWeight: 'bold',
        marginTop: 10,
    },
    value: {
        fontSize: 18,
        color: '#333',
        marginBottom: 5,
    },
});
