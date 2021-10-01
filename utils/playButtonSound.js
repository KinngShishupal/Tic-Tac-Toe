import Sound from 'react-native-sound';

const playButtonSound = player => {
  switch (player) {
    case 'circle':
      const sound1 = new Sound(
        require('../assests/sounds/click1.wav'),
        (error, sound) => {
          if (error) {
            alert('error' + error.message);
            return;
          }
          sound1.play(() => {
            sound1.release();
          });
        },
      );
      break;

    case 'circle-with-cross':
      const sound2 = new Sound(
        require('../assests/sounds/click2.wav'),
        (error, sound) => {
          if (error) {
            alert('error' + error.message);
            return;
          }
          sound2.play(() => {
            sound2.release();
          });
        },
      );
      break;

    default:
      null;
  }
};


export default playButtonSound;