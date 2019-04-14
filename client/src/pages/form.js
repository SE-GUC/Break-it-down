import React from 'react';



const UserForm = (props) => {
//console.log(window.location.pathname.split("/").pop());
  return (

    <form onSubmit={props.getUser}>

        <input style={{ margin:"20px auto", display:"block" }} id="id" type="text" name="id" placeholder="Room Number" onChange={props.change}/>
        <input style={{ margin:"20px auto", display:"block" }} type="text" name="capacity" placeholder="capacity"/>

      <button className="btn btn-success btn-sm m-2">Submit</button>


    </form>
  
  );
  

}



export default UserForm;