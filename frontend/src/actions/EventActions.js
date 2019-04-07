import axios from 'axios';
import {GET_EVENT, ADD_EVENT, DELETE_EVENT, LOADING} from './types'

export const getEvents = () =>  dispatch =>{
  dispatch(setLoading());
  axios.get('/api/Events')
  .then(res => dispatch({
    type: GET_EVENT,
    payload: res.data
  }))


  /*dispatch(setItemsLoading());
  axios
    .get('/api/Members')
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err =>
        console.log(err)
    );*/
};

export const setLoading= () => {
  return {
    type: LOADING
    //eventpayload: event
  }
}
