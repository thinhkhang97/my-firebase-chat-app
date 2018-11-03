import React, {Component} from 'react';
import './friend.css'
class Friend extends Component {
    render(){
        return(
            <div>
                <div className='friend-container'>
                    <div className='avatar-name'>
                        <img className='avatar-friend-frame'/>
                        <div className='name-friend-frame'>
                            Nguyen Thinh Khang
                        </div>
                    </div>
                    <div className='status-frame onlined'>
                    </div>
                </div>

                <div className='friend-container selected'>
                    <div className='avatar-name'>
                        <div className='avatar-friend-frame'>
                        </div>
                        <div className='name-friend-frame'>
                            Nguyen Thinh Khang
                        </div>
                    </div>
                    <div className='status-frame'>
                    </div>
                </div>
            </div>
        )
    }
}
export default Friend;