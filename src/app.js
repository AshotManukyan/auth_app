import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null
    };
    this.renderContent = this.renderContent.bind(this);
  }
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAOKvjbYY2kkAFnkgxfZ0Popc5cBZLdNcE',
      authDomain: 'authentication-3392c.firebaseapp.com',
      databaseURL: 'https://authentication-3392c.firebaseio.com',
      projectId: 'authentication-3392c',
      storageBucket: '',
      messagingSenderId: '577958528339',
      appId: '1:577958528339:web:6789b26a7b2168e508cda6'
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log out
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={styles.viewStyle}>
            <Spinner style={styles.spinnerStyle} size="large" />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText='Authentication' />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    height: 150,
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5
  },
  spinnerStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default App;
