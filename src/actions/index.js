import {GET_LIST_FRIEND, GET_LIST_MESSAGE, GET_USER_TO_CHAT} from './define';

export const loadListFriend = (listFriend) => (
    {
        type: GET_LIST_FRIEND,
        listFriend
    }
)

export const loadMessage = (listMessage) => (
    {
        type:GET_LIST_MESSAGE,
        listMessage
    }
)

export const getUserToChat = (receiver) => ({
    type: GET_USER_TO_CHAT,
    receiver
})

