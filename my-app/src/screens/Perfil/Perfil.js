import React, { Component } from 'react'
import { TouchableOpacity, Text, View, StyleSheet, FlatList,ScrollView } from 'react-native';
import { auth, db } from '../../firebase/config'
import Post from '../../componentes/Post/Post'


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
            })
        db.collection('posteos')
        .where('autor','==',auth.currentUser.email)
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
            console.log(posteosUsuario))
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
                    <TouchableOpacity  style ={styles.errores} onPressOut={() => this.logout()}>
                        <Text> Logout </Text>
                    </TouchableOpacity>
                </React.Fragment>
                <Text> Bienvendio a tu Perfil! </Text>
                <Text> Biografía del usuario: {this.state.info.bio}</Text>
                <Text> Tu email: {auth.currentUser.email}</Text>
                <Text> Tu perfil se creó: {auth.currentUser.metadata.creationTime}</Text>
                <Text>Cantidad de posteos: {this.state.posts.length }</Text>

                <FlatList
                data={this.state.posts}
                keyExtractor={(posteo=>posteo.id)}
                renderItem={({item})=><Post navigation = {this.props.navigation} dataPost={item} />}
                />


            </View>
            </ScrollView>

        )
    }
}

const styles = StyleSheet.create({
    login:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    text:{
        height:20,
        paddingVertical:16,
        paddingHorizontal: 12,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 5,
        marginVertical:15,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:5, 
        borderWidth:2,
        borderStyle: 'solid',
        borderColor: '#28a745',
    },
    errores:{
        backgroundColor:'rgba(255, 0, 0, 0.1)',
        paddingHorizontal : 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:5, 
        borderWidth:2,
        borderStyle: 'solid',
    }
 
})


export default Perfil; 
