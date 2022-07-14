/**
 *
 * Payment
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
import makeSelectPayment from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Payment() {
  useInjectReducer({ key: 'payment', reducer });
  useInjectSaga({ key: 'payment', saga });

  return (
    <div>
      <Helmet>
        <title>Payment</title>
        <meta name="description" content="Description of Payment" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Payment.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  payment: makeSelectPayment(),
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
)(Payment);
