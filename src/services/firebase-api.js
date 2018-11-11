import firebase from 'firebase';
import {loadListFriend, loadMessage} from '../actions';


// add new user in into list in firebase.
export const addNewUser = (_this) => {
    // Find all friend in list users
    _this.props.firestore.get({collection: 'users'}).then(res=>{
        const allUsers = res.docs;

        const friendsId = allUsers
            .filter(user=> user.id !== _this.props.currentUser.uid)
            .map(user=>user.id);
        // console.log('Got list friend: ', friendsId);

        // add all friend in to listFriend
        const cu = _this.props.currentUser;
        let willAddUser = null;

        // check if this users was created
        const thisUser = allUsers.filter(u => u.id === _this.props.currentUser.uid);

        // set when the first time access.
        if(thisUser.length === 0) {
            willAddUser = {
                name: cu.displayName,
                uid: cu.uid,
                photoURL: cu.photoURL,
                friends: [
                    ...friendsId
                ],
                conversations: []
            }
            _this.props.firestore.collection('users').doc(cu.uid).set(willAddUser);
            // update friend of all users
            for(let user of allUsers){
                console.log(user.id,_this.props.currentUser.uid);
                if(user.id !== _this.props.currentUser.uid){
                    _this.props.firestore.collection('users').doc(user.id).update({
                        friends: firebase.firestore.FieldValue.arrayUnion(cu.uid)
                    })
                }
            }
        }
        // update friend
        else {
            willAddUser = {
                friends: [
                    ...friendsId
                ]
            }
            // console.log('update friend', willAddUser);
            _this.props.firestore.collection('users').doc(cu.uid).update(willAddUser);
        }


    })

}

// export function getListFriend(_this) {
//     const uid = firebase.auth().currentUser.uid;
//     _this.props.firestore.collection('users').doc(uid).get().then(res=>{
//         console.log('List Friend: ', res.data().friends);
//     })
// }

export function getDataOfUser(uid, _this) {
    _this.props.firestore.collection('users').doc(uid).get().then(res=>{
        console.log('User data: ', res.data());
        _this.props.listFriend.push(res.data());
    })
}

// get all data
export function getAllData(_this) {
    firebase.database().ref('data/').once('value').then(snapshot=>{
        //console.log(snapshot.val().friends);
        _this.props.dispatch(loadListFriend(snapshot.val().friends));
    })
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
export function initConversation(currentUser, user2, _this) {
    // check if there was conversation with user 2
    console.log('Current user: ', currentUser);
    const con = currentUser.conversations.filter(con=>con.with === user2.uid);
    console.log('find conversation: ', con);
    if (con.length === 0) {
        const conversationId = currentUser.uid + user2.uid;

        // add conversation for user 1
        _this.props.firestore.collection('users').doc(currentUser.uid).set({
            ...currentUser,
            conversations: currentUser.conversations.concat({
                conversationId,
                with: user2.uid
            })
        });

        // add conversation for user 2
        _this.props.firestore.collection('users').doc(user2.uid).set({
            ...user2,
            conversations: user2.conversations.concat({
                conversationId,
                with: currentUser.uid
            })
        });

        _this.props.firestore.collection('conversations').doc(conversationId).set({
            contents: []
        })

    }
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

