//

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import playButtonSound from '../../../utils/playButtonSound';
import Replay from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';

const Profile = ({navigation}) => {
  const [result, setResult] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);

  const [visible, setVisible] = useState(false);
  const [player, setPlayer] = useState('circle');

  const [leader, setLeader] = useState('circle');

  const tileClickHandler = (row, column, player) => {
    playButtonSound(player);
    if (
      result[row][column] === 'circle' ||
      result[row][column] === 'circle-with-cross'
    ) {
      setResult(prev => prev);
    } else {
      let newResult = Array.from(result);
      newResult[row][column] = player;

      setResult(newResult);

      setPlayer(prev => {
        if (prev === 'circle') {
          return 'circle-with-cross';
        }
        if (prev === 'circle-with-cross') {
          return 'circle';
        } else {
          return 'circle-with-cross';
        }
      });
    }
  };

  const winnerHandler = () => {
    for (let i = 0; i < 3; i++) {
      let b = result[i].filter((value, index, self) => {
        return self.indexOf(value) === index;
      });

      if (b.length === 1 && b[0] !== '') {
        console.log('winner', b[0]);
        setLeader(b[0]);
      }

      if (result[0][0] === result[1][1] && result[1][1] === result[2][2]) {
        console.log('primary diagonal is same');
      }
    }

    // checking the transpose
    for (let i = 0; i < 3; i++) {
      const t = result[0].map((_, colIndex) =>
        result.map(row => row[colIndex]),
      );
      let b = t[i].filter((value, index, self) => {
        return self.indexOf(value) === index;
      });

      if (b.length === 1 && b[0] !== '') {
        console.log('ransposed winner', b[0]);
        setLeader(b[0]);
      }

      if ((t[0][0] === t[1][1]) === t[2][2]) {
        console.log('secondary diagonal is same');
      }
    }

    // diagonal logic comes here
  };

  const getTranspose = () => {
    const t = result[0].map((_, colIndex) => result.map(row => row[colIndex]));

    console.log('transpose ', t);
  };

  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      let b = result[i].filter((value, index, self) => {
        return self.indexOf(value) === index;
      });

      if (b.length === 1 && b[0] !== '') {
        console.log('winner', b[0]);
        setLeader(b[0]);
        setVisible(true);
      }
    }

    // checking the transpose
    for (let i = 0; i < 3; i++) {
      const t = result[0].map((_, colIndex) =>
        result.map(row => row[colIndex]),
      );
      let b = t[i].filter((value, index, self) => {
        return self.indexOf(value) === index;
      });

      if (b.length === 1 && b[0] !== '') {
        console.log('transposed winner', b[0]);
        setLeader(b[0]);
        setVisible(true);
      }
    }

    // checking diagonal
    if (
      (result[1][1] &&
        result[0][0] == result[1][1] &&
        result[0][0] == result[2][2]) ||
      (result[1][1] &&
        result[0][2] == result[1][1] &&
        result[0][2] == result[2][0])
    ) {
      setLeader(result[1][1]);
      setVisible(true);
    }

    const unFilled = result.every(item => {
      return item.every(q => {
        return q !== '';
      });
    });

    if (unFilled) {
      setLeader('Draw');
      setVisible(true);
    }
  }, [result]);

  const winnerModalClose = () => {
    setVisible(false);
    setResult([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
  };

  const getWinner = player => {
    if (player === 'circle') return 'Circle Wins';
    else if (player === 'circle-with-cross') return 'Cross Wins';
    return "It's a Draw";
  };

  return (
    <ImageBackground
      source={require('../../../assests/Images/back1.jpg')}
      style={{flex: 1}}>
      <View style={styles.container}>
        {result.map((outerItem, row) => {
          return (
            <View style={styles.hRow} key={row}>
              {outerItem.map((innerItem, column) => {
                return (
                  <View key={column}>
                    <TouchableOpacity
                      onPress={() => tileClickHandler(row, column, player)}>
                      <ImageBackground
                        source={require('../../../assests/Images/brick.jpg')}
                        style={styles.box}>
                        <View>
                          {innerItem ? (
                            <Icon name={innerItem} size={100} color="#000" />
                          ) : (
                            <Icon
                              name="emoji-happy"
                              size={100}
                              color="rgba(0,0,0,0)"
                            />
                          )}
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          );
        })}

        <Overlay
          isVisible={visible}
          // onBackdropPress={winnerModalClose}
        >
          <View
            style={[
              styles.Overlay,
              {
                width: Dimensions.get('window').width / 1.5,
                height: Dimensions.get('window').height / 4,
              },
            ]}>
            <View style={styles.winnerCred}>
              {leader != 'Draw' && (
                <Text style={styles.headerFont}>Congratulations</Text>
              )}

              <Text style={styles.contentFont}>{getWinner(leader)}</Text>
            </View>
            <LottieView
              style={styles.lottie}
              source={require('../../../assests/lottie/1.json')}
              autoPlay
              loop
              size={200}
            />
            <View style={styles.winIcons}>
              <Replay
                color="#006600"
                name="replay"
                size={60}
                onPress={winnerModalClose}
              />
              <Icon
                color="#006600"
                name="home"
                size={60}
                onPress={() => navigation.navigate('Home')}
              />
            </View>
          </View>
        </Overlay>
      </View>
    </ImageBackground>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    borderWidth: 1,
    borderColor: '#000',
    width: 120,
    height: 120,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
  },
  hRow: {
    display: 'flex',
    // backgroundColor: 'green',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  Overlay: {
    position: 'relative',
    padding: 5,
  },
  winIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 5,
    position: 'absolute',
    bottom: 0,
  },
  lottie: {
    position: 'absolute',
    top: 0,
    zIndex: -1,
  },
  winnerCred: {
    alignItems: 'center',
  },
  headerFont: {
    fontFamily: 'Birthstone-Regular',
    fontSize: 50,
    letterSpacing: 2,
    color: '#993333',
  },

  contentFont: {
    fontFamily: 'Birthstone-Regular',
    fontSize: 40,
    color: '#660066',
  },
});
