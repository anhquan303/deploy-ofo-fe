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
import {
  Box, Grid, Container, Avatar, Typography
} from '@mui/material';
import { makeStyles, Button, Fab, CardContent } from '@material-ui/core';
import SaveIcon from '@mui/icons-material/Save';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

const useStyles = makeStyles((theme) => ({
  btn: {
    position: "relative",
    width: "fit-content",
    borderRadius: "10px",
    backgroundColor: "#ff9900",
    margin: "10px 5px",
    "&:hover": {
      backgroundColor: "#FFA500",
      fontWeight: "bold",
      color: "#000",
      boxShadow: "2rem 2rem 3rem rgba(132, 139, 200, 0.18)",
    }
  },
  center: {
    flexWrap: "wrap",
    alignContent: "center",
    display: "flex"
  },
  font: {
    fontFamily: "sans-serif",
    margin: "0"
  },
  input: {
    display: "none"
  },
  text: {
    flexWrap: "wrap",
    alignContent: "center",
    display: "flex",
    justifyContent: "right",
    paddingRight: "10px",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    }
  },


}));

export function UserAddress() {
  useInjectReducer({ key: 'userAddress', reducer });
  useInjectSaga({ key: 'userAddress', saga });

  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={0} >
        <Grid item xs={6} md={6}>
          <div>
            <p className={classes.font} style={{ fontWeight: "500", fontSize: "25px" }}>Địa chỉ của tôi</p>
            <p className={classes.font} style={{ fontWeight: "lighter", fontSize: "15px" }}>Quản lý thông tin để bảo mật tài khoản</p>
          </div>
        </Grid>
        <Grid item xs={6} md={6} >
          <div style={{ textAlign: "right" }}>
            <Button className={classes.btn} variant="outlined" startIcon={<HomeRoundedIcon />}>
              Thêm địa chỉ
            </Button>
          </div>
        </Grid>
      </Grid>

      <hr />
      <Grid container spacing={0} >
        <Grid item xs={12} md={8}>
          <Grid container spacing={0} >
            <Grid item xs={3} md={3}>
              <p className={classes.font} style={{ fontWeight: "500", fontSize: "20px", color: "#7E7E7E", textAlign: "right" }}>Họ và tên</p>
            </Grid>
            <Grid item xs={9} md={9}>
              <p className={classes.font} style={{ fontWeight: "500", fontSize: "20px", color: "#000", textAlign: "left", paddingLeft: "10px" }}>Anh Quan</p>
            </Grid>
          </Grid>
          <Grid container spacing={0} >
            <Grid item xs={3} md={3}>
              <p className={classes.font} style={{ fontWeight: "500", fontSize: "20px", color: "#7E7E7E", textAlign: "right" }}>Số điện thoại</p>
            </Grid>
            <Grid item xs={9} md={9}>
              <p className={classes.font} style={{ fontWeight: "500", fontSize: "20px", color: "#000", textAlign: "left", paddingLeft: "10px" }}>0132465798</p>
            </Grid>
          </Grid>
          <Grid container spacing={0} >
            <Grid item xs={3} md={3}>
              <p className={classes.font} style={{ fontWeight: "500", fontSize: "20px", color: "#7E7E7E", textAlign: "right" }}>Địa chỉ</p>
            </Grid>
            <Grid item xs={9} md={9}>
              <p className={classes.font} style={{ fontWeight: "500", fontSize: "20px", color: "#000", paddingLeft: "10px" }}>Trọ Tuấn Cường 1, Thôn 3, Thạch Hòa, Thạch Thất</p>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4} className={classes.center} style={{ justifyContent: "right" }}>
          <div>
            <p style={{ textAlign: "right" }}><a href="#">Sửa</a></p>
            <Button className={classes.btn} variant="outlined" >
              Chọn mặc định
            </Button>
          </div>
        </Grid>
      </Grid>
      <hr />

    </div >
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
