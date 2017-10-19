import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../constants/actions';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailTextFieldValue: '',
      passwordTextFieldValue: '',
    };
    this.handleEmailTextFieldChange = this.handleEmailTextFieldChange.bind(this);
    this.handlePasswordTextFieldChange = this.handlePasswordTextFieldChange.bind(this);
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
  handleMessageAlertBlock() {
    if (this.props.message === '') {
      return 'none';
    }
    return 'block';
  }
  render() {
    return (
      <div>
        <h3>Signin to IAMBZ</h3>
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
              className="form-control"
              id="signinInputEmail"
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
          <button
            type="button"
            className="btn btn-outline-primary btn-block"
            disabled={this.props.onProgress}
            onClick={() => {
              this.props.onSubmitClick(
                this.state.emailTextFieldValue,
                this.state.passwordTextFieldValue,
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
    onProgress: state.signinReducer.onProgress,
    message: state.signinReducer.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitClick: (email, password) => {
      dispatch(actions.requestSignin({ email, password }));
    },
  };
};

Signin.propTypes = {
  message: PropTypes.string.isRequired,
  onProgress: PropTypes.bool.isRequired,
  onSubmitClick: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
