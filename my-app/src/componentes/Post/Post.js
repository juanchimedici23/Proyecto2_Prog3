import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { db,auth } from '../../firebase/config';
import firebase from 'firebase';
import MyCamera from '../Camara/Camara';
class Post extends Component{

    constructor(props){
        super(props);
        this.state={
            like: false,
            cantidad_likes: this.props.dataPost.datos.likes.length,
        }
    }

    componentDidMount(){
        if(this.props.dataPost.datos.likes.includes(auth.currentUser.email)){
            this.setState({
                like:true
            })
        }
        console.log(this.props.dataPost.datos.comentarios)

    }

    likearPost(){
        db.collection('posteos').doc(this.props.dataPost.id).update({
            likes:firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then( res => this.setState({
            like: true,
            cantidad_likes: this.props.dataPost.datos.likes.length
        })

        )
        .catch( e => console.log(e))

    }

    UnlikearPost(){
        db.collection('posteos').doc(this.props.dataPost.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(res => this.setState({
            like: false,
            cantidad_likes: this.props.dataPost.datos.likes.length
        }))
        .catch(e => console.log(e))
    }

    borrado(){
        db.collection('posteos').doc(this.props.dataPost.id).delete();
        console.log('Se borro el posteo con exito');
    }

    


    render(){
        return(
            <View style= {style.postContainer}>
                <TouchableOpacity /*onPress={()=> this.props.navigate('PerfilOtros',{infoUsuario: this.props.dataPost.datos.autor,navigation: this.props.navigation})}*/>
                    <Text>Posteo de :{this.props.dataPost.datos.autor}</Text>
                </TouchableOpacity>
                <Image
                source={{ uri: this.props.dataPost.datos.url }}
                resizeMode="cover"
                style={style.fotoPosteo}
                />
                <Text>{this.props.dataPost.datos.descripcionPost}</Text>
                <Text> { this.state.cantidad_likes }</Text>
                {
                    this.state.like ? 

                    <TouchableOpacity style={style.button} onPress={()=>this.UnlikearPost()}>
                    <Text style={style.textButton}>Unlikear</Text>    
                    </TouchableOpacity>

                    :

                    <TouchableOpacity style={style.button} onPress={()=> this.likearPost()}>
                    <Text style={style.textButton}>Likear</Text>    
                </TouchableOpacity>

                }
                    {/* <Text>Cantidad de Comentarios: {this.props.dataPost.datos.comentarios.length}  </Text> */}

                    <TouchableOpacity style={style.button} onPress={() => this.props.navigation.navigate('Comentarios', { id: this.props.dataPost.id })}>
                        <Text>Comentar</Text>                   
                    </TouchableOpacity>
                
                {this.props.dataPost.datos.autor == auth.currentUser.email?(
                    <TouchableOpacity onPress={()=>this.borrado()}>
                        <Text>Borrar este posteo</Text>
                    </TouchableOpacity>
                ):
                null
                }
                
            </View>
        )
    }
}

const style = StyleSheet.create({
    postContainer: {
        marginBottom: 10, // Puedes ajustar este valor para controlar el espacio entre cada posteo
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: 10,
      },
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
        marginBottom: 40,
        marginHorizontal:30,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'blue',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: 'blue'
    },
    textButton:{
        color: '#fff'
    },
    fotoPosteo: {
        marginTop: 20,
        marginBottom: 10,
        height:300,
        width:"100%"
    }

}) 

export default Post