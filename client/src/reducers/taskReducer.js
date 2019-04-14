import uuid from 'uuid'
import {GET_TASKS, LOADING} from '../actions/types'
const initialState={
    tasks: [],
    loading: false
}

export default function(state= initialState, action){
    switch(action.type){
        case GET_TASKS:
            return{
                ...state,
                tasks: action.payload,
                loading: false
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