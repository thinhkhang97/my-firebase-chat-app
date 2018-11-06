import React, {Component} from 'react';
import './chat-area.css';
import {MessageLeft, MessageRight} from './message';
import InputChat from './input-chat'
import connect from "react-redux/es/connect/connect";
import firebase from 'firebase'
import {receiver} from "../../reducers/re-receiver-id";

class ChatArea extends Component {

    loadListMessage(){
        console.log('Loaded list message ', this.props.messages);
        return this.props.messages !== null ? this.props.messages.map((m, index)=>{
            if(m.senderId == firebase.auth().currentUser.uid)
                return <MessageRight content = {m.content} key={index}/>
            else
                return <MessageLeft content = {m.content} photoUrl={this.props.receiver.photoUrl} key={index}/>
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
    return {
        receiver: state.receiver,
        messages: state.listMessage
    }
}
export default connect(mapStateToProps)(ChatArea)