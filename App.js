import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeModules } from 'react-native';
const { RecorderManager } = NativeModules;

export default class App extends React.Component {
  state = {number: 0}

  componentDidMount() {

    RecorderManager.start();
    
    setInterval(() => {
      this.setState({number: this.state.number + 1});
    }, 1000);

    setTimeout(() => {
      RecorderManager.start();
    }, 5000);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.number}</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
