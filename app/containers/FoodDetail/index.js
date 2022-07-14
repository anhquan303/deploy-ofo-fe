/**
 *
 * FoodDetail
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
import makeSelectFoodDetail from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Box, Grid, IconButton, Container, Avatar, List, ListItemButton, ListItemText, TextField } from '@mui/material';
import Headerr from './../Headerr';
import { makeStyles, Button } from '@material-ui/core';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import CircleIcon from '@mui/icons-material/Circle';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Avatar1 from '../../images/quan.jpg';
import SearchBar from "material-ui-search-bar";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { getUser } from '../../utils/common';
import SendIcon from '@mui/icons-material/Send';
import { getFoodById } from './actions';


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
  star: {
    color: "#FFCD29"
  },
  font: {
    fontFamily: "sans-serif"
  },
  imgFood: {
    flexWrap: "wrap",
    alignContent: "center",
    display: "flex",
    justifyContent: "center"
  },
  center: {
    flexWrap: "wrap",
    alignContent: "center",
    display: "flex"
  },
  quantityNumber: {
    margin: "0 3px",
    flexWrap: "wrap",
    alignContent: "center",
    display: "flex"
  },
  storeInfo: {
    padding: "20px",
    border: "3px solid #000",
    borderRadius: "20px",
    marginTop: "15px"
  },
  foodType: {
    background: "#fff",
    padding: "10px",
    borderRadius: "20px",
    boxShadow: "0 2rem 3rem rgba(132, 139, 200, 0.18)",
    transition: "0.5s",
    height: "fit-content",
    width: "100%"
  }

}));

export function FoodDetail(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'foodDetail', reducer });
  useInjectSaga({ key: 'foodDetail', saga });

  const classes = useStyles();
  const [quantity, setQuantity] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [searched, setSearched] = useState("");
  const user = getUser();

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  }

  const decrementQuantity = () => {
    if (quantity != 0) {
      setQuantity(quantity - 1);
    }
  }

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

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


  console.log('here', props.location.state.item.id)

  useEffect(() => {
    const data = {
      id: props.location.state.item.id
    }
    dispatch(getFoodById(data))
  }, []);

  return (
    <div>
      <Headerr />
      <Container fixed>
        <Grid container spacing={2} >
          <Grid item xs={12} md={6} className={classes.imgFood}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN7rHMcnK0E9YocmOktrVKzdzeCgWg3oP04bIfqScZykQbYDs8m1e_qcnzzWNMLIG1ZZY&usqp=CAU" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button className={classes.btn} variant="outlined" startIcon={<ThumbUpIcon />}>
              Yêu thích
            </Button>
            <p className={classes.font}>{props.foodDetail.food ? props.foodDetail.food.name : null} - {props.foodDetail.food ? props.foodDetail.food.foodStore.name : null}</p>
            <p className={classes.font}>{props.location.state.item.address ? props.location.state.item.address : null} - Hòa Lạc</p>
            <div>
              <StarIcon className={classes.star} />
              <StarIcon className={classes.star} />
              <StarIcon className={classes.star} />
              <StarHalfIcon className={classes.star} />
              <StarBorderIcon className={classes.star} />
              <span>|</span><span style={{ margin: "0 5px" }}>999+ đánh giá</span>
              <span>|</span><span style={{ margin: "0 5px" }}>999+ đã bán</span>
            </div>
            <div style={{ margin: "10px 0" }} >
              <CircleIcon style={{ color: "#128B02", width: "10px", height: "10px" }} />
              <span style={{ margin: "0 5px" }}>Mở cửa {props.foodDetail.food ? props.foodDetail.food.foodStore.openTime : null} - {props.foodDetail.food ? props.foodDetail.food.foodStore.closeTime : null}</span>
            </div>
            <p style={{ fontFamily: "sans-serif", margin: "5px 0" }}>Giá bán {props.foodDetail.food ? props.foodDetail.food.price : null}</p>
            <div>
              <Grid container spacing={2} >
                <Grid item xs={12} md={6} className={classes.center}>
                  <span className={classes.center}>Số lượng</span>
                  <IconButton style={{ color: "#FF9900" }} onClick={decrementQuantity}>
                    <IndeterminateCheckBoxIcon />
                  </IconButton>
                  <span className={classes.quantityNumber}>{quantity}</span>
                  <IconButton style={{ color: "#FF9900" }} onClick={incrementQuantity}>
                    <AddBoxIcon />
                  </IconButton>
                </Grid>
                <Grid item xs={12} md={6} >
                  <Button className={classes.btn} variant="outlined" >
                    Thêm vào giỏ hàng
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
        <hr />

        <div className={classes.storeInfo}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={2} className={classes.center}>
                  <Avatar alt="avatar store" src={Avatar1} sx={{ width: 56, height: 56 }} />
                </Grid>
                <Grid item xs={12} md={10}>
                  <p style={{ margin: "0" }}>{props.foodDetail.food ? props.foodDetail.food.foodStore.name : null}</p>
                  <Button className={classes.btn} variant="outlined" startIcon={<ThumbUpIcon />}>
                    Yêu thích
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  Sản phẩm <span>12</span>
                </Grid>
                <Grid item xs={12} md={4}>
                  Đánh giá <span>12</span>
                </Grid>
                <Grid item xs={12} md={4}>
                  Tham gia từ <span>06/28/2022</span>
                </Grid>
                <Grid item xs={12} md={4}>
                  Người theo dõi <span>12</span>
                </Grid>
                <Grid item xs={12} md={4}>
                  Yêu thích <span>12</span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>

        <div style={{ marginTop: "5px" }}>
          <p className={classes.font} style={{ fontWeight: "bold", fontSize: "25px", margin: "0" }}>Menu</p>
          <Grid container spacing={0} style={{ marginTop: "5px" }}>
            <Grid item xs={12} md={3} style={{ padding: "10px" }}>
              <List component="nav" aria-label="secondary mailbox folder" className={classes.foodType}>
                <ListItemButton
                  selected={selectedIndex === 2}
                  onClick={(event) => handleListItemClick(event, 2)}
                >
                  <ListItemText primary="Món mới" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 3}
                  onClick={(event) => handleListItemClick(event, 3)}
                >
                  <ListItemText primary="Cơm suất" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 4}
                  onClick={(event) => handleListItemClick(event, 4)}
                >
                  <ListItemText primary="Phở" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 5}
                  onClick={(event) => handleListItemClick(event, 5)}
                >
                  <ListItemText primary="Bún" />
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 6}
                  onClick={(event) => handleListItemClick(event, 6)}
                >
                  <ListItemText primary="Đồ ăn vặt" />
                </ListItemButton>
              </List>
            </Grid>
            <Grid item xs={12} md={6} style={{ padding: "10px" }}>
              <div className={classes.foodType}>
                <SearchBar
                  value={searched}
                  onChange={(searchVal) => requestSearch(searchVal)}
                  onCancelSearch={() => cancelSearch()}
                  style={{ border: "1px solid #000" }}
                  placeholder="Tìm món"
                />
                <p className={classes.font} style={{ fontWeight: "bold", fontSize: "20px" }}>Món mới</p>
                <Grid container spacing={0}>
                  <Grid item xs={12} md={1} className={classes.center}>
                    <Avatar variant="rounded" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN7rHMcnK0E9YocmOktrVKzdzeCgWg3oP04bIfqScZykQbYDs8m1e_qcnzzWNMLIG1ZZY&usqp=CAU" />
                  </Grid>
                  <Grid item xs={12} md={8} >
                    <p style={{ margin: "0", fontFamily: "sans-serif" }}>Hambuger hơi ngon</p>
                    <p style={{ margin: "0", fontFamily: "sans-serif" }}>Đã bán: 999+ lần | <span><ThumbUpIcon /></span> 100+</p>
                  </Grid>
                  <Grid item xs={12} md={3} className={classes.center}>
                    <span className={classes.center} style={{ color: "#1168EB", fontWeight: "bold" }}>25.000 VND </span>
                    <IconButton style={{ color: "#FF9900" }} >
                      <AddBoxIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12} md={3} style={{ padding: "10px" }}>
              <div className={classes.foodType}>
                <p className={classes.font} style={{ fontWeight: "bold", fontSize: "20px", marginTop: "0", textAlign: "center" }}>
                  Đánh giá và bình luận
                </p>
                {/* <div style={{ textAlign: "center" }}>
                  <StarBorderIcon className={classes.star} />
                  <StarBorderIcon className={classes.star} />
                  <StarBorderIcon className={classes.star} />
                  <StarBorderIcon className={classes.star} />
                  <StarBorderIcon className={classes.star} />
                </div> */}
                <Grid container spacing={0}>
                  {/* <Grid item xs={12} md={10}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      {user ? <Avatar alt="avatar store" src={Avatar1} sx={{ width: 26, height: 26, marginRight: "3px" }} />
                        : <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />}
                      <TextField id="input-with-sx" label="Viết bình luận ..." variant="standard" />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={2} className={classes.center}>
                    <IconButton style={{ color: "#FF9900" }}>
                      <SendIcon />
                    </IconButton>
                  </Grid> */}

                  <Grid item xs={2} md={2} className={classes.center} style={{ height: "fit-content" }}>
                    <Avatar alt="avatar store" src={Avatar1} sx={{ width: 26, height: 26, marginRight: "3px" }} />
                  </Grid>
                  <Grid item xs={10} md={10}>
                    <p style={{ margin: "0" }}>Quan Anh</p>
                    <div >
                      <StarIcon className={classes.star} sx={{ width: 16, height: 16 }} />
                      <StarIcon className={classes.star} sx={{ width: 16, height: 16 }} />
                      <StarIcon className={classes.star} sx={{ width: 16, height: 16 }} />
                      <StarIcon className={classes.star} sx={{ width: 16, height: 16 }} />
                      <StarIcon className={classes.star} sx={{ width: 16, height: 16 }} />
                    </div>
                    <p className={classes.font} style={{ margin: "0" }}>Món ăn rất ngon, sẽ tiếp tục ủng hộ</p>
                    <img src="https://phunuketnoi.com/wp-content/uploads/2021/03/mon-ngon-moi-ngay.jpg" style={{ width: "100%" }} />
                    <p className={classes.font} style={{ margin: "0", color: "#AFAFAF", fontSize: "13px" }}>02-07-2022 11:17</p>
                  </Grid>
                </Grid>

                <Grid container spacing={0}>
                  <Grid item xs={2} md={2} className={classes.center} style={{ height: "fit-content" }}>
                    <Avatar alt="avatar store" src={Avatar1} sx={{ width: 26, height: 26, marginRight: "3px" }} />
                  </Grid>
                  <Grid item xs={10} md={10}>
                    <p style={{ margin: "0" }}>Long Le</p>
                    <div >
                      <StarIcon className={classes.star} sx={{ width: 16, height: 16 }} />
                      <StarIcon className={classes.star} sx={{ width: 16, height: 16 }} />
                      <StarIcon className={classes.star} sx={{ width: 16, height: 16 }} />
                      <StarIcon className={classes.star} sx={{ width: 16, height: 16 }} />
                      <StarHalfIcon className={classes.star} sx={{ width: 16, height: 16 }} />
                    </div>
                    <p className={classes.font} style={{ margin: "0" }}>Món ăn tạm được</p>
                    <img src="https://phunuketnoi.com/wp-content/uploads/2021/03/mon-ngon-moi-ngay.jpg" style={{ width: "100%" }} />
                    <p className={classes.font} style={{ margin: "0", color: "#AFAFAF", fontSize: "13px" }}>01-07-2022 07:57</p>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container >
    </div >
  );
}

FoodDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  foodDetail: makeSelectFoodDetail(),
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
)(FoodDetail);
