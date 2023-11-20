import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import Post from '../../componentes/Post/Post'

class PerfilOtros extends Component{
    constructor(props){
        super(props)
        this.state = {
            otroUsuarioMail: this.props.route.params.mailUsuario,
            posteosOtrosUsuario:[],
            infoUsuario:{}
        }
    }
    componentDidMount(){
        console.log(this.props.route.params)
        let perfilUsuario= this.state.otroUsuarioMail
       
        db.collection('posteos')
        .where('autor','==',perfilUsuario)
        .onSnapshot(docs=>{
           let posteosUsuario=[]
            docs.forEach(doc=>posteosUsuario.push({
                id: doc.id,
                datos: doc.data()
            }))
            this.setState({
                posteosOtrosUsuario : posteosUsuario
            })
        })

        db.collection('users')
        .where('mail','==',this.state.otroUsuarioMail)
        .onSnapshot(doc=>{
            doc.forEach(doc=>
                this.setState({
                    id: doc.id,
                    infoUsuario: doc.data()
                }))
        })


    }

    render(){
        
        return (
            <ScrollView>
                <View>
                    <Text style = {styles.bienvenido}>{this.state.infoUsuario.username}</Text>
                    <Text style = {styles.bienvenido}>{this.state.infoUsuario.mail}</Text>

                    <Text style = {styles.textBlack}>Biografia: {this.state.infoUsuario.bio}</Text>
                    <Text style = {styles.textBlack}>Cantidad de posteos: {this.state.posteosOtrosUsuario.length}</Text>
                </View>
                
                <FlatList 
                data={this.state.posteosOtrosUsuario}
                keyExtractor={(item)=>item.id.toString()}
                renderItem={({item})=> <Post dataPost={item} navigation={this.props.navigation}/>}
                />
                <Text style = {styles.logout} onPress={()=> this.props.navigation.navigate('Menu')} >Volver al home</Text>
            </ScrollView>
        )
    }


}

export default PerfilOtros

const styles = StyleSheet.create({
    textBlack: {
        fontSize: 15,
        color: 'black',
        marginTop: 10,
      }, 
      logout: {
        color: '#fff',
        backgroundColor: '#000',
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        width: 70,
    },
    bienvenido: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10,
    },
    login: {
        paddingHorizontal: 10,
        marginTop: 20,
    },
    text: {
        height: 20,
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 5,
        marginVertical: 15,
    },
    button: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 5,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#28a745',
    },
    
})
    