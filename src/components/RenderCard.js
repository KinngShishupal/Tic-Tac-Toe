import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const RenderCard = ({player}) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{uri: player.photo}} style={styles.img} />
      <View style={styles.cred}>
        <Text>{player.userName}</Text>
        <Text>{player.email}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RenderCard;

const styles = StyleSheet.create({
  img: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 3,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 5,
  },
  cred: {
    marginLeft: 10,
  },
});
