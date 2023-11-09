import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

function  Login (){
    return(
    <View style={styles.container}>
        <Text style={styles.text}>Login </Text>
        <TouchableOpacity>
            <Text style={styles.button}>Ingresa</Text>
        </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor : 'blue',
        padding: 30,
    },
    text: {
        color: 'red',
        padding: 20,
        borderRadius: 10,
    },
    button: {
        color: 'red',
        padding: 20,
        borderRadius: 10,
    }
 
})
 
export default Login