import {combineReducers} from "redux";
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import {receiver} from "./others/re-receiver-id";

export const rootReducer = combineReducers(
    {
        firebase: firebaseReducer,
        firestore: firestoreReducer,
        receiver
    }
)

export const initialState = {}