import React, { Component } from 'react'
import { TouchableOpacity, View, Text, FlatList } from 'react-native'
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
                    data: info.data()
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

            <View>
                <React.Fragment>
                    <TouchableOpacity onPressOut={() => this.logout()}>
                        <Text> Logout </Text>
                    </TouchableOpacity>
                </React.Fragment>
                <Text> Bienvendio a tu Perfil! </Text>
                <Text> Biografía del usuario: {this.state.info.bio}</Text>
                <Text> Tu email: {auth.currentUser.email}</Text>
                <Text> Tu perfil se creó: {auth.currentUser.metadata.creationTime}</Text>

                <FlatList
                data={this.state.posts}
                keyExtractor={(posteo=>posteo.id)}
                renderItem={({post})=><Post datapost={post} navigation = {this.props.navigation}/>}
                />


            </View>

        )
    }
}

export default Perfil; 
