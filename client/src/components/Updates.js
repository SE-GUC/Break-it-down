import React, { Component } from 'react';
import UpdateItem from './UpdateItems';
import PropTypes from 'prop-types';
import horse from "../horsy.gif";

class Updates extends Component {
  render() {
   return( this.props.error ? <div class="alert alert-danger" role="alert"> {this.props.error.message} </div> :
    this.props.isLoading? 
    <img style={{ width: 100, height: 70 }} src={horse} />
    :
     this.props.updates.map((update)=>(
       <UpdateItem key={update} update= {update.updates} id={update._id} 
       approve={this.props.approve} disapprove={this.props.disapprove}
       isLoading={this.props.isLoading}  error={this.props.error}/>  ))
   )
  }
}

Updates.propTypes= {
    updates: PropTypes.array.isRequired
}

export default Updates;
