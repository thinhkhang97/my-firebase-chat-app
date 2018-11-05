import {listFriend} from './re-list-friend';
import {listMessage} from "./re-list-message";
import {receiver} from "./re-receiver-id";
import {combineReducers} from 'redux';

export default combineReducers({
    listFriend,
    listMessage,
    receiver
})