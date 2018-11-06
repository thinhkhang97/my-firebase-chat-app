import React, {Component} from 'react';
import './friend.css'
class Friend extends Component {
    render(){
        return(
            <div>
                <div className={`friend-container ${this.props.isSelected && 'selected'}`}  onClick={()=>this.props.onClick()}>
                    <div className='avatar-name'>
                        <img className='avatar-friend-frame' src={this.props.photoURL} alt=''/>
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