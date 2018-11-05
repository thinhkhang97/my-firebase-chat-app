import React, {Component} from 'react';
import './input-chat.css';
import {sendMessage} from "../../services/firebase-api";
import {connect} from 'react-redux';
import firebase from 'firebase'

class InputChat extends Component {

    constructor(props) {
        super(props);
        this.state = {text: ''}
    }

    handleKeyPress(e){
        if(e.key == 'Enter')
        {
            console.log("Send message", this.state.text, ' to ', this.props.receiver.name);
            this.setState({text: ''})
            sendMessage(firebase.auth().currentUser.uid, this.props.receiver.id, this.state.text);
        }
    }

    handleChange(e){
        this.setState({text: e.target.value})
    }

    render(){
        return(
            <div>
                <div className='search-container'>
                    <input className='search-input'
                           placeholder='enter you messages'
                           onKeyPress={e=>this.handleKeyPress(e)}
                           value={this.state.text}
                           onChange={e=>this.handleChange(e)}
                    />
                    <button className='search-button'>
                        <img src={require('./send-btn.svg')}/>
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        receiver: state.receiver
    }
}
export default connect(mapStateToProps)(InputChat)