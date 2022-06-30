/**
 *
 * SellerHomePage
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
import makeSelectSellerHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function SellerHomePage() {
  useInjectReducer({ key: 'sellerHomePage', reducer });
  useInjectSaga({ key: 'sellerHomePage', saga });

  return (
    <div>
      <Helmet>
        <title>SellerHomePage</title>
        <meta name="description" content="Description of SellerHomePage" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

SellerHomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sellerHomePage: makeSelectSellerHomePage(),
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
)(SellerHomePage);
