import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import AppointmentAddBlock from './Appointment/AppointmentAddBlock';
import AppointmentCard from './Appointment/AppointmentCard';
import AppointmentList from './Appointment/AppointmentList';

class ISpace extends Component {
  constructor(props) {
    super(props);
    const wl = window.location;
    this.state = {
      appointmentTitleTextField: '',
      appointmentTextarea: '',
      appointed: localStorage.getItem('appointment'),
      isSpaceOwner: this.props.params.uid === this.props.uid,
      appointmentList: [],
    };
    this.socket = io(`${wl.protocol}//${wl.hostname}:3001`, {
      autoConnect: false,
    });
    this.socket.on('error', (err) => {
      console.log(err);
    });
    this.socket.on('APPOINTMENT_SUBMIT_ONDER', (res) => {
      if (!localStorage.getItem('appointment')) return;
      this.socket.emit('SUBMIT_APPOINTMENT', {
        receiver: res.sender,
        appointment: JSON.parse(localStorage.getItem('appointment')),
      });
    });
    this.socket.on('RECEIVE_APPOINTMENT', (res) => {
      this.state.appointmentList.push(res.appointment);
      this.setState({
        appointmentList: this.state.appointmentList,
      });
    });
    if (this.state.isSpaceOwner || this.state.appointed) {
      this.socket.open();
      this.socket.emit('JOIN_ROOM', { roomName: this.props.params.uid });
    }
    if (this.state.isSpaceOwner) {
      this.socket.emit('REQUEST_CLIENT_APPOINTMENT', { roomName: this.props.uid });
    }
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
  }
  handleAppointmentCancle = () => {
    localStorage.removeItem('appointment');
    this.setState({
      appointed: false,
    });
  }
  handleReservationBlock = () => {
    if (this.state.isSpaceOwner) {
      return (
        <AppointmentList
          appointments={this.state.appointmentList}
        />
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
      <div className="row justify-content-center pt-3">
        { this.handleReservationBlock() }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    uid: state.appReducer.uid,
  };
};

ISpace.propTypes = {
  params: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  uid: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(ISpace);
