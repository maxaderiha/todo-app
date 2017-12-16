import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CategoryList from '../categories-list/categories-list';
import SpecIcon from '../common/icon/icon';
import { moduleName, toggleCategory, changeSelectedCatId } from '../../ducks/categories';
import './edit-mode-category.css';


class EditModeCategory extends Component {
  getBody = () => {
    const { isOpen, subIds } = this.props.data;
    if (!isOpen) return null;
    return <CategoryList ids={subIds} type="edit" />;
  };

  handleClick = () => {
    const { toggleCategory, data: { subIds, id } } = this.props;
    if (subIds.length) toggleCategory(id);
  };

  handleChangeCategory = () => {
    const { data: { id }, changeSelectedCatId } = this.props;
    changeSelectedCatId(id);
  };

  render() {
    const {
      name,
      subIds,
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
        <div className="edit-mode-category">
          {downIcon}
          <h2 className="edit-mode-category__title">
            {name}
          </h2>
          {id === this.props.currCatId
            ? null
            : <SpecIcon
              className="category__icon icon-move"
              type="move"
              onClick={this.handleChangeCategory}
            />}
        </div>
        {this.getBody()}
      </div>
    );
  }
}

EditModeCategory.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    subIds: PropTypes.arrayOf(PropTypes.string),
    isNew: PropTypes.bool,
    isOpen: PropTypes.bool,
    isOpenModalForm: PropTypes.bool,
  }).isRequired,
  currCatId: PropTypes.string,
  toggleCategory: PropTypes.func.isRequired,
  changeSelectedCatId: PropTypes.func.isRequired,
};

EditModeCategory.defaultProps = {
  currCatId: null,
};

export default connect(state => ({
  currCatId: state[moduleName].edit.selectedCategoryId,
}), { toggleCategory, changeSelectedCatId })(EditModeCategory);
