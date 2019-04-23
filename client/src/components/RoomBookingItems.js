import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RoomBookingEntry from './RoomBookingEntry'
import horse from "../horsy.gif";

class RoomBookingItems extends Component {

  render() { 
      return (
        this.props.error ? <div class="alert alert-danger" role="alert"> {this.props.error.message} </div> :
        this.props.isLoading? 
        <img style={{ width: 100, height: 70 }} src={horse} />:
        this.props.roomBooking.map((room)=>(
        <RoomBookingEntry id={room.bookingID} roomBooking= {room} /> ))
      )
  }
}

RoomBookingItems.propTypes= {
    roomBooking: PropTypes.array.isRequired,
    id:PropTypes.string.isRequired
}


export default RoomBookingItems;
