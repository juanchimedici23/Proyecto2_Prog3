import React, { Component } from 'react';
import { Camera } from 'expo-camera';
import { db, storage } from '../../firebase/config'
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native'

class MyCamera extends Component {
    constructor(props) {
        super(props)
        this.state = {
            permisoDeHardware: false,
            urlInternaFoto: '',
            mostrarLaCamara: true, //esto nos sirve para saber si mostramos la camara o si mostramos la preview de la foto
            fotoUrl: ''
        }

        this.metodosDeCamera = ''

    }

    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
            .then(() => {
                this.setState({
                    permisosDeHardware: true,
                })
            }

            )
            .catch(e => console.log(e))
    }

    sacarFoto() {
        this.metedosDeCamara.takePictureAsync() //Este metodo va a sacar la foto, guardar la URL en el estado y esconder la camara para mostrarle al usuario lo que saco
            .then(photo => {
                this.setState({
                    urlInternaFoto: photo.uri,
                    mostrarLaCamara: false,
                })
            })
            .catch(error => console.log(error))
    }

    guardarLaFotoEnStorage() {
        fetch(this.state.urlInternaFoto)
            .then(res => res.blob()) //es el metodo para recuperar binarios. Seria JSON para fotos y lo guardo en el segundo then con el parametro image
            .then(image => {
                const rutaFoto = storage.ref(`photos/${Date.now()}.jpg`); // Le pedimos que guarde la foto en una carpeta photos que si no la tiene la va a crear y dsps le digo creame un nombre en base a la fecha de creacion de la foto. Crea la ruta
                rutaFoto.put(image) //Lo que nos retorno el metodo .ref() despues le aplicamos el metodo .put() que tiene un then para poder buscar la url de la foto en internet 
                    .then(() => {
                        rutaFoto.getDownloadURL() //con este metodo capturamos esta url de la foto para tenerla en la mano y poder usarla
                            .then(url => {
                                //Ahora queremos guardar la url de la foto como un dato mas del posteo
                                this.props.urlDeLaFoto(url)

                                //Borramos la url temporal del estado
                                this.setState({
                                    urlInternaFoto: '',
                                })
                            })
                    })
            })
            .catch(error => console.log(error))
    }

    cancelarStorage() {
        console.log("cancelando...");
        this.setState({
            urlInternaFoto: '',
            mostrarLaCamara: true
        })
    }



    render(){
            // elreturn tiene que mostrar la camara o sino mostrar el preview de la foto con las opciones de cancelar o confirmar
        return(
            <View style={ styles.container}>

                {
                    this.state.permisosDeHardware === true ?
                        this.state.mostrarLaCamara === false ?
                        <React.Fragment>
                            <Image 
                                source={{uri:this.state.urlInternaFoto}}
                                style={ styles.cameraBody}
                            />
                            <View style={styles.confirm}>
                                <TouchableOpacity style={styles.cancelButton} onPress={()=>this.cancelar()}>
                                    <Text style={styles.textButton}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.confirmButton} onPress={()=>this.guardarLaFotoEnStorage()}>
                                    <Text style={styles.textButton}>Aceptar</Text>
                                </TouchableOpacity>
                            </View>
                        </React.Fragment>

                        :
                        <React.Fragment>
                            <Camera
                                style = { styles.cameraBody }
                                type={ Camera.Constants.Type.front}
                                ref={ metedosDeCamara => this.metedosDeCamara = metedosDeCamara}
                            />
                            <TouchableOpacity style = { styles.button } onPress={()=>this.sacarFoto()}>
                                <Text style = { styles.textButton }>Sacar Foto</Text>
                            </TouchableOpacity> 
                        </React.Fragment>
                        :
                        <Text>La cámara no tiene permisos para ser usada</Text>
                }



            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        height: "45vh",
        marginBottom: 20,
        marginHorizontal: 5,
        padding: 10,

    },
    camara: {
        marginTop: 20,
        marginBottom: 10,
        height: "40vh",
    },
    button: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton: {
        color: '#fff',
        textAlign: "center"
    },
    confirm: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    confirmButton: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
    },
    cancelButton: {
        backgroundColor: '#dc3545',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
    }

})


export default MyCamera