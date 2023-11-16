import react, { Component } from 'react';
import { auth, db} from '../../firebase/config';
import { TouchableOpacity, Text, TextInput, View, StyleSheet, FlatList } from 'react-native';
import FormularioPost from '../../componentes/PostForm/PostForm';
import Post from '../../componentes/Post/Post'

class Home extends Component {
    constructor(){
        super()
        this.state = {
            mail: '',
            usuario: '',
            contrasena: '',
            posts: [],
        }
    }

    componentDidMount(){
        db.collection('posteos').onSnapshot(
            listaPosteos=>{

                let posteosAMostrar = []

                listaPosteos.forEach(unPosteo => {
                    posteosAMostrar.push({
                        id: unPosteo.id,
                        datos: unPosteo.data()
                    })
                })

                this.setState({
                    posts:posteosAMostrar
                })
            }
        ) 
    }


    logout(){
        auth.signOut();
        this.props.navigation.navigate('Login')
    }

    render(){
        return(
            <View>
                <TouchableOpacity onPressOut={()=>this.logout()}>
                    <Text> Logout </Text>
                </TouchableOpacity>
                <FormularioPost/>
                <Text>Lista de los posteos creados</Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={unPosteo => unPosteo.id}
                    renderItem={({item})=> <Post dataPost = {item}/>}
                    />
                
            </View>
        )
    }

}

export default Home