import React from 'react';
import PropTypes from 'prop-types';
import { Pane } from 'evergreen-ui';

const ProgressBar = ({ progress }) => {
  let value;
  switch (progress) {
    case progress < 0:
      value = 0;
      break;
    case progress > 100:
      value = 100;
      break;
    default:
      value = progress;
  }
  const remainder = 100 - value;

  return (
    <Pane
      display="flex"
      width="300px"
      height="20px"
      borderRadius="30px"
      overflow="hidden"
    >
      <Pane width={`${value}%`} background="#47B881" />
      <Pane width={`${remainder}%`} background="tint2" />
    </Pane>
  );
};

export default ProgressBar;

ProgressBar.propTypes = {
  progress: PropTypes.number,
};

ProgressBar.defaultProps = {
  progress: 0,
};
