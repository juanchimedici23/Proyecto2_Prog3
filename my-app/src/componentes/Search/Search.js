import React, { Component } from "react";
import {  db } from '../../firebase/config';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, useAnimatedValue, FlatList } from 'react-native';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textoABuscar: '',
            usuariosTexto: [],
            usuarioMail:[],
            cargando: true,
            resultados: [],
            textoAMostrar: '',
        }
    }
   
    componentDidMount() {
        db.collection('users').onSnapshot(querySnapshot => {
          let users = [];
          querySnapshot.forEach(doc => {
            users.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          this.setState({
            usuarios: users,
            cargando: false,
          });
        });
      }

    buscar(texto) {
      
      const busquedaTexto = texto.toLowerCase();
      // console.log(busquedaTexto);

      const results = this.state.usuarios.filter((user) => 
          user.data.username.toLowerCase().includes(busquedaTexto)
      );
      this.setState({resultados: results})
      console.log(results)
    }
    

    render() {
      console.log(this.state.resultados)
        return (
          <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ textoABuscar: text })}
            placeholder='Busca mail'
            multiline={true}
            value={this.state.textoABuscar}
          />
          {this.state.textoABuscar.length !== 0 ? (
            
            <TouchableOpacity style={''} onPress={() => this.buscar(this.state.textoABuscar)}>
              <Text style={styles.button}>Buscar</Text>
            </TouchableOpacity>
          ) : (
            <Text>Ingrese un texto</Text>
          )}
          {this.state.resultados.length === 0 ? (
            <Text style = {styles.noEncontre}>No se encontraron resultados</Text>
          ) : (
            <React.Fragment>
              <FlatList
                data={this.state.resultados}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Profile', { username: item.data.username })}
                  >
                    <View style={styles.view}>
                      <Text style={styles.users}>{item.data.username}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </React.Fragment>
          )}
        </View>
        
        )
    }
}

const style = StyleSheet.create({
// faltan estilos 
})

export default Search;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  noEncontre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
},

  input:{
    borderColor: '#ccc',
    borderWidth: 2,
    marginBottom: 5,
    padding: 10,
    fontSize: 15,
    borderRadius: 5,
  },

  button:{
    textAlign: 'center',
    backgroundColor: '#0095F6',
    padding: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
    fontWeight: 'bold',
    color:'#FFFFFF',
    fontSize: 17
  },

  textUser:{
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5
  }
})