import react, { Component } from 'react';
import { auth } from '../../firebase/config';
import { TouchableOpacity, Text, TextInput, View, StyleSheet } from 'react-native';

class Home extends Component {
    constructor(){
        super()
        this.state = {
            mail: '',
            usuario: '',
            contrasena: '',
        }
    }

    render(){
        return(
            <View>
                <Text>Estas en la home</Text>
            </View>
        )
    }

}

export default Home