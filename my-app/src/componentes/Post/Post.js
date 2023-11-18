import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { db,auth } from '../../firebase/config';
import firebase from 'firebase';

class Post extends Component{

    constructor(props){
        super(props);

        this.state={
            like: false,
            cantidad_likes: this.props.dataPost.datos.likes.length
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

    render(){
        return(
            <View>
                <Text>Posteo de :{this.props.dataPost.datos.autor}</Text>
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

                <TouchableOpacity style={style.button} onPress={()=> this.comentar()}>
                <Text style={style.textButton}> Comentar </Text>    
                </TouchableOpacity>
                
            </View>
        )
    }
}

const style = StyleSheet.create({
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
    }

}) 

export default Post