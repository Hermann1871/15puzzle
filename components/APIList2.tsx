import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import useUserList from '../hooks/useUserList';
import { type User } from '../models/results';
import { UserDetailsScreen } from '../screens/UserDetailsScreen';
import UserDetails from './UserDetails';

type APIListNavigationProp = StackNavigationProp<RootStackParamList, 'APIList'>;

const APIList = () => {
    const { page, list, setNextPage, setPrevPage } = useUserList();
    const navigation = useNavigation<APIListNavigationProp>(); 
    const [selectedUser, setSelectedUser] = useState<User>();

    return (
        <View style={styles.container}>
            <Text>API COMPONENT</Text>

            <View style={styles.buttonContainer}>
                <Button title="⬅" onPress={setPrevPage} />
                <Button title={page.toString()} />
                <Button title="➡" onPress={setNextPage} />
            </View>

            <FlatList
                data={list}
                keyExtractor={(item) => item.id.value ?? item.login.uuid}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("UserDetails", { user: item })}
                    >
                        <View style={styles.listItem}>
                            <Image source={{ uri: item.picture.thumbnail }} style={styles.image} />
                            <Text style={styles.text}>{item.name.first} {item.name.last}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            {selectedUser && <UserDetails user={selectedUser} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        padding: 8,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        width: '100%',
    },
    text: {
        flex: 1,
        fontSize: 18,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 16,
        borderRadius: 25,
    },
});

export default APIList;
