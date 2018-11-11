import { GET_LIST_MESSAGE } from '../actions/define';
import firebase from 'firebase'

const initState = [];
export const listMessage = (state = initState, action) => {
    switch (action.type) {
        case GET_LIST_MESSAGE:
            //// console.log('in get list message ', action.listMessage)
            return action.listMessage;
        default: return state;
    }
}