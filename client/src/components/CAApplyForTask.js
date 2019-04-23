import React, {Component} from 'react';
import '../App.css';
import {Container, ListGroup, ListGroupItem, Button,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux'
import {getTasks,getAvailableTasks} from '../actions/TaskActions'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import CASidenav from './BasicSideNavBar';
import axios from 'axios';

class CAApply extends Component{

    constructor(props) {
        super(props);
        this.state = {
          modal: false,

        }
        this.toggle = this.toggle.bind(this)

    }

    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }

 onApplication=(pid,taskID)=>{
     axios.put("/api/ConsultancyAgency/apply/"+pid+"/"+taskID)
     .then(
         this.toggle(), 
      
     )

     
}
componentWillMount(){
    this.props.getAvailableTasks();

}


render(){
    const {tasks}= this.props.task;
    console.log(tasks)
    return(
     <div className='tasks'>
     <CASidenav/>
    <Container>
        <h1> Available Tasks</h1>
        <br></br>
        <ListGroup>
            <TransitionGroup className="task-list">
           {tasks.map(({taskID,name,description,pid,pname}) => (
               <CSSTransition key= {taskID} timeout={500} >
                <ListGroupItem className="task-item">
                  <h5> {name}</h5>  Description:{" "} {description}{" "} <br></br>
                  Offered by:{" "} {pname}{" "} <br></br>
                  <Button block onClick={this.onApplication.bind(this,pid,taskID)}>Apply</Button>
                </ListGroupItem>
                </CSSTransition>
            ))}
            </TransitionGroup>
        </ListGroup>
    </Container>
    
    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} centered>
          <ModalBody>
           Application Successful :)
            </ModalBody>
        </Modal>

    </div>   

    );
}

}

CAApply.propTypes={
 getTasks: PropTypes.func.isRequired,
 task:PropTypes.object.isRequired   //The state mapped to a prop
}
const mapStateToProps = (state) =>
({
    task: state.task
});

export default connect(mapStateToProps, {getTasks,getAvailableTasks})(CAApply)