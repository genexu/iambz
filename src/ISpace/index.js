import React, { Component } from 'react';
import io from 'socket.io-client';
import AppointmentAddBlock from './Appointment/AppointmentAddBlock';
import AppointmentCard from './Appointment/AppointmentCard';

class ISpace extends Component {
  constructor(props) {
    super(props);
    const socket = io.connect();
    console.log(socket);
    this.state = {
      appointmentTitleTextField: '',
      appointmentTextarea: '',
      appointed: localStorage.getItem('appointment'),
    };
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
    if (!this.state.appointed) {
      return (
        <AppointmentAddBlock
          titleTextFieldChange={this.handleAppointmentTitleTextFieldChange}
          textareaChange={this.handleAppointmentTextareaChange}
          appointmentSubmit={this.handleAppointmentSubmit}
        />
      );
    }
    const appointment = JSON.parse(localStorage.getItem('appointment'));
    return (
      <AppointmentCard
        title={appointment.title}
        content={appointment.content}
        appointmentCancle={this.handleAppointmentCancle}
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

export default ISpace;
