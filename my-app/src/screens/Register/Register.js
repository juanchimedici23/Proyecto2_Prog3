import react, { Component } from 'react';
import { auth, db } from '../../firebase/config';
import { TouchableOpacity, Text, TextInput, View, StyleSheet } from 'react-native';

class Register extends Component {
    constructor() {
        super()
        this.state = {
            mail: '',
            usuario: '',
            contrasena: '',
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('Home')
            }
        })
    }
    register(mail, pass, userName) {
        auth.createUserWithEmailAndPassword(mail, pass)
            .then(res => {
                console.log('Correctamente registrado', res);

                db.collection('users').add({
                    mail: auth.currentUser.email,
                    createdAt: Date.now(),
                })
                .catch((e) => {
                        console.error(e);
                });
            })
    }
    
    render() {
        return (
            <View style={styles.register}>
                <Text>Register</Text>
                <TextInput
                    style={styles.text}
                    onChangeText={(text) => this.setState({ mail: text })}
                    placeholder='mail'
                    keyboardType='tu mail'
                    value={this.state.mail}
                />
                <TextInput
                    style={styles.text}
                    onChangeText={(text) => this.setState({ usuario: text })}
                    placeholder='usuario'
                    keyboardType='tu usuario'
                    value={this.state.usuario}
                />
                <TextInput
                    style={styles.text}
                    onChangeText={(text) => this.setState({ contrasena: text })}
                    placeholder='contrasena'
                    keyboardType='tu contrasena'
                    value={this.state.contrasena}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.register(this.state.mail, this.state.contrasena)}>
                    <Text style={styles.button}>Registrarse</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.button}>Ya estoy registrado</Text>
                </TouchableOpacity>

            </View>
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

})
export default Register