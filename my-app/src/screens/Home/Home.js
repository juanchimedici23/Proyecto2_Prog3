import React, { Component } from 'react';
import { auth, db } from '../../firebase/config';
import { TouchableOpacity, Text, View, ScrollView, StyleSheet, FlatList } from 'react-native';
import FormularioPost from '../../componentes/PostForm/PostForm';
import Post from '../../componentes/Post/Post';

class Home extends Component {
    constructor(){
        super();
        this.state = {
            mail: '',
            usuario: '',
            contrasena: '',
            posts: [],
        };
    }

    componentDidMount(){
        db.collection('posteos').orderBy('createdAt', 'desc').onSnapshot(
            listaPosteos => {
                let posteosAMostrar = [];
                listaPosteos.forEach(unPosteo => {
                    posteosAMostrar.push({
                        id: unPosteo.id,
                        datos: unPosteo.data()
                    });
                });

                this.setState({
                    posts: posteosAMostrar
                });
            }
        ); 
    }

    logout(){
        auth.signOut();
        this.props.navigation.navigate('Login');
    }

    render(){
        return(
            <ScrollView style={{ flex: 1 }}>
                <View>
                    <TouchableOpacity onPressOut={() => this.logout()}>
                        <Text> Logout </Text>
                    </TouchableOpacity>
                  

                    {/* <TextInput
                        //buscador no me funciona no encuentro el error 
                        style={styles.textInput}
                        onChangeText={(text) => {this.setState({ textoBuscador: text })}}
                        placeholder="Buscar usuarios.."
                        multiline={true}
                        value={this.state.textoBuscador}
                    />
                    <TouchableOpacity onPress={() => this.buscar(this.state.textoBuscador)}>
                    </TouchableOpacity>
                </View>  */}
                    
                    <Text>LISTA DE POSTEOS CREADOS: </Text>
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={unPosteo => unPosteo.id}
                        renderItem={({ item }) => <Post dataPost={item}/>}
                    />
                </View>
            </ScrollView>
        );
    }
}

export default Home;