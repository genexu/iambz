import React from 'react';

const Register = () => {
  return (
    <div>
      <h3>Register</h3>
      <form>
        <div className="form-group">
          <input
            type="email"
            id="signinInputEmail"
            className="form-control"
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="signinInputPawword"
            className="form-control"
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="signinInputPawwordConfirm"
            className="form-control"
            placeholder="Password (Confirm)"
          />
        </div>
        <button type="submit" className="btn btn-outline-primary btn-block">Submit</button>
      </form>
    </div>
  );
};

export default Register;
