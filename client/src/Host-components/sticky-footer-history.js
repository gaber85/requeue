import React, {Component} from 'react';
import { Link } from "react-router-dom";

class StickyFooterHistory extends Component {
  render() {
    return (
      <div className="sticky-footer">
        <div className="button"><Link to='/users'>Connected User</Link></div>
        <div className="button"><Link to='/'>Dashboard</Link></div>
      </div>
    );
  }
}

export default StickyFooterHistory;