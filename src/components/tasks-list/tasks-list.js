import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import tasksSelector from './selector';
import Task from '../task/task';
import EmptyPanel from '../common/empty-panel/empty-panel';
import './task-list.css';


function TasksList({ tasks, search }) {
  const listElements = tasks.map(task => <li key={task.id} className="tasks-list__item"><Task data={task} /></li>);
  const emptyPanelMessage = search ? 'No tasks found' : 'Nothing to show. Add new task';

  return (
    <div className="tasks-list-wrap">
      {listElements.length
        ? <ul className="tasks-list">{listElements}</ul>
        : <EmptyPanel icon="emptyFolder">{emptyPanelMessage}</EmptyPanel>}
    </div>
  );
}

TasksList.propTypes = {
  tasks: PropTypes.array.isRequired,
  search: PropTypes.string,
};

TasksList.defaultProps = {
  search: '',
};

export default connect((state, ownProps) => ({ tasks: tasksSelector(state, ownProps) }))(TasksList);
