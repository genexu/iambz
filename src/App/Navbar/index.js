import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../constants/actions';
import NavItem from './NavItam';

class Navbar extends Component {
  handleNavItem() {
    const rows = [];
    let item = [];
    if (this.props.uid !== '') {
      item = [
        { value: 'My Space', href: `/space/${this.props.uid}` },
      ];
      rows.push((
        <NavItem
          key="item-Logout"
          value="Logout"
          onClick={() => { this.props.onLogoutClick(); }}
        />
      ));
    } else {
      item = [
        { value: 'Signin', href: '/signin' },
        { value: 'Register', href: '/register' },
      ];
    }
    for (let i = 0; i < item.length; i += 1) {
      rows.unshift((
        <NavItem
          key={`item-${item[i].value}`}
          value={item[i].value}
          onClick={() => { this.props.router.push(item[i].href); }}
        />
      ));
    }
    return <ul className="navbar-nav ml-auto">{rows}</ul>;
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">IAMBZ</a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          { this.handleNavItem() }
        </div>
      </nav>
    );
  }
}


Navbar.propTypes = {
  uid: PropTypes.string.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  return {
    uid: state.appReducer.uid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutClick: () => {
      dispatch(actions.requestLogout());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
