/**
 *
 * UserDetailOrder
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUserDetailOrder from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Box, Grid, Container, Avatar } from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  btn: {
    position: "relative",
    width: "fit-content",
    borderRadius: "10px",
    backgroundColor: "#ff9900",
    margin: "0 10px",
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
    display: "flex",
    justifyContent: "right"
  },
  font: {
    fontFamily: "sans-serif",
    margin: "0"
  },


}));

export function UserDetailOrder() {
  useInjectReducer({ key: 'userDetailOrder', reducer });
  useInjectSaga({ key: 'userDetailOrder', saga });

  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={0} style={{ padding: "10px" }}>
        <Grid item xs={6} md={6} sm={6}>
          <Button className={classes.btn} variant="outlined">
            Trở lại
          </Button>
        </Grid>
        <Grid item xs={6} md={6} sm={6} className={classes.center} style={{ justifyContent: "right" }}>
          <span style={{ fontWeight: "700", fontSize: "20px" }}>ID đơn hàng:</span>
          <span style={{ fontWeight: "700", fontSize: "20px", color: "#1168EB", margin: "0 10px" }}>#13213123</span>
          <span style={{ fontWeight: "700", fontSize: "20px", color: "#FE0000" }}>Đơn hàng đã hủy</span>
        </Grid>
      </Grid>
      <hr />
      <Grid container spacing={0} style={{ padding: "10px" }}>
        <Grid item xs={12} md={4} sm={12} style={{ padding: "10px" }}>
          <div style={{ border: "1px solid #000", padding: "10px" }}>
            <p className={classes.font} style={{ fontWeight: "700", fontSize: "20px" }}>Địa chỉ nhận hàng</p>
            <p className={classes.font} style={{ fontWeight: "700", fontSize: "16px", margin: "10px 0" }}>Anh Quan</p>
            <p className={classes.font} style={{ fontWeight: "700", fontSize: "16px", margin: "10px 0" }}>0132468798</p>
            <p className={classes.font} style={{ fontWeight: "700", fontSize: "16px", margin: "10px 0" }}>Trọ Tuấn Cường 1, Thôn 3, Thạch Hòa, Thạch Thất</p>
          </div>
        </Grid>
        <Grid item xs={12} md={8} sm={12} style={{ padding: "10px" }}>
          <div style={{ border: "1px solid #000", padding: "10px" }}>
            <div>
              <span>Gốc sung quán</span>
              <Button className={classes.btn} variant="outlined">
                Xem quán
              </Button>
            </div>
            <hr />

            <Grid container spacing={0} style={{ padding: "10px" }}>
              <Grid item xs={12} md={6} sm={12}>
                <Grid container spacing={0} style={{ padding: "10px" }}>
                  <Grid item xs={12} md={3} sm={12}>
                    <Avatar variant="square" src="https://i.ytimg.com/vi/A_o2qfaTgKs/maxresdefault.jpg" />
                  </Grid>
                  <Grid item xs={12} md={9} sm={12}>
                    Bún Bò Huế <br />
                    x2
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6} sm={12} className={classes.center}>
                40.000 VND
              </Grid>
            </Grid>

            <hr />

            <Grid container spacing={0} style={{ padding: "10px" }}>
              <Grid item xs={6} md={6} sm={6}>
                <Button className={classes.btn} variant="outlined">
                  Đánh giá
                </Button>
              </Grid>
              <Grid item xs={6} md={6} sm={6} className={classes.center}>
                Tổng số tiền: 80.000 VND
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <hr />
      <div>
        <Grid container spacing={0} style={{ padding: "10px" }}>
          <Grid item xs={6} md={6} sm={6}>
            <span style={{ fontSize: "20px", fontWeight: "700" }}>Tổng tiền hàng</span>
          </Grid>
          <Grid item xs={6} md={6} sm={6} className={classes.center}>
            <span style={{ fontSize: "20px", fontWeight: "700" }}>80.000 VND</span>
          </Grid>
        </Grid>
      </div>
      <hr />
      <div>
        <Grid container spacing={0} style={{ padding: "10px" }}>
          <Grid item xs={6} md={6} sm={6}>
            <span style={{ fontSize: "20px", fontWeight: "700" }}>Phí vận chuyển</span>
          </Grid>
          <Grid item xs={6} md={6} sm={6} className={classes.center}>
            <span style={{ fontSize: "20px", fontWeight: "700" }}>0 VND</span>
          </Grid>
        </Grid>
      </div>
      <hr />
      <div>
        <Grid container spacing={0} style={{ padding: "10px" }}>
          <Grid item xs={6} md={6} sm={6}>
            <span style={{ fontSize: "20px", fontWeight: "700" }}>Voucher từ quán</span>
          </Grid>
          <Grid item xs={6} md={6} sm={6} className={classes.center}>
            <span style={{ fontSize: "20px", fontWeight: "700" }}>- 0 VND</span>
          </Grid>
        </Grid>
      </div>
      <hr />
      <div>
        <Grid container spacing={0} style={{ padding: "10px" }}>
          <Grid item xs={6} md={6} sm={6}>
            <span style={{ fontSize: "20px", fontWeight: "700" }}>Tổng thanh toán</span>
          </Grid>
          <Grid item xs={6} md={6} sm={6} className={classes.center}>
            <span style={{ fontSize: "20px", fontWeight: "700" }}>80.000 VND</span>
          </Grid>
        </Grid>
      </div>
      <hr />
      <div>
        <Grid container spacing={0} style={{ padding: "10px" }}>
          <Grid item xs={6} md={6} sm={6}>
            <span style={{ fontSize: "20px", fontWeight: "700" }}>Phương thức thanh toán</span>
          </Grid>
          <Grid item xs={6} md={6} sm={12} className={classes.center}>
            <span style={{ fontSize: "20px", fontWeight: "700" }}>Thanh toán khi nhận hàng</span>
          </Grid>
        </Grid>
      </div>
    </div >
  );
}

UserDetailOrder.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userDetailOrder: makeSelectUserDetailOrder(),
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
)(UserDetailOrder);
