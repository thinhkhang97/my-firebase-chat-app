import React, {Component} from 'react';
import './list-friends.css';
import Search from './search';
import Friend from './friend';
import {connect} from 'react-redux';

class ListFriends extends Component {

    getListFriend() {
        console.log(this.props);
        return this.props.listFriend.map(f=>{
            return <Friend name={f.name} photoURL={f.photoUrl}/>
        })
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