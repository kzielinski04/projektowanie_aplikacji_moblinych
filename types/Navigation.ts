import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
    Home: undefined;
    Details: {
        title: string;
        description: string;
        location: string;
        hour: string;
        date: string;
        category: string;
        speaker: string;
    };
    ApiPosts: undefined;
    ApiPostDetails: {
        id: number;
        title: string;
        body: string;
    };
};

export type ApiPostsScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "ApiPosts">;
}

type ApiPostDetailsRouteProp = RouteProp<
    RootStackParamList,
    "ApiPostDetails"
>;

type ApiPostDetailsScreenProps = {
    route: ApiPostDetailsRouteProp;
};