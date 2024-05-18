import { User } from "./models/results";

export type RootStackParamList = {
    Home: undefined;
    PokemonList: undefined;
    APIList: undefined;
    UserDetails: { user: User };
    Puzzle15: undefined;
};