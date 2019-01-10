import React, {Component} from 'react';
import { Link } from "react-router-dom";

class StickyFooterUsers extends Component {
  render() {
    return (
      <div className="sticky-footer">
        <div className="button"><Link className="black-link" to='/dashboard'>Dashboard</Link></div>
        <div className="button"><Link className="black-link" to='/history'>History</Link></div>
      </div>
    );
  }
}

export default StickyFooterUsers;