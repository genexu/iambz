import React from 'react';

const Signin = () => {
  return (
    <div>
      <h3>Signin to IAMBZ</h3>
      <form>
        <div className="form-group">
          <input type="email" className="form-control" id="signinInputEmail" placeholder="Email" />
        </div>
        <div className="form-group">
          <input type="password" className="form-control" id="signinInputPawword" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-outline-primary btn-block">Submit</button>
      </form>
    </div>
  )
}

export default Signin;
