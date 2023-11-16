import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity } from 'react-native';

class Post extends Component{

    constructor(props){
        super(props);

        this.state={
            like: false
        }
    }

    componentDidMount(){
        
    }

    likearPost(){

    }

    UnlikearPost(){

    }

    render(){
        return(
            <View>
                <Text>{this.props.dataPost.datos.autor}</Text>
                <Text>{this.props.dataPost.datos.descripcionPost}</Text>

                {
                    this.state.like ? 

                    <TouchableOpacity style={style.button}>
                    <Text style={style.textButton}>Unlikear</Text>    
                    </TouchableOpacity>

                    :

                    <TouchableOpacity style={style.button}>
                    <Text style={style.textButton}>Likear</Text>    
                </TouchableOpacity>
                }
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