import React, {Component} from 'react'
import './menu.css'


export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuContainer: {
                isOpened: false,
                width: '60px'
            },
            menuFrame: {
                backgroundColor: '#3B88C3'
            },
            expandMenuFrame: {
                opacity: 0
            }
        }
    }

    onClickAvatar() {
        console.log('onClickAvatar');
        this.setState({
            menuContainer: {
                width: this.state.menuContainer.isOpened ? '60px' : '250px',
                isOpened: !this.state.menuContainer.isOpened
            },
            expandMenuFrame: {
                opacity: this.state.menuContainer.isOpened ? 0 : 1
            },
            menuFrame: {
                backgroundColor: this.state.menuContainer.isOpened ? '#3B88C3' : '#B0CFE7'
            }
        })
        console.log(this.state.menuContainer);
    }

    render() {
        return(
            <div>
                <div id='menu-container' style={{width: this.state.menuContainer.width}}>
                    <div id='menu-frame' style={{backgroundColor: this.state.menuFrame.backgroundColor}}>
                        <button id='avatar'
                                onClick={()=>this.onClickAvatar()}/>
                    </div>
                    <div id='expand-menu-frame' style={{opacity: this.state.expandMenuFrame.opacity}}>
                        <div>
                            <img className='avatar-frame'/>
                        </div>
                        <div className='name-frame'>
                            Nguyen Thinh Khang
                        </div>
                        <div>
                            <button id='log-out'>Dang xuat</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
