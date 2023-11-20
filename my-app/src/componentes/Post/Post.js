import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { db,auth } from '../../firebase/config';
import firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons'

class Post extends Component{

    constructor(props){
        super(props);
        this.state={
            like: false,
            cantidad_likes: this.props.dataPost.datos.likes.length,
            // cantidad_comentarios: this.props.dataPost.datos.comentarios.length,
           
        }   

    }

    componentDidMount(){
        if(this.props.dataPost.datos.likes.includes(auth.currentUser.email)){
            this.setState({
                like:true
            })
        }


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
                {this.props.dataPost.datos.autor !== auth.currentUser.email?(
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('PerfilOtros', {mailUsuario: this.props.dataPost.datos.autor})}>
                    <Text style= {style.nombreUsuario}>Posteo de :{this.props.dataPost.datos.autor}</Text>
                    </TouchableOpacity>
                ):( <TouchableOpacity onPress={()=>this.props.navigation.navigate('Perfil', {mailUsuario: this.props.dataPost.datos.autor})}>
                    <Text style= {style.nombreUsuario}>Posteo de :{this.props.dataPost.datos.autor}</Text>
                    </TouchableOpacity>)}
               
                <Image 
                source={{ uri: this.props.dataPost.datos.url }}
                resizeMode="cover"
                style={style.image}
                />
                <Text>{this.props.dataPost.datos.descripcionPost}</Text>
                <Text style = {style.cantidadLikes}> Hay { this.state.cantidad_likes } like/s</Text>
                {/* <Text style = {style.cantidadLikes}> Hay { this.state.cantidad_comentarios } comentario/s</Text> */}
                {
                    this.state.like ? 

                    <TouchableOpacity  onPress={()=>this.UnlikearPost()}>
                        <FontAwesome name='heart' color='red' size={30} />    
                    </TouchableOpacity>
                    

                    :

                    <TouchableOpacity  onPress={()=> this.likearPost()}>
                        <FontAwesome name='heart-o' color='black' size={30} />    
                    </TouchableOpacity>

                }
                    

                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('Comentarios', { id: this.props.dataPost.id })}>
                    <FontAwesome name="comment-o" size={30} color="#000" />                   
                    </TouchableOpacity>
                
                {this.props.dataPost.datos.autor == auth.currentUser.email?(
                    <TouchableOpacity style= {style.borrar} onPress={()=>this.borrado()}>
                        <Text style= {style.borrarText}>Borrar este posteo</Text>
                    </TouchableOpacity>
                ):
                null
                }
                
            </View>
        )
    }
}

const style = StyleSheet.create({

    borrarText: {
        color: 'black',
        fontWeight: 'bold'
    }, 
    borrar: {
        backgroundColor: 'red',
        width: 100, 
        
    }, 
    postContainer: {
      margin: 10,
      borderRadius: 6,
      borderStyle: 'solid',
      borderColor: '#ccc',
      borderWidth: 1,
      padding: 10,
    },
    image:{
        height: 360,
        marginBottom: 5,
        alignItems: 'center',
        borderRadius: 10,
        width: 360
    },
    descripcionPost: {
      fontSize: 14,
      lineHeight: 1.5,
      marginBottom: 10,
    },
    cantidadLikes: {
      fontSize: 12,
      color: '#999',
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#009688',
      color: '#fff',
      padding: 10,
      borderRadius: 4,
      cursor: 'pointer',
    },
    nombreUsuario: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10,
      },
    
  });

export default Post