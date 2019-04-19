import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RoomBookingEntry extends Component {
  getStyle= () =>{
      return {
        background: '#FFFFEB',
        padding: '10px',
        borderBottom: '1px #005a73 solid',
        textDecoration: 'none',
        textAlign: 'center'

      }
  }


  render() { 
      return (
    <div style={this.getStyle()}>
        <p style={{color:'#005a73'}}>
        {(this.props.roomBooking.Date===undefined?"Booking Date: unknown ":"Booking Date: "+this.props.roomBooking.Date)}<br/>
        {(this.props.roomBooking.time===undefined?"Booking time: unknown ":"Booking time: "+this.props.roomBooking.time)}<br/>
        <a href = "https://jobs4us.herokuapp.com/user/updateRoomBooking">
        <button onClick={this.props.update.bind(this,this.props.id)} type="button" class="btn btn-outline-warning">Update</button></a>
       
         </p>
    </div>
)
      }
}

RoomBookingEntry.propTypes= {
    roomBooking: PropTypes.object.isRequired,
    id:PropTypes.string.isRequired
}


export default RoomBookingEntry;