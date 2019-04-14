import React from 'react';
const update = (props) => {

    return (
  
      <form onSubmit={props.getUser}>
  
          <input style={{ margin:"20px auto", display:"block" }} type="text" name="name" placeholder="what do you want to change?" onChange={props.change}/>
          <input style={{ margin:"20px auto", display:"block" }} type="text" name="valuee" placeholder="your new value"/>
        <button className="btn btn-success btn-sm m-2">Submit</button>
  
      </form>
  
    );
  
  }
  export default update;