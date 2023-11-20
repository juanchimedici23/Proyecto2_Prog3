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
                    <Text>{this.state.infoUsuario.username}</Text>
                    <Text>Biografia:{this.state.infoUsuario.bio}</Text>
                    <Text>Cantidad de posteos: {this.state.posteosOtrosUsuario.length}</Text>
                    {/* <Text>this.state.infoUsuario.username}</Text> */}
                </View>
                <Text>Posteos</Text>
                <FlatList 
                data={this.state.posteosOtrosUsuario}
                keyExtractor={(item)=>item.id.toString()}
                renderItem={({item})=> <Post dataPost={item} navigation={this.props.navigation}/>}
                />
                <Text onPress={()=> this.props.navigation.navigate('Menu')} style={styles.container}>Volver al home</Text>
            </ScrollView>
        )
    }


}

export default PerfilOtros

const styles = StyleSheet.create({
    container:{
      flex: 1,
      marginTop: 10,
      marginRight: 10,
      marginLeft: 10,
    },
  
    input:{
      borderColor: '#ccc',
      borderWidth: 2,
      marginBottom: 5,
      padding: 10,
      fontSize: 15,
      borderRadius: 5,
    },
  
    button:{
      textAlign: 'center',
      backgroundColor: '#0095F6',
      padding: 5,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      marginBottom: 5,
      fontWeight: 'bold',
      color:'#FFFFFF',
      fontSize: 17
    },
  
    textUser:{
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 5
    }
  })