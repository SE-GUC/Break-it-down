import React, {Component} from 'react';
import '../App.css';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux'
import {getTasks} from '../actions/TaskActions'
import PropTypes from 'prop-types'
import uuid from 'uuid'

class TaskList extends Component{

 componentDidMount(){
     this.props.getTasks();
 }
render(){
    const {tasks}= this.props.task;
    return(
     <div className='tasks'>
    <Container>
        <p> Tasks</p>
        <ListGroup>
            <TransitionGroup className="task-list">
           {tasks.map(({taskID,name,review,rate}) => (
               <CSSTransition key= {taskID} timeout={500} >
                <ListGroupItem className="task-item">
                    {name}{" "}{review}{" "}{rate}
                </ListGroupItem>
                </CSSTransition>
            ))}
            </TransitionGroup>
        </ListGroup>
    </Container>
    </div>   

    );
}

}

TaskList.propTypes={
 getTasks: PropTypes.func.isRequired,
 task:PropTypes.object.isRequired   //The state mapped to a prop
}
const mapStateToProps = (state) =>
({
    task: state.task
});

export default connect(mapStateToProps, {getTasks})(TaskList)