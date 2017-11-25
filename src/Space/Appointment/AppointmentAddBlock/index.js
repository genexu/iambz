import React from 'react';
import PropTypes from 'prop-types';

const AppointmentAddBlock = (props) => {
  return (
    <div id="AppointmentAddBlock">
      <p className="w-100 float-left text-center text-secondary">Make an appointment.</p>
      <button
        type="button"
        className="btn btn-outline-primary"
        data-toggle="modal"
        data-target="#AppointmentModal"
      >
        GO
      </button>
      <div className="modal fade" id="AppointmentModal" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Appointment</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Title"
                  onChange={props.titleTextFieldChange}
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  placeholder="Content"
                  onChange={props.textareaChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={props.appointmentSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AppointmentAddBlock.propTypes = {
  titleTextFieldChange: PropTypes.func.isRequired,
  textareaChange: PropTypes.func.isRequired,
  appointmentSubmit: PropTypes.func.isRequired,
};

export default AppointmentAddBlock;
