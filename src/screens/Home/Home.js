import React from 'react'
import { View, Text, Button, ImageBackground, StyleSheet } from 'react-native'
import navigationStrings from '../../constants/navigationStrings'
import Icon from 'react-native-vector-icons/Entypo';
import playButtonSound from '../../../utils/playButtonSound';
import { FAB } from 'react-native-elements';


const Home = ({navigation}) => {   
    return (
      <ImageBackground source={require('../../../assests/Images/back2.jpg')} resizeMode="cover" style={styles.background}>
      <Text>Inside</Text>
      <FAB title="Create" overlayColor='red' onPress={()=>navigation.navigate('Profile')}/>
    </ImageBackground>
    )
}

export default Home;

const styles = StyleSheet.create({
  background:{
    flex:1

  }
})
