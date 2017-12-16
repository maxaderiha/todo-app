import React from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import ErrorField from '../../common/error-field/error-field';
import './add-task-form.css';

function AddTaskForm(props) {
  const { handleSubmit } = props;

  return (
    <div className="add-task-form-wrap">
      <form
        onSubmit={handleSubmit}
        className="add-task-form"
      >
        <Field
          name="name"
          component={ErrorField}
          className="add-task-form__input"
          placeholder="Enter task name"
        />
        <button
          type="submit"
          className="add-task-form__btn btn_fill"
        >
          Add
        </button>
      </form>
    </div>
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

AddTaskForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'newTask',
  validate,
})(AddTaskForm);
