import React from 'react';
import PropTypes from 'prop-types';

const AppointmentCard = (props) => {
  return (
    <div className="card w-100">
      <div className="card-header">{props.title}</div>
      <div className="card-body">
        <p className="card-text">{props.content}</p>
        <button
          type="button"
          className="btn btn-danger"
          onClick={props.appointmentCancle}
        >
          Cancle
        </button>
      </div>
    </div>
  );
};

AppointmentCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  appointmentCancle: PropTypes.func.isRequired,
};

export default AppointmentCard;
