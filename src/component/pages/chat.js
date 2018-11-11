import React, {Component} from 'react';
import './chat.css';
import ChatArea from '../chat-area/chat-area';
import ListFriends from '../list-friends/list-friends';
import Menu from '../menu/menu';
import firebase from 'firebase';
import {addNewUser} from '../../services/firebase-api';
import {firestoreConnect} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {compose} from 'redux';

class Chat extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        addNewUser(this);
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
                {/*<div>*/}
                    {/*{this.props.listFriend.length}*/}
                {/*</div>*/}
            </div>
        )
    }
}

const mapStateToProp = (state) => {
    //// console.log(state.firebase.auth);
    return {
        currentUser: state.firebase.auth
    }
}

export default compose(connect(mapStateToProp), firestoreConnect())(Chat);