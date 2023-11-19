import React, { Component } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { auth, db } from '../../firebase/config'


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
            </View>

        )
    }
}

export default Perfil; 
