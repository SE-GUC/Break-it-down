import React, { Component } from 'react';
import '../App.css';
import RoomBookingItems from './RoomBookingItems'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class ViewRoomBookings extends Component {
   state={
    roomBooking:[],
    isLoading:true,
    error:null
  }

  update = (id) => {
  }


  //id will change to generic type when linking with authorization
  componentDidMount(){
    axios.get('http://localhost:4000/api/partner/roombookings/5c9113101c9d440000a926cc')
    .then(res=>{
      const roomBooking=res.data.data
      this.setState({roomBooking:roomBooking,isLoading:false})})
      .catch(error => this.setState({ error, isLoading: false }));

  }

  render() {
    return (
      <div className="Rooms Bookings" style={{ backgroundColor:  '#005a73'}}>
      <h1 style={{color:'#ffff4b',textAlign:'center'}}>Room Bookings</h1>
      <RoomBookingItems roomBooking={this.state.roomBooking} 
      isLoading={this.state.isLoading}  error={this.state.error} update={this.update}/>
      </div>
    );
  }
}

export default ViewRoomBookings;
