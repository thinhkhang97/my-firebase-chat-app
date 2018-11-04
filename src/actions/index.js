import {GET_LIST_FRIEND} from './define';

export const loadListFriend = (listFriend) => (
    {
        type: GET_LIST_FRIEND,
        listFriend
    }
)