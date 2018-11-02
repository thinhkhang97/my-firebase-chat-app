import React, {Component} from 'react';
import './list-friends.css';
import Search from './search';
import FriendItem from './friend-item';

class ListFriends extends Component {
    render(){
        return(
            <div className='list-friend-container'>
                <div className='title-frame'>
                    title
                </div>
                <div className='search-frame'>
                    <Search/>
                </div>
                <div className='list-friend-frame'>
                    <FriendItem/>
                    <FriendItem/>
                    <FriendItem/>
                    <FriendItem/>
                    <FriendItem/>
                    <FriendItem/>
                    <FriendItem/>
                </div>
            </div>
        );
    }
}

export default ListFriends