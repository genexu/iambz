import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import * as events from '../constants/events';
import { PORT } from '../config';
import AppointmentAddBlock from './Appointment/AppointmentAddBlock';
import AppointmentCard from './Appointment/AppointmentCard';
import AppointmentList from './Appointment/AppointmentList';

class Space extends Component {
  constructor(props) {
    super(props);
    const wl = window.location;
    this.state = {
      appointmentTitleTextField: '',
      appointmentTextarea: '',
      appointed: localStorage.getItem('appointment'),
      isSpaceOwner: this.props.params.uid === this.props.uid,
      appointmentList: [],
      connection: 0,
      isSpaceOwnerOnline: false,
    };
    this.socket = io(`${wl.protocol}//${wl.hostname}:${PORT}`, {
      autoConnect: false,
    });
    this.socket.on('error', (err) => {
      console.log(err);
    });
    this.socket.on(events.CLIENT_JOIN_ROOM, (res) => {
      if (this.state.isSpaceOwner) {
        this.socket.emit(events.SPACE_OWNER_GREETING, { id: res.id });
        this.socketRequestClientAppointment();
      }
      this.setState({
        connection: res.clientNumber,
      });
    });
    this.socket.on(events.CLIENT_LEAVE, (res) => {
      this.setState({
        connection: res.clientNumber,
      });
      if (this.state.isSpaceOwner) {
        this.socketRequestClientAppointment();
      }
    });
    this.socket.on(events.SPACE_OWNER_STATUS_CHANGE, (res) => {
      this.setState({
        isSpaceOwnerOnline: res.status,
      });
    });
    if (this.state.isSpaceOwner || this.state.appointed) {
      this.socket.open();
      this.socket.emit(events.CLIENT_JOIN_ROOM, { roomName: this.props.params.uid });
    }

    // Event - Client Only
    if (!this.state.isSpaceOwner) {
      this.socket.on(events.SPACE_OWNER_GREETING, () => {
        this.setState({
          isSpaceOwnerOnline: true,
        });
      });
      this.socket.on(events.REQUEST_CLIENT_APPOINTMENT, (res) => {
        if (!localStorage.getItem('appointment')) return;
        this.socket.emit(events.CLIENT_SUBMIT_APPOINTMENT, {
          receiver: res.sender,
          appointment: JSON.parse(localStorage.getItem('appointment')),
        });
      });
    }
    // Event End

    // Event - Space Owner Only
    if (this.state.isSpaceOwner) {
      this.socket.on('connect', () => {
        this.socketSpaceOwnerStatusChange(true);
      });
      this.socket.on('disconnect', () => {
        this.socketSpaceOwnerStatusChange(false);
      });
      window.onbeforeunload = () => {
        this.socketSpaceOwnerStatusChange(false);
      };
      this.socket.on(events.CLIENT_SUBMIT_APPOINTMENT, (res) => {
        this.state.appointmentList.push(res.appointment);
        this.setState({
          appointmentList: this.state.appointmentList,
        });
      });
    }
    // Event End
  }
  componentWillUnmount() {
    if (this.state.isSpaceOwner) {
      this.socketSpaceOwnerStatusChange(false);
    }
    this.socket.close();
  }
  socketRequestClientAppointment = () => {
    this.setState({ appointmentList: [] });
    this.socket.emit(events.REQUEST_CLIENT_APPOINTMENT, { roomName: this.props.uid });
  }
  socketSpaceOwnerStatusChange = (status) => {
    this.socket.emit(events.SPACE_OWNER_STATUS_CHANGE, {
      roomName: this.props.uid,
      status,
    });
  }
  handleAppointmentTitleTextFieldChange = (e) => {
    this.setState({
      appointmentTitleTextField: e.target.value,
    });
  }
  handleAppointmentTextareaChange = (e) => {
    this.setState({
      appointmentTextarea: e.target.value,
    });
  }
  handleAppointmentSubmit = () => {
    localStorage.setItem('appointment', JSON.stringify({
      title: this.state.appointmentTitleTextField,
      content: this.state.appointmentTextarea,
    }));
    this.setState({
      appointed: true,
    });
    this.socket.open();
    this.socket.emit(events.CLIENT_JOIN_ROOM, { roomName: this.props.params.uid });
  }
  handleAppointmentCancle = () => {
    localStorage.removeItem('appointment');
    this.setState({
      appointed: false,
      isSpaceOwnerOnline: false,
    });
    this.socket.close();
  }
  handleStateBlock = () => {
    const connectionMessage = this.state.appointed || this.state.isSpaceOwner ?
      <h3>{this.state.connection}</h3> :
      <p>Make a appointment to join the room.</p>;
    let spaceOwnerStatus = '--';
    if (this.state.isSpaceOwner || this.state.isSpaceOwnerOnline) {
      spaceOwnerStatus = 'Online';
    } else if (this.state.appointed) {
      spaceOwnerStatus = 'Offline';
    }
    return (
      <div className="card">
        <div className="card-body">
          <h5>Space Owner</h5>
          <p>{spaceOwnerStatus}</p>
          <hr />
          <h5>Connection</h5>
          {connectionMessage}
        </div>
      </div>
    );
  }
  handleReservationBlock = () => {
    if (this.state.isSpaceOwner) {
      return this.state.appointmentList.length !== 0 ? (
        <AppointmentList
          appointments={this.state.appointmentList}
        />
      ) : (
        <div className="alert alert-light" role="alert">
          There are no appointment received yet
        </div>
      );
    }
    if (this.state.appointed) {
      const appointment = JSON.parse(localStorage.getItem('appointment'));
      return (
        <AppointmentCard
          title={appointment.title}
          content={appointment.content}
          appointmentCancle={this.handleAppointmentCancle}
        />
      );
    }
    return (
      <AppointmentAddBlock
        titleTextFieldChange={this.handleAppointmentTitleTextFieldChange}
        textareaChange={this.handleAppointmentTextareaChange}
        appointmentSubmit={this.handleAppointmentSubmit}
      />
    );
  }
  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-12 col-sm-4 col-md-3">
          { this.handleStateBlock() }
        </div>
        <div className="col-12 col-sm-8 col-md-9">
          { this.handleReservationBlock() }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    uid: state.appReducer.uid,
  };
};

Space.propTypes = {
  params: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  uid: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Space);
