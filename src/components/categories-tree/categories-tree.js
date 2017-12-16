import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CategoriesList from '../categories-list/categories-list';
import initIdsSelector from './selector';
import './categories-tree.css';


function CategoriesTree({ initIds, type }) {
  return (
    <div className="categories-tree">
      <CategoriesList ids={initIds} type={type} />
    </div>
  );
}

CategoriesTree.propTypes = {
  initIds: PropTypes.array.isRequired,
  type: PropTypes.string,
};

CategoriesTree.defaultProps = {
  type: 'main',
};

export default withRouter(connect(state => ({ initIds: initIdsSelector(state) }))(CategoriesTree));
