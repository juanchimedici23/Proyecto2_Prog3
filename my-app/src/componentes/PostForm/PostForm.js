import react,{Component} from "react";
import {db,auth} from '../../firebase/config';
import { TextInput, TouchableOpacity, View,Text,StyleSheet } from "react-native";

class FormularioPost extends Component {
        constructor(){
            super()
            this.state = {
                descripcionPost :'',
                url:'',
            }
        }

        creacionPost(autor,descripcionPost, createdAt){
            db.collection('posteos').add({
                autor: autor,
                descripcionPost: descripcionPost,
                createdAt: createdAt,
                likes:[]
            })
            .then( res => console.log(res))
            .catch (error=> console.log(error))
        }

        

        render(){
            return(
                <View style ={style.formContainer}>
                <Text>New Post</Text>
                <TextInput
                    style={style.input} 
                    onChangeText={(text)=>this.setState({descripcionPost: text})}
                    placeholder='Escribite algo ...'
                    keyboardType='default'
                    value={this.state.descripcionPost}/>
                 
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
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    }

})
export default FormularioPost