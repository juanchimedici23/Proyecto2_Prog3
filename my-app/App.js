import { Image, StyleSheet, Text, View, FlatList } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login/Login';
import Register from './src/screens/Register/Register'
import Home from './src/screens/Home/Home'
import Perfil from './src/screens/Perfil/Perfil';
import PerfilOtros from './src/screens/PerfilOtros/PerfilOtros';
import Menu from './src/componentes/Menu/Menu';
import Search from './src/componentes/Search/Search';
import Comentarios from './src/componentes/Comentarios/Comentarios';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
        <Stack.Screen name='Register' component={Register} options={{headerShown: false}}/>
        <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
        <Stack.Screen name='Perfil' component={Perfil} options={{headerShown: false}}/>
        <Stack.Screen name='PerfilOtros' component={PerfilOtros} options={{headerShown: false}}/>
        <Stack.Screen name='Menu' component={Menu} options={{headerShown: false}}/>
        <Stack.Screen name='Search' component={Search} options={{headerShown: false}}/>
        <Stack.Screen name='Comentarios' component={Comentarios} options={{headerShown: false}}/>      
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
