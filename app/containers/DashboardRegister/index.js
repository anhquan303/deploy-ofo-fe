/**
 *
 * DashboardRegister
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
import makeSelectDashboardRegister from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { makeStyles } from '@material-ui/core';
import CustomTable from '../../components/CustomTable';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { fetchListRegister } from './actions';

const useStyles = makeStyles((theme) => ({
  information_image: {
    background: "#fff",
    padding: "10px",
    borderRadius: "20px",
    margin: "0 auto",
    boxShadow: "0 2rem 3rem rgba(132, 139, 200, 0.18)",
    transition: "0.5s",
    height: "fit-content",
    backgroundSize: "cover",
    width: "fit-content",
  },


}));

export function DashboardRegister(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'dashboardRegister', reducer });
  useInjectSaga({ key: 'dashboardRegister', saga });

  const classes = useStyles();
  const action = false;
  const columns = [
    { title: "ID", field: "id" },
    { title: "Store Name", field: "name" },
    { title: "Owner", field: `[user.username]` },
    { title: "Phone", field: "phoneNumber" },
    { title: "Status", field: "status" },
  ];

  useEffect(() => {
    dispatch(fetchListRegister());
  }, []);


  return (
    <div style={{ paddingRight: "15px" }}>
      {/* <DashboardHeader text="Dashboard" /> */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item sm={12} xs={12}>
            <div className={classes.information_image}>
              <h2>New Register: {props.dashboardRegister.registerList.length}</h2>
            </div>
          </Grid>
          <Grid item sm={12} xs={12}>
            <CustomTable data={props.dashboardRegister.registerList} itemPerPage={5} totalItem={props.dashboardRegister.registerList.length} detailPage="register" columns={columns} action={action} />
          </Grid>
        </Grid>

      </Box>
    </div>
  );
}

DashboardRegister.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboardRegister: makeSelectDashboardRegister(),
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
)(DashboardRegister);
