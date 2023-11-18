import react, {Component} from 'react';
import {View, TextInput, Text, TouchableOpacity, FlatList} from 'react-native';
import {db, auth} from '../../firebase/config'
import firebase from 'firebase';

class Comentarios extends Component {
    constructor(props){
        super(props)
        this.state = {
            comentario: '',
            id: '',
            infoComentario: {}
        }
    }

    componentDidMount(){
        db.collection('posteos')
        .doc(this.props.routes.params.id)
        .onSnapshot( doc => {this.setState(
            {id:doc.id,
            data:doc.data()})
        })
    }

    agregarComentario(id, comentario){
        db.collection('posteos')
        .doc(id)
        .update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({
                autor: auth.currentUser.email,
                createdAt: Date.now(),
                comentario: comentario
            })
        })

    }

    render(){
        return(
            <View>
                {this.state.data.comentarios && this.state.data.comentarios.length > 0 ? (
                    <View>
                        <FlatList
                        data = {this.state.data.comentarios}
                        keyExtractor = {item => item.createdAt.toString()}
                        renderItem = {({item})=>(
                            <View>
                                <Text>{item.autor}</Text>
                                <Text>{item.comentario}</Text>
                            </View>
                        )}/>
                    </View> 
                )
                : (
                    <Text>Por el momento no hay comentarios</Text>
                )
                }
                <View>
                    <TextInput
                    onChangeText = {text => this.setState({comentario: text})}
                    keyboardType = 'predeterminado'
                    placeholder = 'Deja tu comentario'
                    value = {this.state.comentario}/>

                    <TouchableOpacity onPress={()=> this.agregarComentario(this.state.id, this.state.comentario)}>
                        <Text>Agregar comentario</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


}

export default Comentarios