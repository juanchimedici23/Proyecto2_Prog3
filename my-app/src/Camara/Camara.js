import React, {Component} from 'react';
import {Camera} from 'expo-camera';
import {db, storage} from '../firebase/config'
import {TouchableOpacity, View, Text} from 'react-native'

class MyCamera extends Component {
    constructor(props){
        super(props)
        this.state = {
            permisoDeHardware: false,
            urlInternaFoto: '',
            mostrarLaCamara: true, //esto nos sirve para saber si mostramos la camara o si mostramos la preview de la foto
        }

        this.metodosDeCamera = ''

    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then( ()=>{
            this.setState({permisosDeHardware: true,})
        }

        )
        .catch( e => console.log(e))
    }

    sacarFoto(){

    }

    guardarLaFotoEnStorage(){

    }

    render(){
        // elreturn tiene que mostrar la camara o sino mostrar el preview de la foto con las opciones de cancelar o confirmar
        return(
            <View>
                <Camera
                //style={}
                type = {Camera.Constants.Type.front}
                ref = {metodosDeCamera => this.metodosDeCamera = metodosDeCamera=''}
            
            />
            <TouchableOpacity onPress={()=> this.sacarFoto()}>
                <Text>Sacar foto</Text>
            </TouchableOpacity>
            </View>
            
        )

       
    }
}