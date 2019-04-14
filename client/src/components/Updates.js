import React, { Component } from 'react';
import UpdateItem from './UpdateItems';
import PropTypes from 'prop-types';

class Updates extends Component {
  render() {
   return( this.props.error ? <div class="alert alert-danger" role="alert"> {this.props.error.message} </div> :
    this.props.isLoading? <div class="spinner-border text-info" role="status">
    <span class="sr-only">Loading...</span> </div>:
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
