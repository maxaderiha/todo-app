import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  showModalForm,
  hideModalForm,
  editCategory,
  addNestedCategory,
  toggleCategory,
  deleteCategory,
} from '../../ducks/categories';
import CategoryList from '../categories-list/categories-list';
import SpecIcon from '../common/icon/icon';
import CategoryFormModal from '../category-forms/category-form-modal/category-form-modal';
import './category.css';


const options = {
  edit: {
    title: 'Edit category name',
    btnText: 'Edit',
  },
  'add-nested': {
    title: 'Add nested category',
    btnText: 'Add',
  },
};

class Category extends Component {
  state = {
    actionType: null,
  };

  getBody = () => {
    const { isOpen, subIds } = this.props.data;
    if (!isOpen) return null;
    return <CategoryList ids={subIds} type="main" />;
  };

  getModalForm = () => {
    const { id, isOpenModalForm } = this.props.data;
    const { actionType } = this.state;
    return !isOpenModalForm
      ? null
      : (
        <CategoryFormModal
          isOpen={isOpenModalForm}
          onSubmit={this.handleModalFormSubmit}
          handleClose={this.handleModalFormClose}
          options={options[actionType]}
          categoryId={id}
        />
      );
  };

  handleClick = () => {
    const { toggleCategory, data: { subIds, id } } = this.props;
    if (subIds.length) toggleCategory(id);
  };

  handleModalFormSubmit = ({ name }) => {
    const { data: { id }, editCategory, addNestedCategory } = this.props;
    const { actionType } = this.state;
    if (actionType === 'edit') {
      editCategory(name, id);
    } else if (actionType === 'add-nested') {
      addNestedCategory(name, id);
    }
  };

  handleModalFormOpen = (event) => {
    const { actionType } = event.currentTarget.dataset;
    const { data: { id }, showModalForm } = this.props;
    this.setState({ actionType });
    showModalForm(id);
  };

  handleModalFormClose = () => {
    const { data: { id }, hideModalForm } = this.props;
    hideModalForm(id);
  };

  handleDeleteCategory = () => {
    const { data: { id, isNew, parentId }, deleteCategory } = this.props;
    if (isNew) deleteCategory(id, parentId);
  };

  render() {
    const {
      name,
      subIds,
      isNew,
      id,
      isOpen,
    } = this.props.data;

    const iconClassName = isOpen ? 'icon-chevron_open' : 'icon-chevron_close';
    const downIcon = subIds.length
      ? (<SpecIcon
        className={`category__icon ${iconClassName}`}
        type="down"
        size={10}
        onClick={this.handleClick}
      />)
      : null;

    return (
      <div>
        <div className="category">
          {downIcon}
          <div className="category__left-thumb">
            <NavLink
              className="category__title"
              activeClassName="category__title_active"
              to={`/home/categories/${id}`}
            >
              {name}
            </NavLink>
            <SpecIcon
              className="category__icon icon-edit"
              type="edit"
              data-action-type="edit"
              onClick={this.handleModalFormOpen}
            />
          </div>
          <div className="category__right-thumb">
            {isNew
              ? <SpecIcon
                className="category__icon icon-del"
                type="del"
                onClick={this.handleDeleteCategory}
              />
              : null}
            <SpecIcon
              className="category__icon icon-add"
              type="add"
              data-action-type="add-nested"
              onClick={this.handleModalFormOpen}
            />
          </div>
          {this.getModalForm()}
        </div>
        {this.getBody()}
      </div>
    );
  }
}

Category.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    subIds: PropTypes.arrayOf(PropTypes.string),
    isNew: PropTypes.bool,
    isOpen: PropTypes.bool,
    isOpenModalForm: PropTypes.bool,
  }).isRequired,
  showModalForm: PropTypes.func.isRequired,
  hideModalForm: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired,
  addNestedCategory: PropTypes.func.isRequired,
  toggleCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
};

export default withRouter(connect(null, {
  showModalForm,
  hideModalForm,
  editCategory,
  addNestedCategory,
  toggleCategory,
  deleteCategory,
})(Category));
