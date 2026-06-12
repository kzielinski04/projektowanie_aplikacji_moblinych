import { RootStackParamList } from "@/types/Navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../../screens/HomeScreen";
import DetailsScreen from "@/screens/DetailsScreen";
import ApiPostsScreen from "@/screens/ApiPostsScreen";
import ApiPostDetailsScreen from "@/screens/ApiPostDetailsScreen";
import UsersScreen from "@/screens/UsersScreen";
import UserDetailsScreen from "@/screens/UserDetailsScreen";
import TodosScreen from "@/screens/TodosScreen";
import TodoDetailsScreen from "@/screens/TodoDetailsScreen";
import FavoritePostsScreen from "@/screens/FavoritePostsScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

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
                options={({ route }) => ({ title: route.params.title })}
            />
            <Stack.Screen 
                name="ApiPosts"
                component={ApiPostsScreen}
                options={{ title: "Posty z API" }}
            />
            <Stack.Screen
                name="ApiPostDetails"
                component={ApiPostDetailsScreen}
                options={{ title: "Szczegóły posta" }}
            />
            <Stack.Screen
                name="Users"
                component={UsersScreen}
                options={{ title: "Użytkownicy" }}
            />
            <Stack.Screen
                name="UserDetails"
                component={UserDetailsScreen}
                options={{ title: "Szczegóły użytkownika" }}
            />
            <Stack.Screen
                name="Todos"
                component={TodosScreen}
                options={{ title: "Lista zadań" }}
            />
            <Stack.Screen
                name="TodoDetails"
                component={TodoDetailsScreen}
                options={{ title: "Szczegóły zadania" }}
            />
            <Stack.Screen
                name="FavoritePosts"
                component={ FavoritePostsScreen }
                options={{ title: "Ulubione" }}
            />
        </Stack.Navigator>
    );
}