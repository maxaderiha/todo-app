import React from 'react';
import PropTypes from 'prop-types';
import { trashO } from 'react-icons-kit/fa/trashO';
import { plusSquareO } from 'react-icons-kit/fa/plusSquareO';
import { pencilSquareO } from 'react-icons-kit/fa/pencilSquareO';
import { chevronDown } from 'react-icons-kit/fa/chevronDown';
import { folderO } from 'react-icons-kit/fa/folderO';
import { folderOpenO } from 'react-icons-kit/fa/folderOpenO';
import { search } from 'react-icons-kit/fa/search';
import { timesCircle } from 'react-icons-kit/fa/timesCircle';
import { reply } from 'react-icons-kit/fa/reply';
import Icon from 'react-icons-kit';


const icons = {
  del: trashO,
  add: plusSquareO,
  edit: pencilSquareO,
  down: chevronDown,
  folder: folderO,
  emptyFolder: folderOpenO,
  cross: timesCircle,
  move: reply,
  search,
};

function SpecIcon(props) {
  const {
    type,
    size,
    color,
    ...rest
  } = props;

  return (
    <div {...rest} style={{ color }}>
      <Icon icon={icons[type]} size={size} color="red" />
    </div>
  );
}

SpecIcon.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
};

SpecIcon.defaultProps = {
  size: 22,
  color: '#000000',
};


export default SpecIcon;
