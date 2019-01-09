import React, {Component} from 'react';
import StickyFooterUsers from './sticky-footer-users';

class ConnectedUsers extends Component {
  
  render() {
    return (
      <div className="next-up-section ">
        <div className="next-up-header">Connected Users</div>
        <div className="user-list">
          <ul>
            <li>
              Gabe Riera
            </li>
            <li>
              Gabe Riera
            </li>
          </ul>
        </div>
        <StickyFooterUsers />
      </div>
    );
  }
}

export default ConnectedUsers;