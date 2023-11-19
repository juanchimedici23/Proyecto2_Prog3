import React, { Component } from 'react';
import { auth, db } from '../../firebase/config';
import { TouchableOpacity, Text, View, ScrollView, StyleSheet, FlatList, Image } from 'react-native';
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

    renderPost = ({ item }) => (
        <Post navigation={this.props.navigation} dataPost={item} style={styles.postContainer} />
    );

    render(){
        return(
            <ScrollView style={{ flex: 1 }}>
                <View>
                    <Text style={styles.heading}>LISTA DE POSTEOS CREADOS:</Text>
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={unPosteo => unPosteo.id}
                        renderItem={this.renderPost}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    postContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccd6dd',
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    postContent: {
        fontSize: 15,
        marginBottom: 10,
    },
    interactionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    interactionText: {
        color: '#657786',
        marginRight: 15,
    },
});

export default Home; 