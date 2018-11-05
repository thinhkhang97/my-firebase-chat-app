import React, {Component} from 'react';
import './chat.css';
import ChatArea from '../chat-area/chat-area';
import ListFriends from '../list-friends/list-friends';
import Menu from '../menu/menu';
import firebase from 'firebase';
import {addNewUser, sendMessage} from '../../services/firebase-api';
import {getAllData} from '../../services/firebase-api';
import {connect} from 'react-redux';

class Chat extends Component {
    componentDidMount(){
        const currentUser = firebase.auth().currentUser;
        addNewUser(currentUser.uid, currentUser.email, currentUser.displayName, currentUser.photoURL);

        // load all data
        getAllData(this);
    }
    render(){
        return(
            <div className='chat-page-container'>
                <div className='area-0'>
                    <Menu/>
                </div>
                <div className='area-1'>
                    <ListFriends/>
                </div>
                <div className='area-2'>
                    <ChatArea/>
                </div>
            </div>
        )
    }
}
export default connect()(Chat);