import React, {Component} from 'react';
import './chat.css';
import ChatArea from '../chat-area/chat-area';
import ListFriends from '../list-friends/list-friends';


export default class Chat extends Component {
    render(){
        return(
            <div className='chat-page-container'>
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