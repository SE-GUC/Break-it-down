import axios from 'axios';
import {GET_TASKS, LOADING} from './types'

export const getTasks = () =>  dispatch =>{
  dispatch(setLoading());
  axios.get('/api/Member/allTasks')
  .then(res => dispatch({
    type: GET_TASKS,
    payload: res.data
  }))
  .catch(error => {
    alert("Your session has expired. Please login again");
    window.location = "/";
    return error;
  });

}

  export const getAvailableTasks = () =>  dispatch =>{
    dispatch(setLoading());
    axios.get('/api/ConsultancyAgency/allTasks')
    .then(res => dispatch({
      type: GET_TASKS,
      payload: res.data
    }))
    .catch(error => {
      alert("Your session has expired. Please login again");
      window.location = "/";
      return error;
    });

  }

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


export const setLoading= () => {
  return {
    type: LOADING
    //taskpayload: task
  }
}
