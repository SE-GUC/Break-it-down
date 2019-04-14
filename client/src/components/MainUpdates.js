import React, { Component } from 'react';
import '../App.css';
import Updates from './Updates'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class MainUpdates extends Component {
   state={
    updates:[]
  }

  componentDidMount(){
    axios.get('http://localhost:4000/api/admin/viewUpdates')
    .then(res=>{
      const updates=res.data
      console.log(res.data)
      this.setState({updates})
    })

  }

  render() {
    return (
      <div className="MainUpdates" style={{ backgroundColor:  '#005a73'}}>
      <h1 style={{color:'#B5A642',textAlign:'center'}}>User updates</h1>
      <Updates updates={this.state.updates} />
      </div>
    );
  }
}

export default MainUpdates;
