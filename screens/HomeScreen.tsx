import React from 'react';
import { View, Text, Button, StyleSheet, Pressable } from 'react-native';
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

      <Pressable
        style={styles.pressable}
        onPress={() => navigation.navigate('APIList')}
      >
        <Text
          style={styles.text}
        >Contacts API</Text>
      </Pressable>

      <Pressable
        style={styles.pressable}
        onPress={() => navigation.navigate('Puzzle15')}
      >
        <Text
          style={styles.text}
        >15 Puzzle</Text>
      </Pressable>

      <Pressable
        style={styles.pressable}
        onPress={() => navigation.navigate('Puzzle15Gesture')}
      >
        <Text
          style={styles.text}
        >15 Puzzle with Gesture</Text>
      </Pressable>

      {/* <View style={styles.myButton}>
        <Button
          title="Vai alla lista API"
          onPress={() => navigation.navigate('APIList')}
        />
      </View> */}

      {/* <View style={styles.myButton}>
        <Button
          title="Vai al gioco del 15"
          onPress={() => navigation.navigate('Puzzle15')}
        />
      </View> */}

            {/* <View style={styles.myButton}>
        <Button
          title="Vai al gioco del 15 con Gesture"
          onPress={() => navigation.navigate('Puzzle15Gesture')}
        />
      </View> */}






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
  },
  pressable: {
    padding: 10,
    margin: 20,
    // backgroundColor: 'blue',
    backgroundColor: 'rgb(33, 150, 243)',
    borderRadius: 3,
  },
  text: {
    color: 'white',
    fontWeight: '500',
    textTransform: 'uppercase',
  }
});


export default HomeScreen;