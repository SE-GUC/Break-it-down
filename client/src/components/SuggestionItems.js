import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SuggestionEntry from './SuggestionEntry';
import horse from "../horsy.gif";

class SuggestionItems extends Component {

  render() {
    return (this.props.error ? <div class="alert alert-danger" role="alert"> {this.props.error.message} </div> :
        this.props.isLoading?
        <img style={{ width: 100, height: 70 }} src={horse} />:
    this.props.coworkingSpace.map((cospace)=>(
      <SuggestionEntry key={cospace._id} cospace= {cospace}  /> ))
    )
   
  }
}

SuggestionItems.propTypes= {
    coworkingSpace: PropTypes.array.isRequired

}


export default SuggestionItems;

