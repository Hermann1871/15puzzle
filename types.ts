import { User } from "./models/results";

export type RootStackParamList = {
    Home: undefined;
    APIList: undefined;
    UserDetails: { user: User };
    Puzzle15: undefined;
    Puzzle15Gesture: undefined;
};