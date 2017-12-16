/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import ErrorField from '../../common/error-field/error-field';
import './edit-task-form.css';


function EditTaskForm(props) {
  const { handleSubmit, handleCancel } = props;

  return (
    <form
      onSubmit={handleSubmit}
      className="edit-task-form"
    >
      <div className="edit-task-form__btn-panel">
        <button
          type="submit"
          className="edit-task-form__btn btn_fill"
        >
          Save changes
        </button>
        <button
          type="button"
          className="edit-task-form__btn btn"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
      <Field
        className="edit-task-form__input"
        name="name"
        component={ErrorField}
      />
      <label
        className="edit-task-form__indicator"
      >
        <Field
          name="done"
          component="input"
          type="checkbox"
        />
        Done
      </label>
      <Field
        className="edit-task-form__textarea"
        name="description"
        component="textarea"
      />
    </form>
  );
}

const validate = ({ name }) => {
  const errors = {};

  if (!name) errors.name = 'Is required';
  else {
    if (name.length < 3) errors.name = 'short name';
    if (name.length > 30) errors.name = 'long name';
  }

  return errors;
};

EditTaskForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'editTask',
  validate,
})(EditTaskForm);
