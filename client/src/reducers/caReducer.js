import uuid from 'uuid'
import {FILTER_TASKS, LOADING, GET_MEMBERS, GET_MY_PARTNERS,GET_PARTNER_TASKS,GET_APPLICANTS, GET_MY_TASKS} from '../actions/types'
const initialState={
    members:[],
    mypartners:[],
    partnertasks:[],
    taskapplicants:[],
    mytasks:[],
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
        case GET_MY_TASKS:
            return{
                ...state,
                mytasks: action.payload.tasks,
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