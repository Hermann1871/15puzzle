import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import APIList from '../components/APIList';

// type APIListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'APIList'>;

// type APIListScreenProps = {
//   navigation: APIListScreenNavigationProp;
// };

// const APIListScreen = ({ navigation }: APIListScreenProps) => {
const APIListScreen = () => {
  return (
    <View style={styles.container}>
      <Text>PROVA API</Text>
      <APIList/>
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
});


export default APIListScreen;