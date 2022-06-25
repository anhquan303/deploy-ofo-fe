/**
 *
 * SellerAddProduct
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
import makeSelectSellerAddProduct from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Box, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { makeStyles, Grid, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  upload: {
    backgroundColor: "#D9D9D9",
    padding: "20px",
    borderRadius: "10px"
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
  inside: {
    width: "25%",
    margin: "0 auto",
    [theme.breakpoints.down("lg")]: {
      width: "35%",
    },
    [theme.breakpoints.down("md")]: {
      width: "45%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "65%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    }
  },
  marginBot: {
    marginBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "5px",
    }
  },


}));

export function SellerAddProduct(props) {
  useInjectReducer({ key: 'sellerAddProduct', reducer });
  useInjectSaga({ key: 'sellerAddProduct', saga });
  const classes = useStyles();
  const [type, setType] = useState();

  return (
    <div style={{ paddingRight: "15px" }}>
      <div style={{ textAlign: "center" }}>
        <p>Thêm sản phảm mới</p>
        <div className={classes.inside}>
          <Grid container spacing={0} >
            <Grid item sm={12} xs={12} className={classes.marginBot}>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 0, width: '100%' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  required
                  id="outlined-textarea"
                  label="Tên món ăn"
                  placeholder="Tên món ăn"
                  multiline

                />
              </Box>
            </Grid>
            <Grid container spacing={1} className={classes.marginBot}>
              <Grid item sm={6} xs={12} >
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    required
                    id="outlined-textarea"
                    label="Số lượng"
                    placeholder="Số lượng"
                    multiline

                  />
                </Box>
              </Grid>
              <Grid item sm={6} xs={12} >
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    required
                    id="outlined-textarea"
                    label="Giá tiền"
                    placeholder="Giá tiền"
                    multiline

                  />
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={1} >
              <Grid item sm={6} xs={12} >
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    required
                    id="outlined-textarea"
                    label="Mô tả"
                    placeholder="Mô tả"
                    multiline

                  />
                </Box>
              </Grid>
              <Grid item sm={6} xs={12} >
                <Box sx={{ '& .MuiTextField-root': { m: 1 }, }}>
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
              </Grid>
            </Grid>
            <Grid item sm={12} xs={12} >
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 0, width: '100%' },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <p>Ảnh món ăn*</p>
                </div>
                <div className={classes.upload}>
                  <input type="file" name="back" placeholder="upload an image" />
                </div>
              </Box>
            </Grid>
            <Grid container spacing={1} >
              <Grid item sm={6} xs={12} >
                <Button onClick={() => props.history.push("/managerProduct")} className={classes.btn} variant="contained" component="span" >
                  Trở về
                </Button>
              </Grid>
              <Grid item sm={6} xs={12} >
                <Button className={classes.btn} variant="contained" component="span" >
                  Thêm sản phẩm
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

SellerAddProduct.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sellerAddProduct: makeSelectSellerAddProduct(),
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
)(SellerAddProduct);
