import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NavItem extends Component {
  constructor(props) {
    super(props);
    this.value = this.props.value;
  }
  render() {
    return (
      <li className="nav-item">
        <a className="nav-link" {...this.props}>
          {this.value}
        </a>
      </li>
    );
  }
}

NavItem.propTypes = {
  value: PropTypes.string.isRequired,
};

export default NavItem;
