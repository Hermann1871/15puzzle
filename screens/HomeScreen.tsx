import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Page</Text>
      <View style={styles.myButton}>
        <Button
          title="Vai alla lista API"
          onPress={() => navigation.navigate('APIList')}
        />
      </View>
      <Button
        title="Vai al gioco del 15"
        onPress={() => navigation.navigate('Puzzle15')}
      />
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
  myButton: {
    margin: 20,
  }
});


export default HomeScreen;