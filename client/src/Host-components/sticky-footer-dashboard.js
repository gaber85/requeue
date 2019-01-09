import React, {Component} from 'react';
import { Link } from "react-router-dom";

class StickyFooterDashboard extends Component {
  render() {
    return (
      <div className="sticky-footer">
        <div className="button"><Link to='/users'>Connected Users</Link></div>
        <div className="button"><Link to='/history'>History</Link></div>
      </div>
    );
  }
}

export default StickyFooterDashboard;