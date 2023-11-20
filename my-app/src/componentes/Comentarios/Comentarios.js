import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';

class Comentarios extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comentario: '',
            id: '',
            infoComentario: {}
        }
    }

    componentDidMount() {
        db.collection('posteos')
            // .orderBy('createdAt', 'asc')
            .doc(this.props.route.params.id)
            .onSnapshot(docs => {
                this.setState({
                    id: docs.id,
                    infoComentario: docs.data()
                })
            })
    }

    agregarComentario(id, comentario) {
        db.collection('posteos')
            .doc(id)
            .update({
                    comentarios: firebase.firestore.FieldValue.arrayUnion({
                    autor: auth.currentUser.email,
                    createdAt: Date.now(),
                    comentario: comentario
                })
            })
            .catch(e => console.log(e))
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                {this.state.infoComentario.comentarios && this.state.infoComentario.comentarios.length > 0 ? (
                    <FlatList
                        data={this.state.infoComentario.comentarios}
                        keyExtractor={item => item.createdAt.toString()}
                        renderItem={({ item }) => (
                            <View>
                                <Text>{item.autor} : {item.comentario}</Text>
                            </View>
                        )}
                    />
                ) : (
                    <Text>Por el momento no hay comentarios</Text>
                )}

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.setState({ comentario: text })}
                        keyboardType='default'
                        placeholder='Deja tu comentario'
                        value={this.state.comentario}
                    />
                    {this.state.comentario.length>0 ? (
                    <TouchableOpacity style={styles.button} onPress={() => this.agregarComentario(this.state.id, this.state.comentario)}>
                        <Text>Agregar comentario</Text>
                    </TouchableOpacity>)
                    : (<TouchableOpacity>
                        <Text>No podes publicar un comentario vacio</Text>
                    </TouchableOpacity>)}

                </View>
                <Text onPress={() => this.props.navigation.navigate('Menu')} style={styles.button}>
                    Volver a home
                </Text>
            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    button: {
        backgroundColor: 'blue',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'blue',
    },
});

export default Comentarios;
