import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TaskList from '../tasks-list/tasks-list';
import AddTaskForm from '../task-forms/add-task-form/add-task-form';
import { addTask } from '../../ducks/categories';
import './tasks-panel.css';


class TasksPanel extends Component {
  handelAddTaskSubmit = ({ name }) => {
    const { match: { params: { id } }, addTask } = this.props;
    addTask(id, name);
  };

  render() {
    const { location: { search }, match: { params: { id } } } = this.props;

    return (
      <div className="tasks-panel">
        <AddTaskForm onSubmit={this.handelAddTaskSubmit} />
        <TaskList id={id} search={search} />
      </div>
    );
  }
}

TasksPanel.propTypes = {
  addTask: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default connect(null, { addTask })(TasksPanel);
