/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import CitySuggestionsScreen from './src/presentation/screens/CitySuggestionsScreen';
import DetailsScreen from './src/presentation/screens/DetailsScreen';
import HomeScreen from './src/presentation/screens/HomeScreen';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTransparent: true,
          headerTitle: '',
          headerTintColor: '#fff', // Color blanco para el botón de "Go Back"
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="CitySuggestions" component={CitySuggestionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
