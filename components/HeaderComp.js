import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const HeaderComp = ({
    goBack =()=>{},
    text
}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>goBack()}>
                <Text>goBack</Text>
            </TouchableOpacity>
            <Text>{text}</Text>
            <Text></Text>
        </View>
    )
}

export default HeaderComp
