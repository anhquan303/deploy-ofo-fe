/**
 *
 * DashboardStore
 *
 */

import React, { memo, useEffect, useState } from 'react';
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
import SearchBar from "material-ui-search-bar";
import DashboardHeader from '../../components/DashboardHeader';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export function DashboardStore(props) {
  const { dispatch, listStore } = props;
  useInjectReducer({ key: 'dashboardStore', reducer });
  useInjectSaga({ key: 'dashboardStore', saga });

  console.log('list', props.dashboardStore.listStore)
  useEffect(() => {
    dispatch(getAllStore());
  }, [])

  const header = ["1", "2", "3", "4", "5"]
  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    // const filteredRows = originalRows.filter((row) => {
    //   return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    // });
    // setRows(filteredRows);
  };

  const cancelSearch = () => {
    // setSearched("");
    // requestSearch(searched);
  };

  const columns = [
    { title: "ID", field: "id" },
    { title: "Owner", field: "user.username" },
    { title: "Name", field: "name" },
    { title: "Slogan", field: "slogan" },
    { title: "Status", field: "status" },
  ]
  return (
    <>
      {/* <div style={{ marginRight: "10px" }}>
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        {props.dashboardStore.listStore ? <CustomTable data={props.dashboardStore.listStore} itemPerPage={3} totalItem={props.dashboardStore.listStore.length} detailPage="store" columns={columns} /> : <></>}

      </div> */}

      <div style={{ paddingRight: "15px" }}>
        {/* <DashboardHeader text="Dashboard" /> */}
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0}>
            <Grid item sm={12} xs={12}>
              <SearchBar
                value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              {props.dashboardStore.listStore ? <CustomTable data={props.dashboardStore.listStore} itemPerPage={3} totalItem={props.dashboardStore.listStore.length} detailPage="store" columns={columns} /> : <></>}
            </Grid>
          </Grid>

        </Box>
      </div>
    </>
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
