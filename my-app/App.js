import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, FlatList } from 'react-native';
import Login from './src/componentes/Login/Login';
import Register from './src/componentes/Register/Register'

export default function App() {

  //Este array dsps hay que cambiarlo a la api pero x ahora uso este
  const users = [
    {name: 'Benjamin', id: 1},
    {name: 'Toto', id: 2},
    {name: 'Juanchi', id: 3}
  ]

  return (
    <View style={styles.container}>
      <Login/>

      <Image style={styles.image} source={require('./assets/EscudoCasla.png')} resizeMode='cover'/>

      <FlatList data={users} keyExtractor={(user) => user.id.toString()} renderItem={({item}) => <Text>{item.name}</Text>}/>

      <Register/> 

    </View>
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
