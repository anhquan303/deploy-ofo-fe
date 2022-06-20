/**
 *
 * DashboardRegister
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
import makeSelectDashboardRegister from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { makeStyles } from '@material-ui/core';
import CustomTable from '../../components/CustomTable';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

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

export function DashboardRegister() {
  useInjectReducer({ key: 'dashboardRegister', reducer });
  useInjectSaga({ key: 'dashboardRegister', saga });

  const classes = useStyles();

  const newRegister = [
    { stt: 1, storeName: "Bun Bo", email: "abc@gmail.com", phone: "5656465", address: "thach that", registerAt: "04/08/2022" },
    { stt: 2, storeName: "Bun Bo Hue", email: "abc@gmail.com", phone: "5656465", address: "thach that", registerAt: "04/08/2022" },
    { stt: 3, storeName: "Bun Bo My", email: "abc@gmail.com", phone: "5656465", address: "thach that", registerAt: "04/08/2022" },
    { stt: 4, storeName: "Bun Bo Kobe", email: "abc@gmail.com", phone: "5656465", address: "thach that", registerAt: "04/08/2022" },
    { stt: 5, storeName: "Bun Bo Phap", email: "abc@gmail.com", phone: "5656465", address: "thach that", registerAt: "04/08/2022" },
    { stt: 6, storeName: "Bun Bo Anh", email: "abc@gmail.com", phone: "5656465", address: "thach that", registerAt: "04/08/2022" },
    { stt: 7, storeName: "Bun Bo Bi", email: "abc@gmail.com", phone: "5656465", address: "thach that", registerAt: "04/08/2022" },
    { stt: 8, storeName: "Bun Bo Nga", email: "abc@gmail.com", phone: "5656465", address: "thach that", registerAt: "04/08/2022" }
  ];

  const columns = [
    { title: "STT", field: "stt" },
    { title: "Store Name", field: "storeName" },
    { title: "Email", field: "email" },
    { title: "Phone", field: "phone" },
    { title: "Address", field: "address" },
    { title: "Register At", field: "registerAt" },
  ];

  return (
    <div style={{ paddingRight: "15px" }}>
      {/* <DashboardHeader text="Dashboard" /> */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item sm={12} xs={12}>
            <div className={classes.information_image}>
              <h2>New Register: 18</h2>
            </div>
          </Grid>
          <Grid item sm={12} xs={12}>
            <CustomTable data={newRegister} itemPerPage={5} totalItem={newRegister.length} detailPage="dashboard" columns={columns} />
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
