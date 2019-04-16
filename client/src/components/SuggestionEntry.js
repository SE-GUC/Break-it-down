import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SuggestionEntry extends Component {
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
            {(this.props.cospace.name===undefined?"Coworking Space: unknown name ":"Coworking Space: "+this.props.cospace.name)}<br/>
            {(this.props.cospace.email===undefined?"Email: unknown ":"Email: "+this.props.cospace.email)}<br/>
            {(this.props.cospace.address===undefined?"Address: unknown ":"Address: "+this.props.cospace.address)}<br/>
            {(this.props.cospace.website===undefined?"Website: unknown ":"Website: "+this.props.cospace.website)}<br/>
            {(this.props.cospace.phoneNumber===undefined?"Phone number: unknown ":"Phone number: "+this.props.cospace.phoneNumber)}<br/>
            {(this.props.cospace.description===undefined?"Description: unknown ":"Description: "+this.props.cospace.description)}<br/>
            {(this.props.cospace.facilities===undefined?"Facilities: unknown ":"Facilities: "+this.props.cospace.facilities)}<br/>
            {(this.props.cospace.rooms===undefined?"Rooms: unknown ":"Rooms : "+this.props.cospace.rooms.map((room) =>
                "Capacity: "+ (room.capacity===undefined?"unknown": room.capacity)
                +(room.schedule===undefined?"":room.schedule.map((slot)=>
                "     Reserved: "+(slot.reserved===true?"Yes    ":"No    ")+
                "     Date: "+(slot.Date===undefined?"unknown":slot.Date)+
                "     Time: "+(slot.time===undefined?"unknown":slot.time)+"........."
                ))
                ))}<br/>

             </p>
        </div>
    )
  }
}

SuggestionEntry.propTypes= {
    cospace: PropTypes.object.isRequired
}


export default SuggestionEntry;
