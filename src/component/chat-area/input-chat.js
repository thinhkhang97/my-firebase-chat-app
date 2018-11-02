import React, {Component} from 'react';
import './input-chat.css';
export default class InputChat extends Component {
    render(){
        return(
            <div>
                <div className='search-container'>
                    <input className='search-input' placeholder='enter you messages'/>
                    <button className='search-button'>Send</button>
                </div>
            </div>
        )
    }
}