import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SuggestionEntry from './SuggestionEntry';

class SuggestionItems extends Component {

  render() {
    return (this.props.error ? <div class="alert alert-danger" role="alert"> {this.props.error.message} </div> :
        this.props.isLoading? <div class="spinner-border text-info" role="status">
        <span class="sr-only">Loading...</span> </div>:
    this.props.coworkingSpace.map((cospace)=>(
      <SuggestionEntry key={cospace._id} cospace= {cospace}  /> ))
    )
   
  }
}

SuggestionItems.propTypes= {
    coworkingSpace: PropTypes.array.isRequired

}


export default SuggestionItems;

