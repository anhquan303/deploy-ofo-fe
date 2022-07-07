/**
 *
 * UserAddress
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
import makeSelectUserAddress from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function UserAddress() {
  useInjectReducer({ key: 'userAddress', reducer });
  useInjectSaga({ key: 'userAddress', saga });

  return (
    <div>
      <Helmet>
        <title>UserAddress</title>
        <meta name="description" content="Description of UserAddress" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

UserAddress.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userAddress: makeSelectUserAddress(),
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
)(UserAddress);
