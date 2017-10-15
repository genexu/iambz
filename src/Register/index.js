import React from 'react';

const Register = () => {
  return (
    <div>
      <h3>Register</h3>
      <form>
        <div className="form-group">
          <input type="email" className="form-control" id="signinInputEmail" placeholder="Email" />
        </div>
        <div className="form-group">
          <input type="password" className="form-control" id="signinInputPawword" placeholder="Password" />
        </div>
        <div className="form-group">
          <input type="password" className="form-control" id="signinInputPawwordConfirm" placeholder="Password (Confirm)" />
        </div>
        <button type="submit" className="btn btn-outline-primary btn-block">Submit</button>
      </form>
    </div>
  )
}

export default Register;
