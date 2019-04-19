import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class ViewRoom extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      room: [],
      coID: this.props.match.params.coID,
      rID: this.props.match.params.rID
      
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
    await fetch(`/api/coworkingSpace/viewRoom/${coID}/${rID}`)
    .then(res => res.json())
    .then(room=> this.setState({ room }));
    
  }

  render() {
   // console.log(this.state.room)
    const coID = this.props.match.params.coID;
   // console.log(this.props.match.params.coID)
    const rID = this.props.match.params.rID;
  //  console.log(rID)
    const { room } = this.state;

    return (
      <div className="App">
        <h1>Room</h1>
        {/* Check to see if any items are found*/}
        {room.length ? (
          <div>
            {room.map((el) => {
              return <div key={el.rooms.id}>
              {'id:'}
              <span>{el.rooms.id}</span> <br/>
              {'Capacity: '}
              <span>{el.rooms.capacity}</span><br/>
              <Link  to={`/coworkingSpace/viewRoomSchedule/${coID}/${rID}`}>
        <button className="btn btn-danger btn-sm m-2">
            View schedule
        </button>
      </Link>

      <Link to={`/coworkingSpace/createSchedule/${coID}/${rID}`}>
        <button type="submit" className="btn btn-success btn-sm m-2">Create a schedule</button>
      </Link>
          </div>
            })}
            </div>
            )
          : (
          <div>
            <h2>No room is found.</h2>
          </div>
        )
          }
      </div>
     
     )

  }
}

export default ViewRoom;