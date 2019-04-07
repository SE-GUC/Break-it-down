import React, { Component } from 'react';

class List extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.getList();
  }

  // Retrieves the list of items from the Express app
  getList = async() => {
    const coID = this.props.match.params.coID;
    //console.log(this.props.match.params.coID)
    const rID = this.props.match.params.rID;
    //console.log(rID)
    await fetch(`http://localhost:4000/api/coworkingspace/viewroomschedule/${coID}/${rID}`)
    .then(res => res.json())
    .then(list => this.setState({ list }));
  //  console.log(this.state.list)
  }

  render() {
    const { list } = this.state;

    return (
      <div className="App">
        <h1>schedules</h1>
        {/* Check to see if any items are found*/}
        {list.length ? (
          <div>
            {/* Render the list of items */}
            {list.map((el) => {
              return <div key={el.id}>
              {'id: '}
              <span>{el.id}</span>
              {' Date: '}
              <span>{el.Date}</span>
              {' time: '}
              <span>{el.time}</span>
              {/* {' reserved: '}
              <span>{''+el.reserved}</span> */}
              {/* {' reservedBy: '}
              <span>{el.reservedBy.uid}</span> */}

           </div>
              
            })}
          </div>
        ) : (
          <div>
            <h2>No List Items Found</h2>
          </div>
        )
      }
      </div>
    );
  }
}

export default List;