import React, {Component} from 'react';

class StickyFooter extends Component {
  render() {
    return (
      <div className="sticky-footer">
        <div className="button">Connected User</div>
        <div className="button">History</div>
      </div>
    );
  }
}

export default StickyFooter;