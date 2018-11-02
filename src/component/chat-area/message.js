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
                                <img className='avatar'/>
                            </div>
                            <div className='text-frame'>
                                <div className='text-field text-field-left'>
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                                    euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
                                    minim veniam, quis nostrud exerci tation ullamcorper
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
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
                                    euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
                                    minim veniam, quis nostrud exerci tation ullamcorper
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}