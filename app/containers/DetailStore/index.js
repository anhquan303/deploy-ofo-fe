/**
 *
 * DetailStore
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
import makeSelectDetailStore from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export function DetailStore() {
  useInjectReducer({ key: 'detailStore', reducer });
  useInjectSaga({ key: 'detailStore', saga });

  return (
    <>
      <h1>Dashboard</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs="auto">
            <img src="" />
          </Grid>
          <Grid item xs="auto">
            <p>2</p>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

DetailStore.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  detailStore: makeSelectDetailStore(),
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
)(DetailStore);
