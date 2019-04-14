import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class ViewInfo extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      info: {},
      coID: this.props.match.params.coID,
     // rID: this.props.match.params.rID
      
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getList();
  }

  // Retrieves the list of items from the Express app
  getList = async() => {
    const coID = this.props.match.params.coID;
    //console.log(coID)
    const rID = this.props.match.params.rID;
   // console.log(rID)
    await fetch(`http://localhost:4000/api/coworkingSpace/viewCoworkingSpace/${coID}`)
    .then(res => res.json())
    .then(info=> this.setState({ info }));
    
  }
  render() {
    // console.log(this.state.info)
     const coID = this.props.match.params.coID;
    // console.log(this.props.match.params.coID)
       const rID = this.props.match.params.rID;
   //  console.log(rID)
     const { info } = this.state;
 
     return (
       <div className="App">
         <h1>Your Info</h1>
         {/* Check to see if any items are found*/}

           <div>
            
              
               {'name:'}
               <span>{info.name}</span> <br/>
               {'type: '}
               <span>{info.type}</span><br/>
               {'activation: '}
               <span>{''+info.activation}</span><br/>
               {'password: '}
               <span>{info.password}</span><br/>
               {'email: '}
               <span>{info.email}</span><br/>
               {'address: '}
               <span>{info.address}</span><br/>
               {'website: '}
               <span>{info.website}</span><br/>
               {'phoneNumber: '}
               <span>{info.phoneNumber}</span><br/>
               {'descriptin: '}
               <span>{info.description}</span><br/>

               <Link to={`/coworkingSpace/updateCospace/${coID}`}>
                    <button className="btn btn-primary btn-sm m-2">
                    Update info
                    </button>
              </Link>

           </div>
             </div>
             
          
           

      
      
      )
 
   }
 }
 
 export default ViewInfo;