import React, {Component} from 'react';
import './list-friends.css';
import Search from './search';
import Friend from './friend';
import {connect} from 'react-redux';
import {loadMessage, getUserToChat} from "../../actions";
import firebase from 'firebase';
import {initConversation, getMessageFromDb} from "../../services/firebase-api";

class ListFriends extends Component {

    getListFriend() {
        console.log("Got list friend: ",this.props);
        return this.props.listFriend.map(f=>{
            return <Friend name={f.name} photoURL={f.photoUrl} key={f.id} onClick={()=>this.getMessage(f)}/>
        })
    }

    getMessage(f){
        initConversation(firebase.auth().currentUser.uid, f.id);
        this.props.dispatch(getUserToChat(f));
        getMessageFromDb(firebase.auth().currentUser.uid, f.id, this);
    }

    render(){
        return(
            <div className='list-friend-container'>
                <div className='title-frame'>
                    Danh sach ban be
                </div>
                <div className='search-frame'>
                    <Search/>
                </div>
                <div className='list-friend-frame'>
                    {this.getListFriend()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listFriend: state.listFriend
    }
}

export default connect(mapStateToProps)(ListFriends)