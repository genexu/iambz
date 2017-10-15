import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import './style.css'

const App = ({ children }) => {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        { children }
      </div>
    </div>
  );
}

App.defaultProps = {
  children: <div>Children</div>,
};

App.propTypes = {
  children: PropTypes.element,
};


export default App;
