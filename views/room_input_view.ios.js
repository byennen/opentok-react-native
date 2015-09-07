var React = require('react-native');
var {
  TextInput,
  StyleSheet,
  View,
  Image
} = React;

var KeyboardEvents = require('react-native-keyboardevents');
var KeyboardEventEmitter = KeyboardEvents.Emitter;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#262422',
    padding: 10
  },
  logo: {
    width: 200,
    height: 200
  },
  roomInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    color: '#DCD9B5',
    textAlign: 'center',
  }
});

var RoomInputView = React.createClass({
  getInitialState: function() {
    return {
      keyboardSpace: 0
    };
  },

  componentDidMount: function () {
    KeyboardEventEmitter.on(KeyboardEvents.KeyboardWillShowEvent, this.updateKeybardSpace);
    KeyboardEventEmitter.on(KeyboardEvents.KeyboardWillHideEvent, this.resetKeyboardSpace);
  },

  componentWillUnmount: function () {
    KeyboardEventEmitter.off(KeyboardEvents.KeyboardWillShowEvent, this.updateKeybardSpace);
    KeyboardEventEmitter.off(KeyboardEvents.KeyboardWillHideEvent, this.resetKeyboardSpace);
  },

  updateKeybardSpace: function(frames) {
    this.setState({ keyboardSpace: frames.end.height });
  },

  resetKeyboardSpace: function() {
    this.setState({ keyboardSpace: 0 });
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Image source={require('image!meet-logo')}
          style={styles.logo}/>
        <TextInput style={styles.roomInput}
          placeholder = "room name"
          placeholderTextColor = '#DCD9B5'
          autoFocus={true}
          onSubmitEditing={ (event) => this.props.onSubmit(event.nativeEvent.text) } />
        <View style={{height: this.state.keyboardSpace}}></View>
      </View>
    );
  }
});

module.exports = RoomInputView;
