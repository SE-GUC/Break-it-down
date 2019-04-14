import axios from 'axios';
import {FILTER_TASKS,GET_MEMBERS, LOADING, CONTACT_ADMIN, GET_MY_PARTNERS,GET_PARTNER_TASKS, GET_MY_TASKS} from './types'

export const filterTasks = (memberID) =>  dispatch =>{
  dispatch(setLoading());
  axios.get('/api/ConsultancyAgency/filterTasks/:'+memberID)
  .then(res => dispatch({
    type: FILTER_TASKS,
    payload: res.data
  }))
}
export const getMembers = () =>  dispatch =>{
  dispatch(setLoading());
  axios.get('/api/Member/')
  .then(res => dispatch({
    type: GET_MEMBERS,
    payload: res.data
  }))
}

export const contactAdmin = (message) =>  dispatch =>{
  axios.post('/api/ConsultancyAgency/messages',message)
  .then(res => dispatch({
    type: CONTACT_ADMIN,
  }))
}
export const getMyPartners = () =>  dispatch =>{
  const myidfromtoken= "5c9113101c9d440000a926cc" //temp until we figure out tokens
  axios.get('/api/ConsultancyAgency/Partners/'+myidfromtoken)
  .then(res => dispatch({
    type: GET_MY_PARTNERS,
    payload: res.data
  }))
}
export const getPartnerTasks = (_id) =>  dispatch =>{
  console.log(_id)
  axios.get('/api/ConsultancyAgency/viewTasks/'+_id)
  .then(res =>{
     dispatch({
    type: GET_PARTNER_TASKS,
    payload: res.data
  })})
}

export const getMyTasks = () =>  dispatch =>{
  const myidfromtoken= "5c9113101c9d440000a926cc" //temp until we figure out tokens
  axios.get('/api/ConsultancyAgency/'+myidfromtoken)
  .then(res => dispatch({
    type: GET_MY_TASKS,
    payload: res.data
  }))
}





export const setLoading= () => {
  return {
    type: LOADING
  }
}
