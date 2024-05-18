import { RouteProp } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../types';
import UserDetail from '../components/UserDetails';

type PokemonDetailsScreenRouteProp = RouteProp<RootStackParamList, 'UserDetails'>;

type Props = {
    route: PokemonDetailsScreenRouteProp;
};

export const UserDetailsScreen = ({ route }: Props) => {

    const { user } = route.params;

    return (
        <View>
            <Text>UserDetailScreen</Text>
            <UserDetail user={user} ></UserDetail>
        </View>

    )
}