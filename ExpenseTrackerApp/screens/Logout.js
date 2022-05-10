import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import firebase from 'firebase/compat/app';

import { GlobalColors } from '../utilities/colors';
import Button from '../components/commonUI/Button';

export default class Logout extends Component {
  constructor() {
    super();
    this.state = {
      uid: '',
    };
  }
  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch((error) => this.setState({ errorMessage: error.message }));
  };
  render() {
    this.state = {
      displayName: firebase.auth().currentUser.email,
    };
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Confirm Logout?
        </Text>
        <Text style={styles.text}>{this.state.displayName}</Text>
        <Button style={styles.button} onPress={() => this.signOut()}>
          Logout
        </Button>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalColors.primary800,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: GlobalColors.primary50,
    paddingVertical: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  button: {
    minWidth: 100,
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 20,
  },
  text: {
    fontSize: 16,
    marginVertical: 8,
    textAlign: 'center',
    color: GlobalColors.primary100,
  },
});
