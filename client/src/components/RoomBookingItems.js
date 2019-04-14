import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RoomBookingEntry from './RoomBookingEntry'

class RoomBookingItems extends Component {

  render() { 
      return (
        this.props.error ? <div class="alert alert-danger" role="alert"> {this.props.error.message} </div> :
        this.props.isLoading? <div class="spinner-border text-info" role="status">
        <span class="sr-only">Loading...</span> </div>:
        this.props.roomBooking.map((room)=>(
        <RoomBookingEntry id={room.bookingID} roomBooking= {room} update={this.props.update}/> ))
      )
  }
}

RoomBookingItems.propTypes= {
    roomBooking: PropTypes.array.isRequired,
    id:PropTypes.string.isRequired
}


export default RoomBookingItems;
