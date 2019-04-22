import React from 'react';
import { scaleRotate as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu right>
      <a className="menu-item" href="/admin">
        Home
      </a>
      <a className="menu-item" href="/admin/updates">
      View user updates
      </a>
      <a className="menu-item" href="/admin/mails">
      Mail Users to Sign Lirten Hub's Contract
      </a>
      <a className="menu-item" href="/admin/notifications">
      Notifications
      </a>
      <a className="menu-item" href="/admin/activate">
      Activate
      </a>
      <a className="menu-item" href="/admin/taskDescription">
      Task Descriptions
      </a>
    </Menu>
  );
};

