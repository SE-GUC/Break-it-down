import uuid from 'uuid'
import {GET_EVENT, ADD_EVENT, DELETE_EVENT, LOADING} from '../actions/types'
const initialState={
    events: [],
    loading: false
}

export default function(state= initialState, action){
    switch(action.type){
        case GET_EVENT:
            return{
                ...state,
                events: action.payload,
                loading:false
            }
        case LOADING: 
           return{
               ...state,
               loading: true
           }
         default:
            return state;
    }
}