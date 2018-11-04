import React, {Component} from 'react';
import './chat-area.css';
import {MessageLeft, MessageRight} from './message';
import InputChat from './input-chat'
export default  class ChatArea extends Component {
    render(){
        return(
            <div className='chat-area-container'>
                <div className='chat-title-frame'>
                    Ten nguoi chat
                </div>
                <div className='message-frame'>
                    <MessageLeft/>
                    <MessageRight/>
                    <MessageLeft/>
                    <MessageRight/>
                    <MessageLeft/>
                    <MessageRight/>
                    <MessageLeft/>
                    <MessageRight/>
                    <MessageLeft/>
                    <MessageRight/>
                </div>
                <div className='input-chat-frame'>
                    <InputChat/>
                </div>
            </div>
        )
    }
}