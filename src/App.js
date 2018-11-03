import React, { Component } from 'react';
import firebase from 'firebase';


import Chat from './component/pages/chat';
import Login from './component/pages/login';
import './App.css';

firebase.initializeApp({
    apiKey: 'AIzaSyC0A17qTAnYD5hmZMp5h9uuxBSlodW9vHU',
    authDomain: 'my-firebase-chat-app-5236c.firebaseapp.com'
})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user=>
        this.setState({isSignedIn: user})
        );
  };

  render() {
    return (
      <div>
          {this.state.isSignedIn ? (
              <span>
                <Chat/>
              </span>
          ) : (
              <span>
                <Login/>
              </span>
          )}
      </div>
    );
  }
}



export default App;
