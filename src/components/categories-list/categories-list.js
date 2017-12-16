import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import categoriesSelector from './selector';
import Category from '../category/category';
import EditModeCategory from '../edit-mode-category/edit-mode-category';
import './categories-list.css';


const components = {
  main: Category,
  edit: EditModeCategory,
};

function CategoriesList({ categories, type }) {
  const SpecificCategory = components[type];
  const listItems = categories.map(category => (
    <li
      className="categories-list__item"
      key={category.id}
    >
      <SpecificCategory data={category} />
    </li>
  ));

  return <ul className="categories-list">{listItems}</ul>;
}

CategoriesList.propTypes = {
  categories: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  categories: categoriesSelector(state, ownProps),
});

export default withRouter(connect(mapStateToProps)(CategoriesList));
