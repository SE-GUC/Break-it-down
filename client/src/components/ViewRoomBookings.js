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
  
  auth = async () => {
    await fetch(
      `/api/admin/viewAll`)
      .then(res => res.json())
      .catch(error => {
        alert("Your session has expired. Please login again");
        window.location = "/";
        return error;
      });
  };

  componentDidMount(){
      this.auth();
    axios.get('/api/partner/roombookings')
    .then(res=>{
      const roomBooking=res.data
      this.setState({roomBooking:roomBooking,isLoading:false})})
      .catch(error => {
        this.setState({ error, isLoading: false })
      alert(error.message )
      });
  }

  render() {
    return (
      <div className="Rooms Bookings" style={{ backgroundColor:  '#ffffff'}}>
      <h1 style={{color:'#000000',textAlign:'center'}}>Room Bookings</h1>
      <RoomBookingItems roomBooking={this.state.roomBooking} 
      isLoading={this.state.isLoading}  error={this.state.error}/>
      </div>
    );
  }
}

export default ViewRoomBookings;
