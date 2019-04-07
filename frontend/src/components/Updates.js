import React, { Component } from 'react';
import UpdateItem from './UpdateItems';
import PropTypes from 'prop-types';

class Updates extends Component {
  render() {
   return this.props.updates.map((update)=>(
       <UpdateItem key={update} update= {update.updates} id={update._id} />
   ))
  }
}

Updates.propTypes= {
    updates: PropTypes.array.isRequired
}

export default Updates;
