import React, {Component} from 'react';
import './chat-area.css';
import {MessageLeft, MessageRight} from './message';
import InputChat from './input-chat';
import connect from "react-redux/es/connect/connect";
import firebase from 'firebase';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {receiver} from "../../reducers/re-receiver-id";

class ChatArea extends Component {

    loadListMessage(){
        // console.log('Loaded list message ', this.props.messages);
        return this.props.messages !== null ? this.props.messages.map((m, index)=>{
            if(m.senderId == firebase.auth().currentUser.uid)
                return <MessageRight content = {m.content} key={index}/>
            else
                return <MessageLeft content = {m.content} photoUrl={this.props.receiver.photoURL} key={index}/>
        }) : []
    }

    render(){
        return(
            <div className='chat-area-container'>
                <div className='chat-title-frame'>
                    {this.props.receiver === undefined ? 'Ten nguoi nhan' : this.props.receiver.name}
                </div>
                <div className='message-frame'>
                    {this.loadListMessage()}
                </div>
                <div className='input-chat-frame'>
                    <InputChat/>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    const receiver = state.receiver;
    const conversations = state.firestore.ordered.conversations;
    const allUsers = state.firestore.ordered.users;
    let messages = [];
    // console.log('Load receiver', receiver);
    // console.log('Load all conversations', conversations);
    if(receiver)
    {
        // load conversation id
        // console.log('All user', allUsers);

        const conId = allUsers.filter(u=>u.uid === receiver.uid)[0].conversations
            .filter(con => con.with === firebase.auth().currentUser.uid);
        // console.log('load conid', conId);

        // if there is conversation
        if(conId.length > 0){
            // load message from db
            const id = conId[0].conversationId;
            const conversation = conversations.filter(con=>con.id === id);
            if(conversation.length > 0) {
                // console.log('Load conversation content', conversation[0].contents);
                messages = conversation[0].contents;;
            }
        }
    }
    return {
        receiver: state.receiver,
        messages
    }
}

export default compose(
    firestoreConnect(['conversations','users']),
    connect(mapStateToProps))(ChatArea)