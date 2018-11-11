import React, {Component} from 'react'
import './menu.css';
import firebase from 'firebase';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';

class Menu extends Component {
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
        //// console.log(firebase.auth().currentUser);
    }

    onClickAvatar() {
        //// console.log('onClickAvatar');
        this.setState({
            menuContainer: {
                width: this.state.menuContainer.isOpened ? '60px' : '310px',
                isOpened: !this.state.menuContainer.isOpened
            },
            expandMenuFrame: {
                opacity: this.state.menuContainer.isOpened ? 0 : 1
            },
            menuFrame: {
                backgroundColor: this.state.menuContainer.isOpened ? '#3B88C3' : '#B0CFE7'
            }
        })
        //// console.log(this.state.menuContainer);
    }

    onClickLogout() {
        firebase.auth().signOut();
    }

    render() {
        return(
            <div>
                <div id='menu-container' style={{width: this.state.menuContainer.width}}>
                    <div id='menu-frame' style={{backgroundColor: this.state.menuFrame.backgroundColor}}>
                        <img id='avatar' src={this.props.currentUser.photoURL}
                                onClick={()=>this.onClickAvatar()}/>
                    </div>
                    <div id='expand-menu-frame' style={{opacity: this.state.expandMenuFrame.opacity}}>
                        <div>
                            <img className='avatar-frame' src={this.props.currentUser.photoURL}/>
                        </div>
                        <div className='name-frame'>
                            {this.props.currentUser.displayName}
                        </div>
                        <div>
                            <button id='log-out' onClick={()=>this.onClickLogout()}>Dang xuat</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProp = (state) => {
    return {
        currentUser: state.firebase.auth
    }
}

export default compose(connect(mapStateToProp),firestoreConnect())(Menu)


