/**
 *
 * SellerOrderDetail
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
import makeSelectSellerOrderDetail from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  Box, Grid, Container, Avatar, Typography, List, FormControlLabel, Radio, RadioGroup,
  ListItemButton, ListItemIcon, ListItemText, Collapse, OutlinedInput, Select, MenuItem
} from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import DeliveryDiningRoundedIcon from '@mui/icons-material/DeliveryDiningRounded';

const useStyles = makeStyles((theme) => ({
  font: {
    fontFamily: "sans-serif",
    margin: "0"
  },
  center: {
    flexWrap: "wrap",
    alignContent: "center",
    display: "flex",
    justifyContent: "center"
  },
  text: {
    fontFamily: "sans-serif",
    margin: "0",
    fontSize: "15px",
    fontWeight: "700",
  },
  content: {
    border: "3px solid #000",
    padding: "10px",
    borderRadius: "10px"
  },
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
  borderBot: {
    borderBottom: "1px solid #000"
  }

}));

export function SellerOrderDetail(props) {
  useInjectReducer({ key: 'sellerOrderDetail', reducer });
  useInjectSaga({ key: 'sellerOrderDetail', saga });

  const classes = useStyles();

  console.log(props)

  return (
    <div style={{ padding: "10px" }}>
      <p className={classes.font} style={{ fontSize: "35px", fontWeight: "700" }}> Mã đơn hàng <span style={{ color: "#0000EE" }}>#132132</span></p>
      <Grid container spacing={0} >
        <Grid item xs={12} md={7} style={{ padding: "10px" }}>
          <div>
            table list order food
          </div>

          <div className={classes.content} style={{ marginTop: "10px" }}>
            <p className={classes.font} style={{ fontSize: "30px", fontWeight: "700" }}>Thông tin khách hàng và đơn hàng</p>
            <Grid container spacing={0} className={classes.borderBot}>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ fontSize: "20px", }}>Tên</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ textAlign: "right", fontSize: "20px", }}>Anh Quan</p>
              </Grid>
            </Grid>
            <Grid container spacing={0} className={classes.borderBot}>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ fontSize: "20px", }}>Số điện thoại</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ textAlign: "right", fontSize: "20px", }}>0123465789</p>
              </Grid>
            </Grid>
            <Grid container spacing={0} className={classes.borderBot}>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ fontSize: "20px", }}>Phương thức thanh toán</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ textAlign: "right", fontSize: "20px", }}>Thanh toán khi nhận hàng</p>
              </Grid>
            </Grid>
            <Grid container spacing={0} >
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ fontSize: "20px", }}>Ghi chú</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ textAlign: "right", fontSize: "20px", }}>N/A</p>
              </Grid>
            </Grid>
          </div>

        </Grid>
        <Grid item xs={12} md={5} style={{ padding: "10px" }}>
          <div className={classes.content}>
            <p className={classes.font} style={{ fontSize: "20px", fontWeight: "700" }}>Tóm tắt đơn hàng</p>
            <Grid container spacing={0} >
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text}>Đơn hàng được tạo</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ textAlign: "right" }}>04/07/2022</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text}>Thời gian đặt hàng</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ textAlign: "right" }}>08:26</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text}>Giá trị đơn hàng</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ textAlign: "right" }}>215.000 VND</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text}>Phí vận chuyển</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ textAlign: "right" }}>0 VND</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text}>Voucher</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ textAlign: "right" }}>Không</p>
              </Grid>
            </Grid>
          </div>

          <div className={classes.content} style={{ marginTop: "10px" }}>
            <Grid container spacing={0} >
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text}>Tổng thanh toán</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ textAlign: "right" }}>215.000 VND</p>
              </Grid>
            </Grid>
          </div>

          <div className={classes.content} style={{ marginTop: "10px" }}>
            <p className={classes.font} style={{ fontSize: "20px", fontWeight: "700" }}>Địa chỉ giao hàng</p>
            <Grid container spacing={0} >
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text}>Dorm </p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ textAlign: "right" }}>A</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text}>Phòng</p>
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: "10px" }}>
                <p className={classes.text} style={{ textAlign: "right" }}>A123R</p>
              </Grid>
            </Grid>
          </div>
          <div style={{ textAlign: "center" }}>
            <Button className={classes.btn} variant="outlined" startIcon={<DeliveryDiningRoundedIcon />}>
              Giao hàng
            </Button>
          </div>
        </Grid>
      </Grid>
    </div >
  );
}

SellerOrderDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sellerOrderDetail: makeSelectSellerOrderDetail(),
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
)(SellerOrderDetail);
