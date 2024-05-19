import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Game from './components/game';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import HomeScreen from './screens/HomeScreen';
import APIListScreen from './screens/APIListScreen';
import { UserDetailsScreen } from './screens/UserDetailsScreen';
import { GameWithGesture } from './components/gameWithGesture';

const Stack = createStackNavigator<RootStackParamList>();


export default function App() {
  return (
    // <View style={styles.container}>
    //   <Game></Game>
    //   <StatusBar style="auto" />
    // </View>

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 300,
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 300,
              },
            },
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home Page' }}
        />
        <Stack.Screen
          name="Puzzle15"
          component={Game}
          options={{ title: 'Puzzle 15' }}
        />
        <Stack.Screen
          name="Puzzle15Gesture"
          component={GameWithGesture}
          options={{ title: 'Puzzle 15' }}
        />
        <Stack.Screen
          name="APIList"
          component={APIListScreen}
          options={{ title: 'Lista API' }}
        />
        <Stack.Screen
          name="UserDetails"
          component={UserDetailsScreen}
          options={({ route }) => ({ title: route.params.user.name.first + " " + route.params.user.name.last })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
