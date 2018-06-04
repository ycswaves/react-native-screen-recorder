import React from 'react';
import { 
  StyleSheet,
  Text,
  TextInput,
  View,
  CameraRoll,
  Button,
  NativeModules,
  Platform
} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import RNFS from 'react-native-fs';
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
    switch (Platform.OS) {
      case 'android':
        const path = RNFS.ExternalStorageDirectoryPath + '/Download/video.mp4';
        RNFS.exists(path).then(exists => {          
          if (exists) {
            this.setState({
              videoUri: path,
              disableStart: true,
              disableStopped: true,
              disablePlayable: true,
            })
          }
        });
        break;

      case 'ios':
        CameraRoll.getPhotos({
          first: 1,
          assetType: 'Videos'
        }).then(r => {
          if (r.edges.length > 0) {
            const video = r.edges[0].node.image;
            this.setState({
              videoUri: video.uri,
              disableStart: true,
              disableStopped: true,
              disablePlayable: true,
            })
          }
        });
      break;  
    
      default:
        break;
    }
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
              onEnd={this.playEnded}
            />
          }
          {!videoUri && 
            <TextInput
              style={styles.textInput}
              autoFocus
              multiline
              underlineColorAndroid="white"
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
          }
        </View>
        <View style={styles.footer}>
          <Button style={styles.button} disabled={disableStart} title="Start" onPress={this.start} />
          <Button style={styles.button} disabled={disableStopped} title="Stop" onPress={this.stop} />
          <Button style={styles.button} disabled={disablePlayable} title="Play" onPress={this.play} />
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
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'center',
  },

  textInput: {
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    fontSize: 24
  },

  footer: {
    backgroundColor: Platform.OS==='ios' ? '#eee' : '#fff',
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingVertical: 20,
  },
});
