/* eslint-disable react/jsx-no-comment-textnodes,jsx-a11y/label-has-for */
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SpecIcon from '../common/icon/icon';
import './filter.css';


function Filter({ handleSubmit, reset }) {
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="filter"
      >
        <label>
          <Field
            name="done"
            component="input"
            type="checkbox"
          />
          Show done
        </label>
        <div className="filter__search-wrap">
          <Field
            className="filter__search"
            name="name"
            component="input"
            type="text"
            placeholder="Search"
          />
          <input
            className="filter__btn"
            type="submit"
            value=""
          />
          <SpecIcon
            className="filter__cross-btn"
            type="cross"
            color="#FFFFFF"
            onClick={reset}
          />
        </div>
      </form>
    </div>
  );
}

Filter.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default connect(state => ({ search: state.router.location.search }))(reduxForm({
  form: 'filter',
  initialValues: { name: '', done: '' },
})(Filter));
