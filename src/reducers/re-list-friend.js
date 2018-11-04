import { GET_LIST_FRIEND } from '../actions/define';
import firebase from 'firebase'

const initState = [];
export const listFriend = (state = initState, action) => {
    switch (action.type) {
        case GET_LIST_FRIEND:
            return action.listFriend.filter(f => {
                return f.id !== firebase.auth().currentUser.uid;
            });

        default: return state;
    }
}