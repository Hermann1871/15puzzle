import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { getUserList } from '../services/Users';

import { type UserAPIResponse, type User } from '../models/results';
import useUserList from '../hooks/useUserList';


// type APIListNavigationProp = StackNavigationProp<RootStackParamList, 'APIList'>;

// type APIListProps = {
//   navigation: APIListNavigationProp;
// };

// const APIList = ({ navigation }: APIListProps) => {
const APIList = () => {

    const { page, list, setNextPage, setPrevPage } = useUserList();


    // const fetchData = async () => {
    //     try {
    //         const data = await getUserList(1);
    //         console.log("TEST", data.results);
    //         console.log("TEST", data.info);
    //         // console.log("TEST", data.);
    //     } catch (error) {
    //         console.error("Error fetching user list:", error);
    //     }
    // };
    // fetchData();

    return (
        <View style={styles.container}>
            <Text>API COMPONENT</Text>
            <View style={styles.buttonContainer}>
                <Button title="⬅" onPress={() => setPrevPage()} />
                <Button title={page.toString()} onPress={() => setPrevPage()} />
                {/* <Text>{page}</Text> */}
                <Button title="➡" onPress={() => setNextPage()} />
            </View>
            {/* <FlatList
                data={list}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text style={styles.text}>{item.name}</Text>
                    </View>
                )}
            /> */}
            <FlatList
                data={list}
                keyExtractor={(item) => item.id.value ?? item.login.uuid} // Assuming each user has a unique id field.
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image source={{ uri: item.picture.thumbnail }} style={styles.image} />
                        <Text style={styles.text}>{item.name.first} {item.name.last}</Text>
                    </View>
                )}
            />
        </View >
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
    },
    text: {
        flex: 1,
        fontSize: 18,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 16,
    },
});


export default APIList;