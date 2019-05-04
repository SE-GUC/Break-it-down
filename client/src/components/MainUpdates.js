import React, { Component } from 'react';
import '../App.css';
import Updates from './Updates'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import AdminNavbar from './AdminNavbar'

class MainUpdates extends Component {
   state={
    updates:[],
    isLoading:true,
    error:null
  }

 auth = async () => {
    await fetch(
      `/api/admin/viewAdmin`)
      .then(res => res.json())
      .catch(error => {
        alert("Your session has expired. Please login again");
        window.location = "/";
        return error;
      });
  };

  componentDidMount(){
    this.auth();
    axios.get('/api/admin/viewUpdates')
    .then(res=>{
      const updates=res.data
      this.setState({updates:updates,isLoading:false})
    })
    .catch(error => {
      this.setState({ error, isLoading: false })
      alert(error.message )
  });

  }

  approve = (id,_id) => {
    axios.put(`/api/admin/approveUpdates/${id}/${_id}`)
   .then(res=>{axios.get('/api/admin/viewUpdates')
   .then(res=>{
     const updates=res.data
     this.setState({updates:updates,isLoading:false})
   })
   .catch(error => {
     this.setState({ error, isLoading: false })
     alert(error.message )
 })})

  }

  disapprove = (id,_id) => {
    axios.delete(`/api/admin/disapproveUpdates/${id}/${_id}`)
    .then(res=>{axios.get('/api/admin/viewUpdates')
    .then(res=>{
      const updates=res.data
      this.setState({updates:updates,isLoading:false})
    })
    .catch(error => {
      this.setState({ error, isLoading: false })
      alert(error.message )
  })})
    
  }

  render() {
    return (
      <div className="MainUpdates" style={{ backgroundColor:  '#ffffff'}}>
      <AdminNavbar/>
      <h1 style={{color:'#000000',textAlign:'center'}}>User updates</h1>
      <Updates updates={this.state.updates}  approve={this.approve} disapprove={this.disapprove} 
      isLoading={this.state.isLoading}  error={this.state.error} />
      </div>
    );
  }
}

export default MainUpdates;
