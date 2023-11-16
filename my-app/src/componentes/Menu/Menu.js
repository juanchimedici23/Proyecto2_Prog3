import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import Home from '../../screens/Home/Home';
import FormularioPost from '../PostForm/PostForm';
import Perfil from '../../screens/Perfil/Perfil';


let tab = createBottomTabNavigator()

function Menu() {
    return(
        <tab.Navigator>
            <tab.Screen name= 'Home'component= {Home}/>
            <tab.Screen name= 'FormularioPost'component= {FormularioPost}/>
            <tab.Screen name= 'Perfil' component= {Perfil}/>
        </tab.Navigator>   
        )
}

export default Menu

