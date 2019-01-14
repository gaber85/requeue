import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Login-components/White.png';
import { connect } from 'react-redux';
import userImg from './user-image.png';

class NavBar extends Component {

  render() {
    const logo = Logo;
    const userPic = userImg;
    const { currentUser } = this.props.user;
    return (
      <div className="nav-bar">
        <img className="small-logo" alt="logo" src={logo}></img>
        <div className="user">
          <img className="user-image" src={currentUser.image ? currentUser.image : userPic} alt="user-profile"></img>
          <div className="user-name">{currentUser.name}</div>
          <div className="logout"><Link className="white-link" to="/">Logout</Link></div>
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
)(NavBar);