/**
 *
 * DashboardStore
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDashboardStore from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import CustomTable from '../../components/CustomTable';
import { getAllStore } from './actions';

export function DashboardStore(props) {
  const {dispatch, listStore} = props;
  useInjectReducer({ key: 'dashboardStore', reducer });
  useInjectSaga({ key: 'dashboardStore', saga });

  console.log('list', props.dashboardStore.listStore)
  useEffect(() => {
    dispatch(getAllStore());
  },[])

  const header = ["1", "2", "3", "4", "5"]
  
  return (
    <div style={{marginRight: "10px"}}>
      <h1>Manager Store</h1>
      {props.dashboardStore.listStore ?  <CustomTable data={props.dashboardStore.listStore} itemPerPage={3} totalItem={props.dashboardStore.listStore.length} header={header} detailPage="detailStore"/> : <></>}
     
    </div>
  );
}

DashboardStore.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboardStore: makeSelectDashboardStore(),
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
)(DashboardStore);
