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
                    style = {styles.container}
                    onChangeText={(text)=>this.setState({mail:text})}
                    placeholder='mail'
                    keyboardType='tu mail'
                    value={this.state.mail}
                    />
                <TextInput
                    style = {styles.container}
                    onChangeText={(text)=>this.setState({usuario:text})}
                    placeholder='usuario'
                    keyboardType='tu usuario'
                    value={this.state.usuario}
                    />
                <TextInput
                    style = {styles.container}
                    onChangeText={(text)=>this.setState({contrasena:text})}
                    placeholder='contrasena'
                    keyboardType='tu contrasena'
                    value={this.state.contrasena}
                    />
                <TouchableOpacity style={styles.text} onPress={() => this.register(this.state.mail, this.state.contrasena)}>
                    <Text style={styles.button}>Registrarse</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.text} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.button}>Ya estoy registrado</Text>
                </TouchableOpacity>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor : 'black',
        padding: 10,
        backgroundColor : 'grey',
    },
    text: {
        color: 'red',
        padding: 10,
        borderRadius: 10,
    },
    button: {
        color: 'white',
        padding: 10,
        borderRadius: 10,
        backgroundColor : 'green',
    }
 
})
export default Register