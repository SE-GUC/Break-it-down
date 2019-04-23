import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import BellIcon from 'react-bell-icon';
import { Icon } from 'semantic-ui-react'

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/partner">
      <Icon name="home" />
        Home
      </a>

      <a className="menu-item" href={`/myProfile`}>
      <Icon name="address card" />
        My profile
      </a>

      <a className="menu-item" href={`/createTask`}>
      <Icon name="plus circle" /> 
        Create a Task      </a>

      <a className="menu-item" href={`/myTasks`}>
      <Icon name="tasks" />  
       My Tasks
      </a>

      <a className="menu-item" href={`/roombookings`}>
      <Icon name="calendar alternate outline" />   
        My Room Bookings
      </a>

      <a className="menu-item" href={`./partnerviewCoworkingSpace`}>
      <Icon name="calendar plus" />    
        Book A Room
      </a>

      <a className="menu-item" href={`/getNotifications`}>
      <BellIcon width='40'  active={true} animate={true}  />
       Notifications
      </a>

    </Menu>
  );
};

