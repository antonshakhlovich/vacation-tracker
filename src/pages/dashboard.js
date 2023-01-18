import React from 'react';
import PropTypes from 'prop-types';

export default function Dashboard({ status }) {
  return status ? (
    <div>
      <h2>Dashboard</h2>
    </div>
  ) : (
    <div> Please log in</div>
  );
}

Dashboard.propTypes = {
  status: PropTypes.bool,
};
