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
            <View style={styles.login}>
                <Text>Login</Text>
                <TextInput
                    style = {styles.text}
                    onChangeText={(text)=>this.setState({mail:text})}
                    placeholder='mail'
                    keyboardType='tu mail'
                    value={this.state.mail}
                    />
                <TextInput
                    style = {styles.text}
                    onChangeText={(text)=>this.setState({contrasena:text})}
                    placeholder='contrasena'
                    keyboardType='tu contrasena'
                    value={this.state.contrasena}
                    />
                <TouchableOpacity style={styles.button} onPress={() => this.login(this.state.mail, this.state.contrasena)}>
                    <Text style={styles.button}>Loguearse</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.button}>Crear un usuario</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Home')}>
                    <Text style={styles.button}>Home</Text>
                </TouchableOpacity>

            </View>
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
 
})

export default Login