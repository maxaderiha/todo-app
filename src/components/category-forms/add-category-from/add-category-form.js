import React from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import ErrorField from '../../common/error-field/error-field';
import './add-category-form.css';


function AddCategoryForm({ handleSubmit }) {
  return (
    <div className="category-form-wrap">
      <form
        onSubmit={handleSubmit}
        className="add-category-form"
      >
        <Field
          name="name"
          component={ErrorField}
          className="add-category-form__input"
          placeholder="Enter category title"
        />
        <button
          type="submit"
          className="add-category-form__btn btn_fill"
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

AddCategoryForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'newCategory',
  validate,
})(AddCategoryForm);
