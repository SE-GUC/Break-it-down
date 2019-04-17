import React, { Component } from 'react';
import '../App.css';
import Updates from './Updates'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import AdminSidenav from './AdminSidenav'
import AdminNavbar from './AdminNavbar'

class MainUpdates extends Component {
   state={
    updates:[],
    isLoading:true,
    error:null
  }

  componentDidMount(){
    axios.get('http://localhost:4000/api/admin/viewUpdates')
    .then(res=>{
      const updates=res.data
      this.setState({updates:updates,isLoading:false})
    })
    .catch(error => this.setState({ error, isLoading: false }));

  }

  approve = (id,_id) => {
    axios.put(`http://localhost:4000/api/admin/approveUpdates/${id}/${_id}`)

  }

  disapprove = (id,_id) => {
    axios.delete(`http://localhost:4000/api/admin/disapproveUpdates/${id}/${_id}`)
  }

  render() {
    return (
      <div className="MainUpdates" style={{ backgroundColor:  '#FFFFEB'}}>
      <AdminSidenav/>
      <AdminNavbar/>
      <h1 style={{color:'#005a73',textAlign:'center'}}>User updates</h1>
      <Updates updates={this.state.updates}  approve={this.approve} disapprove={this.disapprove} 
      isLoading={this.state.isLoading}  error={this.state.error}/>
      </div>
    );
  }
}

export default MainUpdates;
