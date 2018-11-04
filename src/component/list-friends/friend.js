import React, {Component} from 'react';
import './friend.css'
class Friend extends Component {
    render(){
        return(
            <div>
                <div className='friend-container'>
                    <div className='avatar-name'>
                        <img className='avatar-friend-frame' src={this.props.photoURL}/>
                        <div className='name-friend-frame'>
                            {this.props.name}
                        </div>
                    </div>
                    <div className='status-frame onlined'>
                    </div>
                </div>
            </div>
        )
    }
}
export default Friend;