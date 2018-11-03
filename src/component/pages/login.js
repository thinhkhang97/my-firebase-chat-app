import React, {Component} from 'react';
import './login.css';
import {StyledFirebaseAuth} from 'react-firebaseui';
import firebase from 'firebase';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.uiConfig = {
            signInFlow: 'popup',
              signInOptions: [
                  firebase.auth.GoogleAuthProvider.PROVIDER_ID
              ],
              callbacks: {
                signInSuccess: () => false
              }
          }
        }
    render() {
        return(
            <div className='login-container'>
                <div className='logo-frame'>
                    <img src={require('./Logo.svg')}/>
                </div>
                <div className='login-frame'>
                    <StyledFirebaseAuth uiConfig = {this.uiConfig} firebaseAuth={firebase.auth()}/>
                </div>
            </div>
        )
    }
}