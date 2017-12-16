import React from 'react';
import PropTypes from 'prop-types';
import './error-field.css';


function ErrorField(props) {
  const {
    className,
    placeholder,
    input,
    type,
    meta: { error, active },
  } = props;

  const errorText = (input.value.length || active) && error && <span className="error">{error}</span>;
  return (
    <div className={`wrap ${className}`}>
      <input
        {...input}
        className="input"
        type={type}
        placeholder={placeholder}
      />
      {errorText}
    </div>
  );
}

ErrorField.propTypes = {
  className: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  input: PropTypes.object.isRequired,
  type: PropTypes.string,
  meta: PropTypes.object.isRequired,
};

ErrorField.defaultProps = {
  type: 'text',
  placeholder: '',
};

export default ErrorField;
