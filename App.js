import React from 'react';
import { 
  StyleSheet,
  Text,
  TextInput,
  View,
  CameraRoll,
  Button,
  NativeModules 
} from 'react-native';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
const { RecorderManager } = NativeModules;

export default class App extends React.Component {
  state = {
    videoUri: null,
    disableStart: false,
    disableStopped: true,
    disablePlayable: true,
  }

  start = () => {
    RecorderManager.start();
    this.setState({
      disableStart: true,
      disableStopped: false,
      disablePlayable: true,
    });
  }

  stop = () => {
    RecorderManager.stop();
    this.setState({
      disableStart: true,
      disableStopped: true,
      disablePlayable: false,
    });
  }

  play = () => {
    CameraRoll.getPhotos({
      first: 1,
      assetType: 'Videos'
    })
    .then(r => {
      console.log(r.edges);
      if (r.edges.length > 0) {
        const video = r.edges[0].node.image;
        this.setState({
          videoUri: video.uri,
          disableStart: true,
          disableStopped: true,
          disablePlayable: true,
        })
      }
    })
  }

  playEnded = () => {
    this.setState({
      videoUri: null,
      disableStart: false,
      disableStopped: true,
      disablePlayable: true,
    });
  }
  
  render() {
    const { disableStart, disableStopped, disablePlayable, videoUri } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {videoUri && 
            <VideoPlayer
              source={{ uri: videoUri }}
              navigator={ this.props.navigator }
              onEnd={this.playEnded}
            />
          }
          {!videoUri && 
            <TextInput
              style={styles.textInput}
              autoFocus
              multiline
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
          }
        </View>
        <View style={styles.footer}>
          <Button disabled={disableStart} title="Start" onPress={this.start} />
          <Button disabled={disableStopped} title="Stop" onPress={this.stop} />
          <Button disabled={disablePlayable} title="Play" onPress={this.play} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
  },

  textInput: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    alignSelf: 'stretch',
  },

  footer: {
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 40,
    justifyContent: 'space-around'
  }
});
