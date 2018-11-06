import firebase from 'firebase';
import {loadListFriend, loadMessage} from '../actions';

// add new user in into list in firebase.
export const addNewUser = (uid, email, name, photoUrl) => {
    const data = firebase.database().ref('data/').once('value').then(snapshot=>{
        const friends = snapshot.val().friends;
        //console.log(friends);

        // Find me in data
        const foundFriend = friends.filter(f=>{
            return f.id === uid ? f : null
        })
        
        //console.log(foundFriend);
        // Add user into data
        if(foundFriend.length === 0) 
            firebase.database().ref('data/friends').set([
                ...friends,
                {
                    id: uid,
                    email: email,
                    name: name,
                    photoUrl: photoUrl
                }
            ])
    });
}

// get all data
export function getAllData(_this) {
    firebase.database().ref('data/').once('value').then(snapshot=>{
        //console.log(snapshot.val().friends);
        _this.props.dispatch(loadListFriend(snapshot.val().friends));
    })
}

// add the conversation for user
export function addConversation(userIdex, conId, withId) {
    firebase.database().ref('data/friends/'+userIdex).once('value').then(snapshot=>{
        //console.log('add conversation into user: ', snapshot.val(), ' with id: ', conId);

        // data is data of friends[userIdex]
        const data = snapshot.val();
        //console.log('check value of data.conversations: ', data.conversations);
        // if there are no conversations
        if(data['conversations'] === undefined)
            firebase.database().ref('data/friends/'+userIdex).set({
                ...data,
                conversations: [
                    {
                        with: withId,
                        conversationId: conId
                    }
                ]
            })
        else{
            const con = data.conversations.filter(c=> c.with===withId)
            //console.log('Result find conversation: ', con);
            // if there is no conversation with this guy before
            if(con.length === 0)
                firebase.database().ref('data/friends/'+userIdex+'/conversations').set([
                    ...data.conversations,
                    {
                        with: withId,
                        conversationId: conId
                    }
                ])
                //console.log('add new conversation');
        }
        //console.log('data after add conversations: ', snapshot.val());
    });
}

// create a conversation after init conversation between 2 users
function createConversation(conId) {
    firebase.database().ref('message/').once('value').then(snapshot=>{
        const data = snapshot.val();

        // Find the conId in all data
        const con = data.filter(d=>d.id===conId);

        // If there is no conversation before
        if(con.length === 0)
            firebase.database().ref('message/').set([
                ...data,
                {
                    content: [],
                    conversationId: conId
                }
            ])

    })
}

// init a conversation between 2 users
export function initConversation(userId1, userId2) {
    firebase.database().ref('data/').once('value').then(snapshot=>{
        const friends = snapshot.val().friends;

        // get 2 users
        const user1 = friends.map((f, index)=>{
            return {
                ...f,
                index: index
            }
        }).filter(f=>f.id == userId1);
        const user2 = friends.map((f, index)=>{
            return {
                ...f,
                index: index
            }
        }).filter(f=>f.id == userId2);
        //console.log("check conversation of ",userId1, " and ", userId2);
        //console.log(users[0]["conversations"]);
        //console.log(users[1]["conversations"]);
        addConversation(user1[0].index, userId1+userId2, user2[0].id);
        addConversation(user2[0].index, userId1+userId2, user1[0].id);

        // check if it has create conversation before
        firebase.database().ref('data/friends/'+user1[0].index+'/conversations').once('value').then(snapshot=>{
            const data = snapshot.val();
            //console.log('check has con before ', data)
            if(data == null){
                createConversation(userId1+userId2);
                return;
            }
            const con = data.filter(d=>d.with === userId2)
            //console.log('check con: ', con);
            // if there are no conversation, create one
            if(con.length == 0)
                createConversation(userId1+userId2);
        })

    })
}

export function getMessageFromDb(senderId, receiverId, _this) {
    // Calculate the conversationId
    firebase.database().ref('data/friends').once('value').then(snapshot => {
        const data = snapshot.val();
        console.log('get message form db data',data);
        const f = data.map((d, index) => {
            return {
                ...d,
                index
            }
        }).filter(d => d.id == senderId)
        firebase.database().ref('data/friends/' + f[0].index).once('value').then(ss => {
            console.log('get message form db ss val',ss.val());
            let con = undefined;
            if(ss.val().conversations !== undefined){
                console.log('get con between: ', senderId, receiverId);
                con =  ss.val().conversations.filter(c => c.with == receiverId);
                firebase.database().ref('message/').on('value', ss2=>{
                    console.log(ss2.val());
                    if(con.length>0)
                    {
                        const message = ss2.val().filter(m => m.conversationId == con[0].conversationId)
                        if(message[0]!== undefined && message[0].content !== undefined)
                        {
                            console.log('got message ', message[0]);
                            _this.props.dispatch(loadMessage(message[0].content))
                        }
                        else{
                            _this.props.dispatch(loadMessage(null));
                        }
                    }
                })
            }
        })
    })
}

export function sendMessage(senderId, receiverId, content) {
    // Calculate the conversationId
    firebase.database().ref('data/friends').once('value').then(snapshot=>{
        const data = snapshot.val();
        //console.log(data);
        const f = data.map((d, index)=>{
            return {
                ...d,
                index
            }
        }).filter(d=>d.id == senderId)
        firebase.database().ref('data/friends/'+f[0].index).once('value').then(ss=>{
            //console.log(ss.val());
            const con = ss.val().conversations.filter(c=>c.with == receiverId);
            //console.log('Final step: send message to ',con, con[0].with, ' conId: ', con[0].conversationId)
            _sendMessage(senderId,con[0].conversationId, content);
        })
    })
}

function _sendMessage(senderId, conId, content) {
    firebase.database().ref('message').once('value').then(snapshot=>{
        const data = snapshot.val();
        // console.log(data);
        // find index of message
        const mess = data.map((m, index)=>{
            return {
                ...m,
                index
            }
        }).filter(m=>m.conversationId === conId);

        console.log('data after filter: ', mess);
        if(mess.length > 0)
        firebase.database().ref('message/'+mess[0].index).set({
            ...mess[0],
            content: mess[0].content === undefined ? [
                {
                    senderId,
                    content
                }
            ] : mess[0].content.concat(
                {
                    senderId,
                    content
                }
            )
        })
    })
}

