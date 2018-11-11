import React, {Component} from 'react';
import './input-chat.css';
import {sendMessage} from "../../services/firebase-api";
import {connect} from 'react-redux';
import firebase from 'firebase';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';

class InputChat extends Component {

    constructor(props) {
        super(props);
        this.state = {text: ''}
    }

    handleSendMessage(){
        // // console.log("Send message", this.state.text, ' to ', this.props.receiver.name);
        // sendMessage(firebase.auth().currentUser.uid, this.props.receiver.id, this.state.text);

        // load all the conversations

        this.props.firestore.get({collection: 'conversations'}).then(res=>{
            // // console.log('res', res.docs);

            // take conversation id
            const receiver = this.props.receiver;
            const currentUser = firebase.auth().currentUser;
            // console.log('receiver uid', receiver.uid);
            if(receiver.uid === undefined)
                alert('Ban phai chon 1 nguoi de nt');
            else
            this.props.firestore.collection('users').doc(receiver.uid).get().then(doc=>{
                const con = doc.data().conversations.filter(con => con.with === currentUser.uid);
                if(con.length>0){
                    // console.log('load conversation id',con);
                    const conId = con[0].conversationId;
                    this.props.firestore.collection('conversations').doc(conId).get().then(doc=>{
                        const contents = doc.data().contents;
                        // console.log('Send message', this.state.text);
                        this.props.firestore.collection('conversations').doc(conId).set({
                            contents: contents.concat({
                                content: this.state.text,
                                senderId: currentUser.uid
                            })
                        })

                        this.state.text = '';
                    })
                }
            })

        })
    }

    handleKeyPress(e){
        if(e.key == 'Enter')
        {
            this.handleSendMessage()
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
                    <button className='search-button' onClick={()=>this.handleSendMessage()}>
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
export default compose(firestoreConnect(['conversations','users']),
    connect(mapStateToProps))(InputChat)