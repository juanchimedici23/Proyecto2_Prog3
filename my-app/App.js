import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, FlatList } from 'react-native';
import Login from './src/componentes/Login/Login';
import Register from './src/componentes/Register/Register'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './src/firebase/config';
import Home from './src/componentes/Home/Home'

export default function App() {
  const Stack = createNativeStackNavigator();

  //Este array dsps hay que cambiarlo a la api pero x ahora uso este
  const users = [
    {name: 'Benjamin', id: 1},
    {name: 'Toto', id: 2},
    {name: 'Juanchi', id: 3}
  ]

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
        <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
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
  image: {
    height: 200,
    width: 200,
    borderRadius: 15,
  }
});
