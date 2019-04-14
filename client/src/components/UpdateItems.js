import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UpdateEntry from './UpdateEntry';

class UpdateItems extends Component {

  render() {
    return this.props.update.map((updt)=>(
      <UpdateEntry key={updt._id} updt= {updt} id={this.props.id} 
      approve={this.props.approve} disapprove={this.props.disapprove} /> ))
  }
}

UpdateItems.propTypes= {
    update: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired

}


export default UpdateItems;

