import React, {Component} from 'react';
import {Camera} from 'expo-camera';
import {db, storage} from '../../firebase/config'
import {TouchableOpacity, View, Text, Image} from 'react-native'

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
            this.setState({
                permisosDeHardware: true,
            })
        }

        )
        .catch( e => console.log(e))
    }

    sacarFoto(){
        this.metodosDeCamera.takePictureAsync() //Este metodo va a sacar la foto, guardar la URL en el estado y esconder la camara para mostrarle al usuario lo que saco
            .then(photo => {
                this.setState({
                    urlInternaFoto: photo.uri,
                    mostrarLaCamara: false,
                })
            })
            .catch(error => console.log(error))
    }

    guardarLaFotoEnStorage(){
        fetch(this.state.urlInternaFoto)
            .then( res => res.blob()) //es el metodo para recuperar binarios. Seria JSON para fotos y lo guardo en el segundo then con el parametro image
            .then( image => {
                const rutaFoto = storage.ref(`photos/${Date.now()}.jpg`); // Le pedimos que guarde la foto en una carpeta photos que si no la tiene la va a crear y dsps le digo creame un nombre en base a la fecha de creacion de la foto. Crea la ruta
                rutaFoto.put( image ) //Lo que nos retorno el metodo .ref() despues le aplicamos el metodo .put() que tiene un then para poder buscar la url de la foto en internet 
                    .then(()=>{
                        rutaFoto.getDownloadURL() //con este metodo capturamos esta url de la foto para tenerla en la mano y poder usarla
                            .then(url=>{
                                //Ahora queremos guardar la url de la foto como un dato mas del posteo
                                this.props.traerLaUrlDeLaFoto(url)

                                //Borramos la url temporal del estado
                                this.setState({
                                    urlInternaFoto: '',
                                })
                            })
                    })
            })
            .catch(error => console.log(error))
    }

    render(){
        // elreturn tiene que mostrar la camara o sino mostrar el preview de la foto con las opciones de cancelar o confirmar
        return(
            <View >
            {

            this.state.permisos ?
                
                this.state.mostrarLaCamara === false ?
                //Es la preview de la foto
                <React.Fragment>
                    <Image 
                    source = { {uri: this.state.urlInternaFoto} }
                    style = {''}
                    />
                    <TouchableOpacity onPress={()=> this.guardarLaFotoEnStorage}>
                        Aceptar
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> ''}>
                        Cancelar
                    </TouchableOpacity>
                </React.Fragment>
                :
                //Es la camara
                    <React.Fragment>
                        <Camera
                        //style={}
                        type = {Camera.Constants.Type.front}
                        ref = {metodosDeCamera => this.metodosDeCamera = metodosDeCamera=''}/>
                        <TouchableOpacity onPress={()=> this.sacarFoto()}>
                            <Text>Sacar foto</Text>
                        </TouchableOpacity>
                    </React.Fragment>
            :
                    <Text>La camara todavia no tiene permiso</Text>
            }
            </View>
            
        )

       
    }
}

export default MyCamera