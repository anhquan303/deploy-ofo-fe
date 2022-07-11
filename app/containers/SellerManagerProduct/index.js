/**
 *
 * SellerManagerProduct
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
import makeSelectSellerManagerProduct from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import CustomTable from '../../components/CustomTable';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
import { Box, TextField, Grid } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { makeStyles, Button } from '@material-ui/core';
import { fetchListFood, searchFood } from './actions';
import { getStore } from '../../utils/common';
import CustomTableResponsive from '../../components/CustomTableResponsive';

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
    width: "100%",
  },
  btn: {
    position: "relative",
    width: "100%",
    borderRadius: "10px",
    backgroundColor: "#ff9900",
    marginTop: "10px",
    "&:hover": {
      backgroundColor: "#FFA500",
      fontWeight: "bold",
      color: "#000",
      boxShadow: "2rem 2rem 3rem rgba(132, 139, 200, 0.18)",
    }
  },
  priceFrom: {
    padding: "0 20px",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "20px"
    }
  },
  search: {
    padding: "0 20px"
  },
  center: {
    textAlign: "center",
  }

}));

export function SellerManagerProduct(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'sellerManagerProduct', reducer });
  useInjectSaga({ key: 'sellerManagerProduct', saga });

  const [nameSearch, setNameSearch] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const store = getStore();
  const classes = useStyles();

  const columns1 = [
    { id: 'stt', label: 'STT', minWidth: 10, align: 'center' },
    { id: 'name', label: 'Food Name', minWidth: 100, align: 'center' },
    { id: 'price', label: 'Price', minWidth: 100, align: 'center' },
    { id: 'createdAt', label: 'Creat At', minWidth: 100, align: 'center' },
    { id: 'type', label: 'Type', minWidth: 100, align: 'center' },
    { id: 'actived', label: 'Active', minWidth: 100, align: 'center' },
  ];

  function createData( id, stt, name, price, createdAt, type, actived) {
    //const density = population / size;
    return { id, stt, name, price, createdAt, type, actived };
  }

  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (props.sellerManagerProduct.foodList) {
      setRows(props.sellerManagerProduct.foodList.map((item, index) =>
        createData(item.id, index + 1, item.name, item.price, item.createdAt, item.type, item.actived)
      ))
    }
  }, [props.sellerManagerProduct.foodList])




  const [type, setType] = useState();

  useEffect(() => {
    const data = {
      id: store
    }
    dispatch(fetchListFood(data));
  }, []);

  //set Type
  const handleChangeType = (e) => {
    setType(e.target.value);
  };

  const searchFood1 = () => {
    const data = {
      name: nameSearch,
      startPrice: priceFrom,
      endPrice: priceTo,
      id: store
    }
    dispatch(searchFood(data));
  }

  const reset = () => {
    setNameSearch("");
    setPriceFrom("");
    setPriceTo("");
  }

  console.log(props.sellerManagerProduct.foodList)

  return (
    <div style={{ paddingRight: "15px" }}>
      <div>
        <Grid container spacing={0} className={classes.information_image}>
          <Grid container spacing={0} style={{ marginBottom: "20px" }}>
            <Grid item md={6} sm={12} xs={12} className={classes.search}>
              <div className={classes.center}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-textarea"
                    label="Tên món ăn"
                    placeholder="Tên món ăn"
                    multiline
                    value={nameSearch}
                    onChange={(e) => setNameSearch(e.target.value)}
                  />
                </Box>
              </div>
            </Grid>
            <Grid item md={6} sm={12} xs={12} className={classes.priceFrom}>
              <div className={classes.center}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={type}
                      label="Type"
                      onChange={handleChangeType}
                    >
                      <MenuItem value='ComNong'>Cơm Nóng</MenuItem>
                      <MenuItem value='ComRang'>Cơm Rang</MenuItem>
                      <MenuItem value='ComTam'>Cơm Tấm</MenuItem>
                      <MenuItem value='NemNuong'>Nem Nướng</MenuItem>
                      <MenuItem value='Pho'>Phở</MenuItem>
                      <MenuItem value='Banhmi'>Bánh Mì</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

              </div>
            </Grid>
          </Grid>
          <Grid container spacing={0} >
            <Grid item md={6} sm={12} xs={12} className={classes.search}>
              <div className={classes.center}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-textarea"
                    label="Trạng thái"
                    placeholder="Trạng thái"
                    multiline
                  />
                </Box>
              </div>
            </Grid>
            <Grid item md={6} sm={12} xs={12} className={classes.priceFrom}>
              <div className={classes.center}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Grid container spacing={2} >
                    <Grid item md={6} sm={12} xs={12} >
                      <TextField
                        id="outlined-textarea"
                        label="Giá từ"
                        placeholder="Giá từ"
                        multiline
                        value={priceFrom}
                        onChange={(e) => setPriceFrom(e.target.value)}
                      />

                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                      <TextField
                        id="outlined-textarea"
                        label="đến"
                        placeholder="đến"
                        multiline
                        value={priceTo}
                        onChange={(e) => setPriceTo(e.target.value)}
                      />

                    </Grid>
                  </Grid>
                </Box>
              </div>
            </Grid>
          </Grid>
          <Grid item md={12} sm={12} xs={12} style={{ padding: "0 30px" }}>
            <Grid container spacing={0} >
              <Grid item md={6} sm={6} xs={12}>
                <div className={classes.center}>
                  <Button className={classes.btn} variant="contained" component="span" style={{ width: "fit-content" }} onClick={reset}>
                    Đặt lại
                  </Button>
                </div>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <div className={classes.center}>
                  <Button className={classes.btn} variant="contained" component="span" style={{ width: "fit-content" }} onClick={searchFood1}>
                    Tìm kiếm
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div >

      <div style={{ marginTop: "20px" }}>
        <Button onClick={() => props.history.push("/my-store/manager-product/addProduct")} className={classes.btn} variant="contained" component="span" style={{ width: "fit-content", display: "block", marginLeft: "auto" }}>
          Thêm sản phẩm
        </Button>
      </div>
      {/* <CustomTable data={props.sellerManagerProduct.foodList} itemPerPage={5} totalItem={props.sellerManagerProduct.foodList.length} detailPage="my-store/manager-product" columns={columns} action={action} /> */}
      {props.sellerManagerProduct.foodList ? <CustomTableResponsive columns={columns1} data={props.sellerManagerProduct.foodList} detailPage="my-store/manager-product" rows={rows} /> : null}
    </div >
  );
}

SellerManagerProduct.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sellerManagerProduct: makeSelectSellerManagerProduct(),
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
)(SellerManagerProduct);
