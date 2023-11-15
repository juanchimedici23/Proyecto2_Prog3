import React, { Component } from 'react'
import { TouchableOpacity, View, Text} from 'react-native'


class Perfil extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <View>
                <Text> Bienvendio a tu Perfil! </Text>
                <TouchableOpacity onPressOut={() => this.props.navigation.navigate('Home')}>
                    <Text> Volver al Home </Text>
                </TouchableOpacity>
            </View>

        )
    }
}

export default Perfil; 
