import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import Home from '../../screens/Home/Home';
import FormularioPost from '../PostForm/PostForm';
import Perfil from '../../screens/Perfil/Perfil';
import Search from '../Search/Search';



let tab = createBottomTabNavigator()

function Menu() {
    return(
        <tab.Navigator>
            <tab.Screen name= 'Home'component= {Home}/>
            <tab.Screen name= 'Perfil' component= {Perfil}/>
            <tab.Screen name= 'Subila' component= {FormularioPost}/>
            <tab.Screen name= 'Search' component= {Search}/>
        </tab.Navigator>   
        )
}

export default Menu

