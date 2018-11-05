import React, {Component} from 'react';
import './message.css';
export class MessageLeft extends Component {
    render(){
        return(
            <div>
                <div className='message-container'>
                    <div>
                        <div className='message-frame-left'>
                            <div>
                                <img className='avatar' src={this.props.photoUrl} alt=''/>
                            </div>
                            <div className='text-frame'>
                                <div className='text-field text-field-left'>
                                    {this.props.content}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export class MessageRight extends Component {
    render(){
        return(
            <div>
                <div className='message-container'>
                    <div>
                        <div className='message-frame-right'>
                            <div className='text-frame'>
                                <div className='text-field text-field-right'>
                                    {this.props.content}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}