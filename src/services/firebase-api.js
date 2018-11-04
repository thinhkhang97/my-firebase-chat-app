import firebase from 'firebase';
import {loadListFriend} from '../actions';

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

export function getAllData(_this) {
    firebase.database().ref('data/').once('value').then(snapshot=>{
        console.log(snapshot.val().friends);
        _this.props.dispatch(loadListFriend(snapshot.val().friends));
    })
}