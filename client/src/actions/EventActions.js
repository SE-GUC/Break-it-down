import axios from 'axios';
import {GET_EVENT, ADD_EVENT, DELETE_EVENT, LOADING} from './types'

export const getEvents = () =>  dispatch =>{
  dispatch(setLoading());
  axios.get('/api/Events')
  .then(res => dispatch({
    type: GET_EVENT,
    payload: res.data
  }))



};

export const addEvent = (item) =>  dispatch =>{

  console.log(item)
  axios.post('/api/Events',item)
  .then(res => dispatch({
    type: ADD_EVENT,
    payload: item
  }))
}


export const setLoading= () => {
  return {
    type: LOADING
    //eventpayload: event
  }
}
