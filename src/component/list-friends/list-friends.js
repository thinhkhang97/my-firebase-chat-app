import React, {Component} from 'react';
import './list-friends.css';
import Search from './search';
import Friend from './friend';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {loadMessage, getUserToChat} from "../../actions";
import firebase from 'firebase';
import {initConversation, getMessageFromDb} from "../../services/firebase-api";

class ListFriends extends Component {

    constructor(props){
        super(props);
        this.state = {
            idSelected: ''
        }
    }

    getListFriend() {
        // console.log("Got list friend: ",this.props.listFriend);
        const listFriend = this.props.listFriend;
        if(listFriend.length > 0)
        return listFriend.map(f=>{
            // return <Friend name={f.name} photoURL={f.photoUrl} key={f.id} isSelected={this.state.idSelected===f.id} onClick={()=>this.getMessage(f)}/>
            return <Friend
                name={f.name}
                photoURL={f.photoURL}
                key={f.id}
                isSelected={this.state.idSelected===f.id}
                onClick={()=>this.getMessage(f)}
            />
        })
    }

    getMessage(f){
        initConversation(this.props.currentUser, f, this);
        this.props.dispatch(getUserToChat(f));
        // getMessageFromDb(firebase.auth().currentUser.uid, f.id, this);
        this.setState({idSelected: f.id});
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
    const currentUserId = firebase.auth().currentUser.uid;
    if(state.firestore.ordered.users !== undefined)
    {
        const users = state.firestore.ordered.users;
        const user = users.filter(u => u.id === currentUserId);
        if(user.length > 0){
            const listFriend = user[0].friends.map(fid => {
                const userInfo = users.filter(u => u.id === fid);
                return {
                    ...userInfo[0]
                }
            });
            return {
                listFriend,
                currentUser: user[0]
            }
        }
    }
    return {
        listFriend: [],
        currentUser: state.firebase.auth
    }
}

export default compose(firestoreConnect(['users', 'conversations']),
    connect(mapStateToProps))(ListFriends)