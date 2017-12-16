import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CategoriesTree from '../../categories-tree/categories-tree';
import EditTaskForm from '../../task-forms/edit-task-form/edit-task-form';
import { cancelEditTask, setEditTaskRecord, editTask, moduleName } from '../../../ducks/categories';
import './edit-page.css';


class EditPage extends Component {
  componentDidMount() {
    const { id, categoryId } = this.props.task;
    this.props.setEditTaskRecord(id, categoryId);
  }

  handleEditTaskSubmit = (values) => {
    const { task, editTask, newCatId } = this.props;
    editTask(newCatId, task.categoryId, task.id, values);
  };

  handleCancel = () => {
    this.props.cancelEditTask();
  };

  render() {
    const { task } = this.props;

    const initialValues = {
      name: task.name,
      done: task.done,
      description: task.description,
    };

    return (
      <article className="edit-page__wrap">
        <header className="edit-page__header">
          <h2 className="edit-page__title">{task.name}</h2>
        </header>
        <section className="edit-page__content">
          <div className="edit-page__categories-panel">
            <CategoriesTree type="edit" />
          </div>
          <div className="edit-page__form-panel">
            <EditTaskForm
              initialValues={initialValues}
              onSubmit={this.handleEditTaskSubmit}
              handleCancel={this.handleCancel}
            />
          </div>
        </section>
      </article>
    );
  }
}

EditPage.propTypes = {
  task: PropTypes.object.isRequired,
  newCatId: PropTypes.string,
  editTask: PropTypes.func.isRequired,
  cancelEditTask: PropTypes.func.isRequired,
  setEditTaskRecord: PropTypes.func.isRequired,
};

EditPage.defaultProps = {
  newCatId: null,
};

export default connect((state, ownProps) => {
  const { match: { params: { id } } } = ownProps;

  return {
    task: state[moduleName].tasks.get(id),
    newCatId: state[moduleName].edit.selectedCategoryId,
  };
}, { setEditTaskRecord, cancelEditTask, editTask })(EditPage);
