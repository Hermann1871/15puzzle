import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { User } from '../models/results';

type UserDetailProps = {
    user: User;
};

const renderValue = (value: any): string => {
    if (typeof value === 'object') {
        if (Array.isArray(value)) {
            return value.map(item => JSON.stringify(item)).join(', ');
        }
        return JSON.stringify(value, null, 2);
    }
    return value.toString();
};

export const UserDetail = ({ user }: UserDetailProps) => {

    const [showDetails, setShowDetails] = useState(false)

    return (
        <View style={styles.container}>
            <Image source={{ uri: user.picture.large }} style={styles.image} />
            <Text style={styles.name}>{user.name.first} {user.name.last}</Text>
            <Text style={styles.detail}>Email: {user.email}</Text>
            <Text style={styles.detail}>Phone: {user.phone}</Text>
            <Text style={styles.detail}>Location: {user.location.city}, {user.location.country}</Text>

            {/* <ScrollView>
                {Object.entries(user).map(([key, value]) => (
                    <View key={key} >
                        <Text >{key}: {renderValue(value)}</Text>
                    </View>
                ))}
            </ScrollView> */}

            <TouchableOpacity
                onPress={() => setShowDetails(!showDetails)}
            >
                <Text style={styles.detail}>{showDetails ? 'Hide Details' : 'Show Details'}</Text>
            </TouchableOpacity>

            <ScrollView>
                {showDetails && <Text>{JSON.stringify(user, null, 2)}</Text>}
            </ScrollView>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        margin: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detail: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default UserDetail;
