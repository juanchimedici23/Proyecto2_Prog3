import react, { Component } from 'react';
import { auth, db} from '../../firebase/config';
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
    logout(){
        auth.signOut();
        this.props.navigation.navigate('Login')
    }

    render(){
        return(
            <View>
                <TouchableOpacity onPressOut={()=>this.props.navigation.navigate('Home')}>
                    <Text> Home </Text>
                </TouchableOpacity>
                <TouchableOpacity onPressOut={()=>this.props.navigation.navigate('Perfil')}>
                    <Text> Perfil </Text>
                </TouchableOpacity>
                <TouchableOpacity onPressOut={()=>this.logout()}>
                    <Text> Logout </Text>
                </TouchableOpacity>

                
            </View>
        )
    }

}

export default Home