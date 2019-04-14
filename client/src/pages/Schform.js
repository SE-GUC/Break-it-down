import React from 'react';
const schform = (props) => {

    return (
  
      <form onSubmit={props.getUser}>
  
          <input style={{ margin:"20px auto", display:"block" }} type="number" name="id" placeholder="scheduleNumber"/>
          <input style={{ margin:"20px auto", display:"block" }} type="date" name="Date" placeholder="Date"/>
          <input style={{ margin:"20px auto", display:"block" }} type="number" name="time" placeholder="time"/>
        <button className="btn btn-success btn-sm m-2">Submit</button>
  
      </form>
  
    );
  
  }
  export default schform;