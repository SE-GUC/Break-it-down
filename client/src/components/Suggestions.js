import React, { Component } from 'react';
import '../App.css';
import SuggestionItems from './SuggestionItems'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class Suggestions extends Component {
   state={
    coworkingSpace:[],
    isLoading:true,
    error:null
  }

  auth = async () => {
    await fetch(
      `/api/coworkingSpace/viewCoworkingSpace`)
      .then(res => res.json())
      .catch(error => {
        alert("Your session has expired. Please login again");
        window.location = "/";
        return error;
      });
  };

  //id will change to generic type when linking  `/api/coworkingSpace/CoworkingSpace/Suggestions/${eid}`
  componentDidMount(){
    this.auth();
    axios.get('/api/coworkingSpace/CoworkingSpace/Suggestions/6')
    .then(res=>{
      const coworkingSpace=res.data
      this.setState({coworkingSpace:coworkingSpace,isLoading:false})})
      .catch(error =>{ this.setState({ error, isLoading: false })
      alert(error.message )
    });

  }

  render() {
    return (
      <div className="Suggestions" style={{ backgroundColor:  '#ffffff'}}>
      <h1 style={{color:'#000000',textAlign:'center'}}>Coworking Space Suggestions</h1>
      <SuggestionItems coworkingSpace={this.state.coworkingSpace} 
      isLoading={this.state.isLoading}  error={this.state.error}/>
      </div>
    );
  }
}

export default Suggestions;
