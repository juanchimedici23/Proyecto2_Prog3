import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, Image } from 'react-native';
import Post from '../../componentes/Post/Post';
import { auth, db } from '../../firebase/config';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            mail: '',
            usuario: '',
            contrasena: '',
            posts: [],
        };
    }

    componentDidMount() {
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

    renderPost = ({ item }) => (
        <Post navigation={this.props.navigation} dataPost={item} style={styles.postContainer} />
    );

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.heading}>LISTA DE POSTEOS CREADOS:</Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={unPosteo => unPosteo.id}
                    renderItem={this.renderPost}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    heading: {
      fontSize: 26,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 10,
      color: 'black',
    },
    postContainer: {
      backgroundColor: '#FFFFFF',
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#EAEAEA',
      borderRadius: 10,
      padding: 15,
    },
  });

export default Home;