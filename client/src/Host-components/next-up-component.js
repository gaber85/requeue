import React, {Component} from 'react';
import { connect } from "react-redux";

class NextUp extends Component {
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
        <div className="next-up-header">Next Up</div>
        <div className="next-up-table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Title</th>
                <th>Artist</th>
                <th>Album</th>
                <th>Requested</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><i className="fas fa-bars"></i></td>
                <td onClick={this.toggleLike}><i className={this.state.favorite ? "fas fa-heart" : "far fa-heart"}></i></td>
                <td>What's the Use?</td>
                <td>Mac Miller</td>
                <td>Swimming</td>
                <td>John</td>
                <td><i className="fas fa-ellipsis-h"></i></td>
                <td><i className="far fa-trash-alt"></i></td>
              </tr>
              <tr>
                <td><i className="fas fa-bars"></i></td>
                <td ><i className="far fa-heart"></i></td>
                <td>What's the Use?</td>
                <td>Mac Miller</td>
                <td>Swimming</td>
                <td>John</td>
                <td><i className="fas fa-ellipsis-h"></i></td>
                <td><i className="far fa-trash-alt"></i></td>
              </tr>
              <tr>
                <td><i className="fas fa-bars"></i></td>
                <td><i className="far fa-heart"></i></td>
                <td>What's the Use?</td>
                <td>Mac Miller</td>
                <td>Swimming</td>
                <td>John</td>
                <td><i className="fas fa-ellipsis-h"></i></td>
                <td><i className="far fa-trash-alt"></i></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // maps state to props
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  // maps dispatch actions to props
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NextUp);