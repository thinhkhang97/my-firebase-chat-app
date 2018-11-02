import React, {Component} from 'react';
import './friend-item.css';

class FriendItem extends Component {
    render(){
        return(
            <div>
                <div className='friend-container'>
                    <div className='avatar-name'>
                        <div className='avatar-frame'>
                        </div>
                        <div className='name-frame'>
                            Nguyen Thinh Khang
                        </div>
                    </div>
                    <div className='status-frame onlined'>
                    </div>
                </div>

                <div className='friend-container selected'>
                    <div className='avatar-name'>
                        <div className='avatar-frame'>
                        </div>
                        <div className='name-frame'>
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
export default FriendItem;