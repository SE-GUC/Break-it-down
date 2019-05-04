import React, { Component } from 'react';
import '../App.css';
import SuggestionItems from './SuggestionItems'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


class Suggestions extends Component {
   state={
    coworkingSpace:[],
    isLoading:true,
    error:null
  }


  //id will change to generic type when linking  `/api/coworkingSpace/CoworkingSpace/Suggestions/${eid}`
  componentDidMount(){
    const {data}= this.props.location
    axios.get(`/api/coworkingSpace/CoworkingSpace/Suggestions/${data._id}`)
    .then(res=>{
      const coworkingSpace=res.data
      this.setState({coworkingSpace:coworkingSpace,isLoading:false})})
      .catch(error => this.setState({ error, isLoading: false }));

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

export default withRouter(Suggestions);
