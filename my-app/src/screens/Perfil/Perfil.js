import React, { Component } from 'react'
import { TouchableOpacity, Text, View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { auth, db } from '../../firebase/config'
import Post from '../../componentes/Post/Post'
import { FontAwesome } from '@expo/vector-icons'


class Perfil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            info: {},
            id: ''
        }
    }

    componentDidMount() {
        db.collection('users')
            .where('mail', '==', auth.currentUser.email)
            .onSnapshot(info => {
                info.forEach(info =>
                    this.setState({
                        id: info.id,
                        datos: info.data()
                    })
                )
                console.log(this.state.datos);
            })
        db.collection('posteos')
            .where('autor', '==', auth.currentUser.email)
            .onSnapshot(infos => {
                console.log(infos)
                let posteosUsuario = []
                infos.forEach(info => {
                    posteosUsuario.push({
                        id: info.id,
                        datos: info.data()
                    })
                })
                this.setState({
                    posts: posteosUsuario
                },
                    console.log(this.state.posts))
            })




            

    }
    logout() {
        auth.signOut();
        this.props.navigation.navigate('Login');
    }
    
    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <View>
                    
                    <React.Fragment>
                        <TouchableOpacity  onPressOut={() => this.logout()}>
                            <Text style={styles.logout}>Logout</Text>
                        </TouchableOpacity>
                    </React.Fragment>
                    <Text style = {styles.bienvenido}> Bienvendio a tu Perfil! </Text>
                    <Text style = {styles.textBlack}> Biografía del usuario: {this.state.info.bio}</Text>
                    <Text style = {styles.textBlack}> Tu email: {auth.currentUser.email}</Text>
                    <Text style = {styles.textBlack}> Tu perfil se creó: {auth.currentUser.metadata.creationTime}</Text>
                    <Text style = {styles.textBlack}>Cantidad de posteos: {this.state.posts.length}</Text>
                    <Text></Text>

                    <FlatList
                        data={this.state.posts}
                        keyExtractor={(posteo => posteo.id)}
                        renderItem={({ item }) => <Post navigation={this.props.navigation} dataPost={item} />}
                    />


                </View>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    textBlack: {
        fontSize: 15,
        color: 'black',
        marginTop: 10,
      }, 
    logout: {
        color: '#fff',
        backgroundColor: '#000',
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        width: 70,
    },
    bienvenido: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10,
    },
    login: {
        paddingHorizontal: 10,
        marginTop: 20,
    },
    text: {
        height: 20,
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 5,
        marginVertical: 15,
    },
    button: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 5,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#28a745',
    },
    errores: {
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 5,
        borderWidth: 2,
        borderStyle: 'solid',
    },
})
    

    


export default Perfil; 
