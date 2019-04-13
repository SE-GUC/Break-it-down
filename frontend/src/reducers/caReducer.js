import uuid from 'uuid'
import {FILTER_TASKS, LOADING, GET_MEMBERS, GET_MY_PARTNERS} from '../actions/types'
const initialState={
    members:[],
    mypartners:[],
    loading: false
}

export default function(state= initialState, action){
    switch(action.type){
        case GET_MEMBERS:
        return{
            ...state,
            members: action.payload,
            
        }
        case GET_MY_PARTNERS:
        return{
            ...state,
            mypartners: action.payload.partners,
            
        }
        case FILTER_TASKS:
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