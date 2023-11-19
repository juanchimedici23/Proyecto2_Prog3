import react, { Component } from 'react';
import { auth } from '../../firebase/config';
import { TouchableOpacity, Text, TextInput, View, StyleSheet, ActivityIndicator } from 'react-native';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            log: false,
            mail: '',
            usuario: '',
            contrasena: '',
            errorSesion:''
        }
    }
    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user){
                this.props.navigation.navigate('Menu')
            } 
            this.setState({log: true})
        })
    }
    login(mail, pass){
        auth.signInWithEmailAndPassword(mail, pass)
        .then(()=>{console.log('Te logueaste con exito');})
        .catch(e => {
            if (e.code == 'auth/internal-error') {
                this.setState({
                    errorSesion: "La contraseña es incorrecta"
                })
            }
    
            else {
                this.setState({
                    errorSesion:'El email ingresado no es correcto'
                })
            }
            console.log(e)
        })
    }

    render() {
        return (
          <View style={styles.login}>
            {this.state.log ? (
              <>
                <Text>Login</Text>
                <TextInput
                  style={styles.text}
                  onChangeText={(text) => this.setState({ mail: text })}
                  placeholder="Mail"
                  keyboardType="email-address"
                  value={this.state.mail}
                />
                <TextInput
                  style={styles.text}
                  onChangeText={(text) => this.setState({ contrasena: text })}
                  placeholder="Password"
                  secureTextEntry={true}
                  value={this.state.contrasena}
                />
    
                {this.state.mail.length > 0 && this.state.contrasena.length > 0 ? (
                  <TouchableOpacity style={styles.button} onPress={() => this.login(this.state.mail, this.state.contrasena)}>
                    <Text style={styles.button}>Loguearse</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.button} onPress={() => this.setState({ errorSesion: "Los campos no pueden quedar vacíos" })}>
                    <Text style={styles.button} >Login</Text>
                  </TouchableOpacity>
                )}
    
                {this.state.errorSesion.length > 0 ? <View><Text style= {styles.errores}>{this.state.errorSesion}</Text></View> : null}
    
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Register')}>
                  <Text style={styles.button}>Crear un usuario</Text>
                </TouchableOpacity>
              </>
            ) : (
              <ActivityIndicator size='small' color='blue' />
            )}
          </View>
        );
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

export default Login