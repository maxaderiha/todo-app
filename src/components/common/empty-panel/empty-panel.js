import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon/icon';
import './empty-panel.css';


function EmptyPanel(props) {
  const { color, icon } = props;
  return (
    <div className="empty-panel-wrap">
      <div className="empty-panel">
        <Icon type={icon} size={170} className="empty-panel__icon" color={color} />
        <span className="empty-panel__text">{props.children}</span>
      </div>
    </div>
  );
}

EmptyPanel.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};
EmptyPanel.defaultProps = {
  color: '#BDBDBD',
};

export default EmptyPanel;
