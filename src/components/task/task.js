/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleDone } from '../../ducks/categories';
import SpecIcon from '../common/icon/icon';
import './task.css';


class Task extends Component {
  constructor(props) {
    super(props);

    this.handleIndicatorChange = this.handleIndicatorChange.bind(this);
  }

  handleIndicatorChange(event) {
    const { data: { id }, toggleDone } = this.props;
    toggleDone(id, event.target.checked);
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <article className="task">
          <div className="task__left-panel">
            <input
              className="task__done-indicator"
              type="checkbox"
              checked={data.done}
              onChange={this.handleIndicatorChange}
            />
            <h2 className="task__title">
              {data.name}
            </h2>
          </div>
          <Link to={`/edit-task/${data.id}`}>
            <SpecIcon
              className="task__icon icon-edit"
              type="edit"
            />
          </Link>
        </article>
      </div>
    );
  }
}

Task.propTypes = {
  toggleDone: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default connect(null, { toggleDone })(Task);
