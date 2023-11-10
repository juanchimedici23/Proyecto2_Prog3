import react, { Component } from 'react';
import { auth } from '../../firebase/config';
import { TouchableOpacity, Text, TextInput, View, StyleSheet } from 'react-native';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            mail: '',
            usuario: '',
            contrasena: '',
        }
    }

    login(mail, pass){
        auth.signInWithEmailAndPassword(mail, pass)
        .then(()=>{console.log('Te logueaste con exito');})
        .catch(error => {console.log(error)})
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>Login</Text>
                <TextInput
                    style = {styles.container}
                    onChangeText={(text)=>this.setState({mail:text})}
                    placeholder='mail'
                    keyboardType='tu mail'
                    value={this.state.mail}
                    />
                <TextInput
                    style = {styles.container}
                    onChangeText={(text)=>this.setState({contrasena:text})}
                    placeholder='contrasena'
                    keyboardType='tu contrasena'
                    value={this.state.contrasena}
                    />
                <TouchableOpacity style={styles.text} onPress={() => this.login(this.state.mail, this.state.contrasena)}>
                    <Text style={styles.button}>Loguearse</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.text} onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.button}>Crear un usuario</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.text} onPress={() => this.props.navigation.navigate('Home')}>
                    <Text style={styles.button}>Home</Text>
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

export default Login