import {GET_USER_TO_CHAT} from "../actions/define";

const initState = '';
export const receiver = (state = initState, action) =>{
    switch (action.type) {
        case GET_USER_TO_CHAT:
            return action.receiver;
        default: return state;
    }
}