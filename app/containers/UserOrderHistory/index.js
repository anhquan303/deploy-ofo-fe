/**
 *
 * UserOrderHistory
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUserOrderHistory from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function UserOrderHistory() {
  useInjectReducer({ key: 'userOrderHistory', reducer });
  useInjectSaga({ key: 'userOrderHistory', saga });

  return (
    <div>
      <Helmet>
        <title>UserOrderHistory</title>
        <meta name="description" content="Description of UserOrderHistory" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

UserOrderHistory.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userOrderHistory: makeSelectUserOrderHistory(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UserOrderHistory);
