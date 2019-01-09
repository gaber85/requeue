import React, {Component} from 'react';
import StickyFooterHistory from './sticky-footer-history';

class History extends Component {
  constructor (props) {
    super (props);
    this.state = {
      favorite: false,
    }
  }
  toggleLike = () => {
    this.setState({favorite: !this.state.favorite});
  }
  render() {
    return (
      <div className="next-up-section">
        <div className="next-up-header">History</div>
        <div className="user-list">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Artist</th>
                <th>Album</th>
                <th>Requested</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td onClick={this.toggleLike}><i className={this.state.favorite ? "fas fa-heart" : "far fa-heart"}></i></td>
                <td>What's the Use?</td>
                <td>Mac Miller</td>
                <td>Swimming</td>
                <td>John</td>
                <td><i className="fas fa-ellipsis-h"></i></td>
              </tr>
              <tr>
                <td ><i className="far fa-heart"></i></td>
                <td>What's the Use?</td>
                <td>Mac Miller</td>
                <td>Swimming</td>
                <td>John</td>
                <td><i className="fas fa-ellipsis-h"></i></td>
              </tr>
              <tr>
                <td><i className="far fa-heart"></i></td>
                <td>What's the Use?</td>
                <td>Mac Miller</td>
                <td>Swimming</td>
                <td>John</td>
                <td><i className="fas fa-ellipsis-h"></i></td>
              </tr>
            </tbody>
          </table>
        </div>
        <StickyFooterHistory />
      </div>
    );
  }
}

export default History;