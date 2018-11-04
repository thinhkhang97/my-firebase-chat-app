import React, { Component } from 'react';
import firebase from 'firebase';


import Chat from './component/pages/chat';
import Login from './component/pages/login';

import './App.css';
import {addNewUser} from './services/firebase-api';

firebase.initializeApp({
    apiKey: 'AIzaSyC0A17qTAnYD5hmZMp5h9uuxBSlodW9vHU',
    authDomain: 'my-firebase-chat-app-5236c.firebaseapp.com',
    databaseURL: 'https://my-firebase-chat-app-5236c.firebaseio.com/',
})

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false
    }
    //addNewUser(123,'abc', 'khang', '123');
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
