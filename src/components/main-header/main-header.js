/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Line } from 'rc-progress';
import progressSelector from './selector';
import Filter from '../filter/filter';
import './main-header.css';


function MainHeader({ progress, filtrateTasks }) {
  return (
    <div className="main-header">
      <Link to="/home" className="main-header__title">To-Do List</Link>
      <Filter onSubmit={filtrateTasks} />
      <Line
        className="progress-bar"
        percent={progress}
        strokeColor="#FFC107"
        trailColor="#0288D1"
        strokeLinecap="square"
      />
    </div>
  );
}

MainHeader.propTypes = {
  progress: PropTypes.number.isRequired,
  filtrateTasks: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ progress: progressSelector(state) });

export default connect(mapStateToProps)(MainHeader);
