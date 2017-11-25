import React from 'react';
import PropTypes from 'prop-types';

const AppointmentList = (props) => {
  const appointmentItems = props.appointments.map((appointment) => {
    return (
      <div className="card w-100 mb-3">
        <div className="card-header">{appointment.title}</div>
        <div className="card-body">
          <p className="card-text">{appointment.content}</p>
        </div>
      </div>
    );
  });
  return (
    <div className="w-100">
      {appointmentItems}
    </div>
  );
};

AppointmentList.propTypes = {
  appointments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AppointmentList;
