import react, { Component } from 'react';
import { auth } from '../../firebase/config';
import { TouchableOpacity, Text, TextInput, View, StyleSheet } from 'react-native';

class Register extends Component {
    constructor(){
        super()
        this.state = {
            mail: '',
            usuario: '',
            contrasena: '',
        }
    }

    register(mail, pass){
        auth.createUserWithEmailAndPassword(mail, pass)
        .then(()=>{console.log('Te registraste con exito');})
        .catch(error => {console.log(error)})
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>Register</Text>
                <TextInput
                    style = {styles.text}
                    onChangeText={(text)=>this.setState({mail:text})}
                    placeholder='mail'
                    keyboardType='tu mail'
                    value={this.state.mail}
                    />
                <TextInput
                    style = {styles.text}
                    onChangeText={(text)=>this.setState({usuario:text})}
                    placeholder='usuario'
                    keyboardType='tu usuario'
                    value={this.state.usuario}
                    />
                <TextInput
                    style = {styles.text}
                    onChangeText={(text)=>this.setState({contrasena:text})}
                    placeholder='contrasena'
                    keyboardType='tu contrasena'
                    value={this.state.contrasena}
                    />
                <TouchableOpacity style={styles.container} onPress={() => this.register(this.state.mail, this.state.contrasena)}>
                    <Text style={styles.text}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor : 'blue',
        padding: 30,
    },
    text: {
        color: 'red',
        padding: 20,
        borderRadius: 10,
    },
    button: {
        color: 'red',
        padding: 20,
        borderRadius: 10,
    }
 
})

export default Register