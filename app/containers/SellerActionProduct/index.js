/**
 *
 * SellerActionProduct
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSellerActionProduct from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { useParams } from 'react-router-dom';
import { Box, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { makeStyles, Grid, Button } from '@material-ui/core';
import Snackbar from '@mui/material/Snackbar';
import { deleteProduct, reset, updateProduct } from './actions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


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


export function SellerActionProduct(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'sellerActionProduct', reducer });
  useInjectSaga({ key: 'sellerActionProduct', saga });

  let param = useParams();

  const classes = useStyles();
  const [type, setType] = useState(props.location.state.item.type);
  const [storeId, setStoreId] = useState("1");
  const initialValues = { name: props.location.state.item.name, price: props.location.state.item.price, description: props.location.state.item.description, image: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("right");
  const [isSubmit, setIsSubmit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);


  //set value for input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  //validate
  const HandleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

  }

  //set Type
  const handleChangeType = (e) => {
    setType(e.target.value);
  };

  //close notification
  const handleCloseToast = () => {
    setOpen(false);
  }

  const validate = (values) => {
    const errors = {};
    const regexPrice = /^[0-9]*$/;
    if (!values.name) {
      errors.name = "name is required!";
    }
    if (!values.price) {
      errors.price = "price is required!";
    }
    if (!values.description) {
      errors.description = "description is required!";
    }
    if (regexPrice.test(values.price) == false) {
      errors.price1 = "number only!";
    }
    return errors;
  }

  //update Product
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const data = {
        id: props.location.state.item.id,
        name: formValues.name,
        price: formValues.price,
        type: type,
        description: formValues.description,
        image: "A",
        storeId: storeId
      }
      dispatch(updateProduct(data));
      setOpen(true);
    }

  }, [formErrors])

  const deleteProduct1 = () => {
    const data = {
      id: props.location.state.item.id
    }
    dispatch(deleteProduct(data));
  }

  useEffect(() => {
    if (props.sellerActionProduct.message == "DELETE SUCCESSFUL" || props.sellerActionProduct.message == "UPDATE SUCCESSFUL") {
      props.history.push("/managerProduct")
      dispatch(reset());
    }
  }, [props.sellerActionProduct.message])

  return (
    <div style={{ paddingRight: "15px" }}>
      <div style={{ textAlign: "center" }}>
        <p>Thay đổi sản phảm</p>
        <div className={classes.inside}>
          <form>
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
                    error={formErrors.name != null && formValues.name.length == ""}
                    required
                    id="outlined-textarea"
                    label="Tên món ăn"
                    placeholder="Tên món ăn"
                    multiline
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    helperText={formErrors.name && formValues.name.length == "" ? formErrors.name : null}
                  />
                </Box>
              </Grid>
              <Grid container spacing={1} className={classes.marginBot}>
                <Grid item sm={6} xs={12} >
                  <Box sx={{ '& .MuiTextField-root': { m: 1 }, }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Type"
                        onChange={handleChangeType}
                      >
                        <MenuItem value="ComNong">Cơm Nóng</MenuItem>
                        <MenuItem value="ComRang">Cơm Rang</MenuItem>
                        <MenuItem value="ComTam">Cơm Tấm</MenuItem>
                        <MenuItem value="NemNuong">Nem Nướng</MenuItem>
                        <MenuItem value="Pho">Phở</MenuItem>
                        <MenuItem value="Banhmi">Bánh Mì</MenuItem>
                      </Select>
                    </FormControl>
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
                      name="price"
                      value={formValues.price}
                      onChange={handleChange}
                      helperText={formErrors.price && formValues.price.length == "" ? formErrors.price : formErrors.price1 ? formErrors.price1 : null}
                      error={formErrors.price != null && formValues.price.length == "" ? true : formErrors.price1 != null ? true : false}
                    />
                  </Box>
                </Grid>
              </Grid>

              <Grid container spacing={1} >
                <Grid item sm={12} xs={12} >
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
                      name="description"
                      value={formValues.description}
                      onChange={handleChange}
                      error={formErrors.description != null && formValues.description.length == ""}
                      helperText={formErrors.description && formValues.description.length == "" ? formErrors.description : null}
                    />
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
                <Grid item sm={12} xs={12} lg={4}>
                  <Button onClick={() => props.history.push("/managerProduct")} className={classes.btn} variant="contained" component="span" >
                    Trở về
                  </Button>
                </Grid>
                <Grid item sm={12} xs={12} lg={4}>
                  <Button className={classes.btn} variant="contained" component="span" onClick={() => setOpenDialog(true)}>
                    Xóa sản phẩm
                  </Button>
                </Grid>
                <Grid item sm={12} xs={12} lg={4}>
                  <Button className={classes.btn} variant="contained" component="span" onClick={HandleSubmit}>
                    Thay đổi sản phẩm
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleCloseToast}
            message={props.sellerActionProduct.message}
            autoHideDuration={5000}
          />
          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Bạn có chắc chắn xóa sản phẩm này?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Sản phẩm này sẽ bị xóa vĩnh viễn nếu bạn nhấn "Xác nhận"
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Trở lại</Button>
              <Button onClick={deleteProduct1} autoFocus>
                Xác nhận
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

SellerActionProduct.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sellerActionProduct: makeSelectSellerActionProduct(),
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
)(SellerActionProduct);
