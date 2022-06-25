/**
 *
 * SellerManagerProduct
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
  useInjectReducer({ key: 'sellerManagerProduct', reducer });
  useInjectSaga({ key: 'sellerManagerProduct', saga });

  const food = [
    { id: 1, name: "Banh My 2 trung", price: "15.000 VND", quantity: "2", type: "banh mi", status: "Active" },
    { id: 2, name: "Bun dau", price: "15.000 VND", quantity: "2", type: "bun", status: "Active" },
    { id: 3, name: "Pizza", price: "15.000 VND", quantity: "2", type: "do an nhanh", status: "Active" },

  ];

  const columns = [
    { title: "ID", field: "id" },
    { title: "Food Name", field: "name" },
    { title: "Price", field: "price" },
    { title: "Quantity", field: "quantity" },
    { title: "Type", field: "type" },
    { title: "Status", field: "status" },
  ];

  const classes = useStyles();
  const [priceFrom, setPriceForm] = useState();

  const [type, setType] = useState();

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
                  />
                </Box>
              </div>
            </Grid>
            <Grid item md={6} sm={12} xs={12} className={classes.priceFrom}>
              <div className={classes.center}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={type}
                      label="Age"
                    // onChange={(e) => setType(e.target.value)}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
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
                      />

                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                      <TextField
                        id="outlined-textarea"
                        label="đến"
                        placeholder="đến"
                        multiline
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
                  <Button className={classes.btn} variant="contained" component="span" style={{ width: "fit-content" }}>
                    Đặt lại
                  </Button>
                </div>
              </Grid>
              <Grid item md={6} sm={6} xs={12}>
                <div className={classes.center}>
                  <Button className={classes.btn} variant="contained" component="span" style={{ width: "fit-content" }}>
                    Tìm kiếm
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div >

      <div style={{ marginTop: "20px" }}>
        <Button onClick={() => props.history.push("/managerProduct/addProduct")} className={classes.btn} variant="contained" component="span" style={{ width: "fit-content", display: "block", marginLeft: "auto" }}>
          Thêm sản phẩm
        </Button>
      </div>
      <CustomTable data={food} itemPerPage={5} totalItem={food.length} detailPage="food" columns={columns} />
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
