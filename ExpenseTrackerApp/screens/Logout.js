// components/dashboard.js
import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
// import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';

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
        <Text style={styles.textStyle}>
          Hi, are you signing out of the page?
        </Text>
        <Text>{this.state.displayName}</Text>

        <Button color='#3740FE' title='Logout' onPress={() => this.signOut()} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff',
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20,
  },
});
