import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { moduleName } from '../../../ducks/categories';
import ErrorField from '../../common/error-field/error-field';
import './category-form-modal.css';


function CategoryFormModal(props) {
  const {
    handleSubmit,
    handleClose,
    isOpen,
    options,
  } = props;

  if (!isOpen) return null;
  const { btnText, title } = options;

  return (
    <div className="modal-category-form-overlay">
      <form
        onSubmit={handleSubmit}
        className="modal-category-form"
      >
        <h2>{title}</h2>
        <Field
          name="name"
          component={ErrorField}
          className="modal-category-form__input"
        />
        <div className="modal-category-form__btn-thumb">
          <button
            className="modal-category-form__btn btn"
            onClick={handleClose}
            type="button"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="modal-category-form__btn btn_fill"
          >
            {btnText}
          </button>
        </div>
      </form>
    </div>
  );
}

const validate = ({ name }) => {
  const errors = {};
  let value = name;

  if (name instanceof Array && name.length) {
    [value] = name;
  }

  if (!value) errors.name = 'Is required';
  else {
    if (value.length < 3) errors.name = 'short name';
    if (value.length > 15) errors.name = 'long name';
  }

  return errors;
};

const mapStateToProps = (state, ownProps) => {
  const { categoryId } = ownProps;

  const { name } = state[moduleName].categories.get(categoryId);

  return {
    initialValues: { name },
  };
};

CategoryFormModal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  options: PropTypes.object.isRequired,
};

export default compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'categoryModal',
    validate,
  }),
)(CategoryFormModal);
