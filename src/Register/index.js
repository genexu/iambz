import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../constants/actions';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailTextFieldValue: '',
      passwordTextFieldValue: '',
      confirmTextFieldValue: '',
    };
    this.handleEmailTextFieldChange = this.handleEmailTextFieldChange.bind(this);
    this.handlePasswordTextFieldChange = this.handlePasswordTextFieldChange.bind(this);
    this.handleConfirmTextFieldChange = this.handleConfirmTextFieldChange.bind(this);
  }
  handleEmailTextFieldChange(e) {
    this.setState({
      emailTextFieldValue: e.target.value,
    });
  }
  handlePasswordTextFieldChange(e) {
    this.setState({
      passwordTextFieldValue: e.target.value,
    });
  }
  handleConfirmTextFieldChange(e) {
    this.setState({
      confirmTextFieldValue: e.target.value,
    });
  }
  handleMessageAlertBlock() {
    if (this.props.message === '') {
      return 'none';
    }
    return 'block';
  }
  render() {
    return (
      <div>
        <h3>Register</h3>
        <div
          className="alert alert-danger"
          role="alert"
          style={{ display: this.handleMessageAlertBlock() }}
        >
          { this.props.message }
        </div>
        <form>
          <div className="form-group">
            <input
              type="email"
              id="signinInputEmail"
              className="form-control"
              placeholder="Email"
              onChange={this.handleEmailTextFieldChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="signinInputPawword"
              className="form-control"
              placeholder="Password"
              onChange={this.handlePasswordTextFieldChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="signinInputPawwordConfirm"
              className="form-control"
              placeholder="Password (Confirm)"
              onChange={this.handleConfirmTextFieldChange}
            />
          </div>
          <button
            type="button"
            className="btn btn-outline-primary btn-block"
            disabled={this.props.onProgress}
            onClick={() => {
              this.props.onSubmitClick(
                this.state.emailTextFieldValue,
                this.state.passwordTextFieldValue,
                this.state.confirmTextFieldValue,
              );
            }}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    onProgress: state.registerReducer.onProgress,
    message: state.registerReducer.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitClick: (email, password, passwordConfirm) => {
      if (password !== passwordConfirm) {
        dispatch(actions.registerPreValidateFailure({ message: 'Please comfirm your password.' }));
      } else {
        dispatch(actions.requestRegister({ email, password }));
      }
    },
  };
};

Register.propTypes = {
  message: PropTypes.string.isRequired,
  onProgress: PropTypes.bool.isRequired,
  onSubmitClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
