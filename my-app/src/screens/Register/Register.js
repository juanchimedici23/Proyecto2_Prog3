import react, { Component } from 'react';
import { auth, db } from '../../firebase/config';
import { TouchableOpacity, Text, TextInput, View, StyleSheet } from 'react-native';
import { MyCamera } from '../../componentes/Camara/Camara';

class Register extends Component {
    constructor() {
        super()
        this.state = {
            mail: '',
            usuario: '',
            contrasena: '',
            bio: '',
            fotoPerfil: '',
            errorRegistro: '',
            camara: false
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('Login')
            }
        })
    }
    register(mail, pass, userName, biografia,fotoPerfil) {

        if(this.state.mail == ''|| this.state.mail.includes('@')== false){
            return this.setState({
                errorRegistro: 'Ingresa una direccion de correo valida'
            })
        } else if (this.state.contrasena == ''|| this.state.contrasena.length<6){
            return this.setState({errorRegistro: 'Ingresa una contraseña de mas de 6 caracteres'})
        }
        else if (this.state.usuario==''){
            return this.setState({errorRegistro: 'Ingrese un nombre de usuario valido'})
        }

        auth.createUserWithEmailAndPassword(mail, pass)
            .then(res => {
                console.log('Correctamente registrado', res);

                db.collection('users').add({
                    mail: auth.currentUser.email,
                    username:userName,
                    bio:biografia,
                    createdAt: Date.now(),
                    fotoPerfil: fotoPerfil
                })
                .catch((e) => {
                       
                        this.setState({
                            errorRegistro: e.message
                        })
                        console.log(e.message);
                   
                });
            })
        
        
    }
    subirfotoURL(){
        this.setState({
            fotoPerfil: url,
            camara: false   
        })
    }
    render() {
        return (
            <>
                {this.state.camara ?
                <MyCamera subirfotoURL={(url)=>this.subirfotoURL(url)}/>:
                null
                }

            <View style={styles.register}>
                <Text>Register</Text>

                <TextInput
                    style={styles.text}
                    onChangeText={(text) => this.setState({ mail: text })}
                    placeholder='Mail(obligatorio)'
                    keyboardType='tu mail'
                    value={this.state.mail}
                />
                <TextInput
                    style={styles.text}
                    onChangeText={(text) => this.setState({ usuario: text })}
                    placeholder='User(obligatorio)'
                    keyboardType='tu usuario'
                    value={this.state.usuario}
                />
                <TextInput
                    style={styles.text}
                    onChangeText={(text) => this.setState({ contrasena: text })}
                    placeholder='Password(obligatorio)'
                    keyboardType='tu contrasena'
                    value={this.state.contrasena}
                />
                <TextInput
                    style={styles.text}
                    onChangeText={(text) => this.setState({ bio: text })}
                    placeholder='Bio'
                    keyboardType='tu bio'
                    value={this.state.bio}
                />
                <TextInput
                    // style={styles.foto_registe}
                    onChangeText={(url)=> this.setState({fotoPerfil:url})}
                    placeholder='URL foto perfil'
                    keyboardType='email-adress'
                    value={this.state.fotoPerfil}
                />
                {this.state.mail.length>0 && this.state.contrasena.length>0 && this.state.usuario.length>0 ?
                (<TouchableOpacity style={styles.button} onPress={() => this.register(this.state.mail, this.state.contrasena,this.state.usuario, this.state.bio, this.state.fotoPerfil)}>
                    <Text style={styles.button}>Registrarse</Text>
                </TouchableOpacity>
            
                ):(
                    <TouchableOpacity onPress={() => this.setState({ errorRegistro: "Los campos obligatorios no pueden quedar vacíos" })}>
                    </TouchableOpacity>
                )}
                { 
                this.state.errorRegistro.length > 0?
                <Text style={styles.errores}>{this.state.errorRegistro}</Text>:
                null
                }
                


                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.button}>Ya estoy registrado</Text>
                </TouchableOpacity>

            </View>
            </>
        )
    }

}

const styles = StyleSheet.create({
    register: {
        paddingHorizontal: 10,
        marginTop: 20,
    },
    text: {
        height: 20,
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 5,
        marginVertical: 15,
    },
    button: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 5,
        borderWidth: 2,
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
export default Register