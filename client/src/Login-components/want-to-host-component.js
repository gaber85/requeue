import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class WantToHost extends Component {

  render () {
    const { codeWord } = this.props.user.playlist;
    return (
      <div className="landing-page-container">
        <div className="intro-button green"><Link className="white-link"  to="/dashboard">OK</Link></div>
        <div className="host-title">Users can join your queue with:</div>
        <div className="intro-button">{codeWord}</div>
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
)(WantToHost);