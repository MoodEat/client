import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LottieView from "lottie-react-native";

export default class Loading extends React.Component {
//   componentDidMount() {
//     this.animation.play();
//     // Or set a specific startFrame and endFrame with:
//     // this.animation.play(30, 120);
//   }

//   resetAnimation = () => {
//     this.animation.reset();
//     this.animation.play();
//   };

  render() {
    return (
      <View style={styles.animationContainer}>
        <LottieView
        autoPlay
        loop
          style={{
            width: 400,
            height: 400,
          }}
          source={require('../assets/17377-loading.json')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});
