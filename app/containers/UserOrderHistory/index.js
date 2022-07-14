/**
 *
 * UserOrderHistory
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
import makeSelectUserOrderHistory from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Box, Grid, TextField, Container, Avatar } from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import SearchBar from "material-ui-search-bar";
import { NavLink } from 'react-router-dom';

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
  font: {
    fontFamily: "sans-serif",
    margin: "0"
  },
  center: {
    flexWrap: "wrap",
    alignContent: "center",
    display: "flex",
    justifyContent: "right"
  },
  link: {
    textDecoration: "none",
  },


}));
export function UserOrderHistory() {
  useInjectReducer({ key: 'userOrderHistory', reducer });
  useInjectSaga({ key: 'userOrderHistory', saga });

  const classes = useStyles();
  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    // const filteredRows = props.dashboardStore.listStore.filter((row) => {
    //   return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    // });
    // setData(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <>
      <div>
        <div>
          <p className={classes.font} style={{ fontWeight: "500", fontSize: "25px" }}>Lịch sử mua hàng</p>
          <p className={classes.font} style={{ fontWeight: "lighter", fontSize: "15px" }}>Quản lý thông tin để bảo mật tài khoản</p>
        </div>
        <hr />
        <Grid item xs={12} md={12} sm={12} style={{ margin: "20px 0" }}>
          <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
            placeholder="Tìm kiếm theo tên shop hoặc tên sản phẩm"
          />
        </Grid>

        <div style={{ border: "1px solid #000", padding: "10px", margin: "10px 0" }}>
          <Grid container spacing={0} style={{ padding: "10px" }}>
            <Grid item xs={12} md={6} sm={12}>
              <span style={{ marginRight: " 10px", fontWeight: "400", fontSize: "20px" }}>tên quán</span>
              <Button className={classes.btn} variant="outlined">
                Xem Store
              </Button>
            </Grid>
            <Grid item xs={12} md={6} sm={12} className={classes.center} style={{ color: "#20D167", fontWeight: "400", fontSize: "20px" }}>
              Giao hàng thành công
            </Grid>
          </Grid>
          <hr />
          <Grid container spacing={0} style={{ padding: "10px" }}>
            <Grid item xs={12} md={6} sm={12}>
              <Grid container spacing={0} style={{ padding: "10px" }}>
                <Grid item xs={12} md={2} sm={12}>
                  <Avatar variant="square" src="https://i.ytimg.com/vi/A_o2qfaTgKs/maxresdefault.jpg" />
                </Grid>
                <Grid item xs={12} md={10} sm={12}>
                  Bún Bò Huế <br />
                  x2
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} sm={12} className={classes.center}>
              40.000 VND
            </Grid>
          </Grid>

          <Grid container spacing={0} style={{ padding: "10px" }}>
            <Grid item xs={12} md={6} sm={12}>
              <Grid container spacing={0} style={{ padding: "10px" }}>
                <Grid item xs={12} md={2} sm={12}>
                  <Avatar variant="square" src="https://i.ytimg.com/vi/A_o2qfaTgKs/maxresdefault.jpg" />
                </Grid>
                <Grid item xs={12} md={10} sm={12}>
                  Quẩy <br />
                  x10
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} sm={12} className={classes.center}>
              5.000 VND
            </Grid>
          </Grid>
          <hr />

          <Grid container spacing={0} style={{ padding: "10px" }}>
            <Grid item xs={12} md={6} sm={12}>
              <Button href="/user/rating-comment" className={classes.btn} variant="outlined">
                Đánh giá
              </Button>
            </Grid>
            <Grid item xs={12} md={6} sm={12} className={classes.center}>
              Tổng số tiền: 130.000 VND
            </Grid>
          </Grid>
        </div>

        <div style={{ border: "1px solid #000", padding: "10px", margin: "10px 0" }}>
          <Grid container spacing={0} style={{ padding: "10px" }}>
            <Grid item xs={12} md={6} sm={12}>
              <span style={{ marginRight: " 10px", fontWeight: "400", fontSize: "20px" }}>tên quán</span>
              <Button className={classes.btn} variant="outlined">
                Xem Store
              </Button>
            </Grid>
            <Grid item xs={12} md={6} sm={12} className={classes.center} style={{ color: "#FE0000", fontWeight: "400", fontSize: "20px" }}>
              Đã hủy
            </Grid>
          </Grid>
          <hr />

          <NavLink to="/user/order-history/asd" className={classes.link}>
            <Grid container spacing={0} style={{ padding: "10px" }}>
              <Grid item xs={12} md={6} sm={12}>
                <Grid container spacing={0} style={{ padding: "10px" }}>
                  <Grid item xs={12} md={2} sm={12}>
                    <Avatar variant="square" src="https://i.ytimg.com/vi/A_o2qfaTgKs/maxresdefault.jpg" />
                  </Grid>
                  <Grid item xs={12} md={10} sm={12}>
                    Bún Bò Huế <br />
                    x2
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6} sm={12} className={classes.center}>
                40.000 VND
              </Grid>
            </Grid>
          </NavLink>

          <Grid container spacing={0} style={{ padding: "10px" }}>
            <Grid item xs={12} md={6} sm={12}>
              <Grid container spacing={0} style={{ padding: "10px" }}>
                <Grid item xs={12} md={2} sm={12}>
                  <Avatar variant="square" src="https://i.ytimg.com/vi/A_o2qfaTgKs/maxresdefault.jpg" />
                </Grid>
                <Grid item xs={12} md={10} sm={12}>
                  Quẩy <br />
                  x10
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} sm={12} className={classes.center}>
              5.000 VND
            </Grid>
          </Grid>
          <hr />

          <Grid container spacing={0} style={{ padding: "10px" }}>
            <Grid item xs={12} md={6} sm={12} style={{ color: "#FE0000" }}>
              Bạn đã hủy đơn hàng
            </Grid>
            <Grid item xs={12} md={6} sm={12} className={classes.center}>
              Tổng số tiền: 130.000 VND
            </Grid>
          </Grid>
        </div>

      </div >
      {/* <FormattedMessage {...messages.header} /> */}
    </>
  );
}

UserOrderHistory.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userOrderHistory: makeSelectUserOrderHistory(),
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
)(UserOrderHistory);
