import axios from 'axios';
import {FILTER_TASKS,GET_MEMBERS, LOADING, CONTACT_ADMIN, GET_MY_PARTNERS,GET_PARTNER_TASKS,GET_APPLICANTS, GET_MY_TASKS,GET_THE_PARTNER} from './types'

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
  axios.get('/api/ConsultancyAgency/Partners')
  .then(res => dispatch({
    type: GET_MY_PARTNERS,
    payload: res.data
  }))
  .catch(error => {
    alert("Your session has expired. Please login again");
    window.location = "/";
    return error;
  });

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
export const getApplicants = (idp,idt) =>  dispatch =>{
  axios.get('/api/Partner/view/'+idp+'/'+idt)
  .then(res =>{
    console.log(res.data)
     dispatch({
    type: GET_APPLICANTS,
    payload: res.data
  } ) })
}

export const getMyTasks = () =>  dispatch =>{
  axios.get('/api/ConsultancyAgency/')
  .then(res => dispatch({
    type: GET_MY_TASKS,
    payload: res.data
  }))
  .catch(error => {
    alert("Your session has expired. Please login again");
    window.location = "/";
    return error;
  });
}


export const getThePartner = (id) =>  dispatch =>{
  dispatch(setLoading());
  axios.get('/api/Partner/'+id)
  .then(res => dispatch({
    type: GET_THE_PARTNER,
    payload: res.data
  }))
  .catch(error => {
    alert("Your session has expired. Please login again");
    window.location = "/";
    return error;
  });
}




export const setLoading= () => {
  return {
    type: LOADING
  }
}
