import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, Image, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import RenderCard from './RenderCard';

const Lobby = ({route}) => {
  const [players, setPlayers] = useState([]);
  const {user} = route.params;
  
  console.log('user', route.params)

  useEffect(() => {
    const effect = firestore()
      .collection('Players')
      .onSnapshot(snap => {
        // const i = snap.docs.map(item => {
        //   return {...item.data(), id: item.id};
        // });

        const i = snap.docs.filter(item => {
          return item.data().email !== user.email
        }).map(innerItem=>{
          return {...innerItem.data(), id: innerItem.id}; 
        })
        
        setPlayers(i);
      });

    return () => effect;
  }, []);

  

  return (
    <View>
      <Text>Welcome {user.email}</Text>
      <Button title="Logout" color="red" />

      <FlatList
        data={players}
        renderItem={({item})=>(
            <RenderCard player={item} user={user}/>
        )}
        keyExtractor={item => item.id}
      />

     
    </View>
  );
};

export default Lobby;

const styles = StyleSheet.create({
  img: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
