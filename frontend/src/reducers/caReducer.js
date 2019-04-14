import uuid from 'uuid'
import {FILTER_TASKS, LOADING, GET_MEMBERS, GET_MY_PARTNERS,GET_PARTNER_TASKS,GET_APPLICANTS} from '../actions/types'
const initialState={
    members:[],
    mypartners:[],
    partnertasks:[],
    taskapplicants:[],
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
        case GET_PARTNER_TASKS: 
            return{
                ...state,
                partnertasks:action.payload.tasks,
                loading: false
        }
        case FILTER_TASKS:
            return{
                ...state,
                tasks: action.payload,
                loading: false
            }
        case GET_APPLICANTS:
            return{
                ...state,
                taskapplicants: action.payload,
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