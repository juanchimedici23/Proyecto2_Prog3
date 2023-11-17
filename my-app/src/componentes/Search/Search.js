import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textoABuscar: '',
            usuarios: [],
            cargando: true,
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

    buscar() {
        const usuariosfiltrados = this.state.usuarios.filter(user =>
          user.data.email.includes(this.state.textoABuscar.toLowerCase())
        );
        console.log('Usuarios filtrados: ', usuariosfiltrados);
    
        this.props.navigation.navigate('ScreenResultados', {
          usuarios: usuariosfiltrados,
        });
      }
    

    render() {
        return (
            <View style={''}>
                <TextInput
                    style={''}
                    onChangeText = {(text) => this.setState({ textoABuscar: text })}
                    placeholder = 'Buscar'
                    multiline = {true}
                    value = {this.state.textoABuscar}
                />
                <TouchableOpacity style={''} onPress={() => this.buscar(this.state.textoABuscar)}>
                    <Text style={''}>Buscar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const style = StyleSheet.create({
// faltan estilos 
})

export default Search;
