import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import CategoriesTree from '../../categories-tree/categories-tree';
import AddCategoryForm from '../../category-forms/add-category-from/add-category-form';
import { addInitCategory, filtrateTasks } from '../../../ducks/categories';
import TaskPanel from '../../tasks-panel/tasks-panel';
import EmptyPanel from '../../common/empty-panel/empty-panel';
import MainHeader from '../../main-header/main-header';
import './main-page.css';


class MainPage extends Component {
  getHint = () => (
    <EmptyPanel icon="folder">
      Select a category to view tasks
    </EmptyPanel>
  );

  filtrateTasks = ({ done = '', name = '' }) => {
    const { pathname } = this.props.location;
    const search = `done=${+done}&name=${name}`;

    this.props.filtrateTasks(pathname, search);
  };

  handleAddCategorySubmit = ({ name }) => {
    this.props.addInitCategory(name);
  };

  render() {
    return (
      <div className="main-page">
        <MainHeader filtrateTasks={this.filtrateTasks} />
        <section className="main-page__content">
          <div className="main-page__categories-panel">
            <AddCategoryForm onSubmit={this.handleAddCategorySubmit} />
            <CategoriesTree />
          </div>
          <div className="main-page__tasks-panel">
            <Switch>
              <Route path="/home/categories/:id" component={TaskPanel} />
              <Route path="/home/" render={this.getHint} />
            </Switch>
          </div>
        </section>
      </div>
    );
  }
}

MainPage.propTypes = {
  addInitCategory: PropTypes.func.isRequired,
  filtrateTasks: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default connect(null, { addInitCategory, filtrateTasks })(MainPage);
