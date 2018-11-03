import React, {Component} from 'react';
import './list-friends.css';
import Search from './search';
import Friend from './friend';

class ListFriends extends Component {
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
                    <Friend/>
                </div>
            </div>
        );
    }
}

export default ListFriends