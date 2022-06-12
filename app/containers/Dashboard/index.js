/**
 *
 * Dashboard
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
import makeSelectDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import StoreIcon from '@mui/icons-material/Store';
import PersonIcon from '@mui/icons-material/Person';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import './dashboard.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { makeStyles, Container, Typography } from '@material-ui/core';


import { getData } from './actions';
import CustomTable from '../../components/CustomTable';
import Avatar from '@mui/material/Avatar';
import Avatar1 from '../../images/quan.jpg';


const useStyles = makeStyles((theme) => ({
  hello: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    }
  },
  firstText: {
    color: "#7e7e7e",
    fontWeight: "700",
    fontSize: "18px"
  },
  secondText: {
    color: "#000",
    fontWeight: "700",
    fontSize: "18px"
  },
  secondLine: {
    color: "#1168EB",
    fontWeight: "700",
    fontSize: "18px",
    float: "right"
  },
  avatar: {
    padding: "30px 0",
    [theme.breakpoints.down("sm")]: {
      padding: "25px 0",
    }
  }

}));

export function Dashboard(props) {
  const { dispatch, userList } = props;
  useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga });

  console.log(props.dashboard.userList)

  useEffect(() => {
    dispatch(getData());
  }, [])

  const classes = useStyles();
  return (
    <div style={{ paddingRight: "15px" }}>
      <Grid container spacing={3}>
        <Grid item sm={10} xs={10}>
          <h1>Dashboard</h1>
        </Grid>
        <Grid item sm={2} xs={2}>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12} className={classes.hello}>
              <div style={{ padding: "30px 0" }}>
                <div style={{ margin: "0" }} >
                  <span className={classes.firstText}>Hello,</span> <span className={classes.secondText}>Quan</span>
                </div>
                <div style={{ margin: "0" }}>
                  <span className={classes.secondLine}>Admin</span>
                </div>
              </div>
            </Grid>
            <Grid item sm={6} xs={12} >
              <div className={classes.avatar}>
                <Avatar alt="Quan Nguyen" src={Avatar1} />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item sm={4} xs={12}>
            <div className="total">
              <span style={{ background: "#0D31F0" }}><StoreIcon /></span>
              <div className="middle">
                <div className="left">
                  <h3>Total Stores</h3>
                  <h1>230</h1>
                </div>
                {/* <div className="progress">
                  <svg>
                    <circle cx="38" cy="38" r="36"></circle>
                  </svg>
                  <div className="number"><p>81%</p></div>
                </div> */}
              </div>
              <small className="text-muted">Last 24 hours</small>
            </div>
          </Grid>
          <Grid item sm={4} xs={12}>
            <div className="total">
              <span style={{ background: "#ff9900" }}><PersonIcon /></span>
              <div className="middle">
                <div className="left">
                  <h3>Total Users</h3>
                  <h1>230</h1>
                </div>
                {/* <div className="progress">
                  <svg>
                    <circle cx="38" cy="38" r="36"></circle>
                  </svg>
                  <div className="number"><p>81%</p></div>
                </div> */}
              </div>
              <small className="text-muted">Last 24 hours</small>
            </div>
          </Grid>
          <Grid item sm={4} xs={12}>
            <div className="total">
              <span style={{ background: "#20D167" }}><FastfoodIcon /></span>
              <div className="middle">
                <div className="left">
                  <h3>Total Foods</h3>
                  <h1>230</h1>
                </div>
                {/* <div className="progress">
                  <svg>
                    <circle cx="38" cy="38" r="36"></circle>
                  </svg>
                  <div className="number"><p>81%</p></div>
                </div> */}
              </div>
              <small className="text-muted">Last 24 hours</small>
            </div>
          </Grid>
          <Grid item sm={12} xs={12}>
            <p>Table</p>
            {/* <CustomTable /> */}
          </Grid>
        </Grid>

      </Box>
    </div>
  );
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
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
)(Dashboard);
