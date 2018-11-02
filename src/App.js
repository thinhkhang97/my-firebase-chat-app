import React, { Component } from 'react';
import firebase from 'firebase';
import {StyledFirebaseAuth} from 'react-firebaseui';
import Search from './component/list-friends/search';
import FriendItem from './component/list-friends/friend-item';
import ListFriends from './component/list-friends/list-friends';
import './App.css';

// firebase.initializeApp({
//     apiKey: 'AIzaSyC0A17qTAnYD5hmZMp5h9uuxBSlodW9vHU',
//     authDomain: 'my-firebase-chat-app-5236c.firebaseapp.com'
// })
//
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isSignedIn: false
//     }
//     this.uiConfig = {
//       signInFlow: 'popup',
//         signInOptions: [
//             firebase.auth.GoogleAuthProvider.PROVIDER_ID
//         ],
//         callbacks: {
//           signInSuccess: () => false
//         }
//     }
//   }
//
//   componentDidMount() {
//     firebase.auth().onAuthStateChanged(user=>
//         this.setState({isSignedIn: user})
//         );
//   };
//
//   render() {
//     return (
//       <div>
//           {this.state.isSignedIn ? (
//               <span>
//                 <div>
//                   Signed In!
//                 </div>
//                   <div>
//                     Welcome {firebase.auth().currentUser.displayName}
//                   </div>
//                 <img src={firebase.auth().currentUser.photoURL}/>
//                 <button onClick={()=>firebase.auth().signOut()}>Sign out</button>
//               </span>
//           ) : (
//               <span>Not signed in
//                 <StyledFirebaseAuth uiConfig = {this.uiConfig} firebaseAuth={firebase.auth()}/>
//               </span>
//           )}
//
//       </div>
//     );
//   }
// }

class App extends Component {
  render(){
    return (
        <div>
          <ListFriends/>
        </div>
    )
  }
}

export default App;
