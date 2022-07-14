/**
 *
 * UserSetting
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
import makeSelectUserSetting from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Headerr } from '../Headerr';
import {
  Box, Grid, Container, Avatar, Typography, TextField, FormControlLabel, Radio, RadioGroup,
  ListItemButton, ListItemIcon, ListItemText, Collapse, OutlinedInput, Select, MenuItem
} from '@mui/material';
import { makeStyles, Button, Fab, CardContent } from '@material-ui/core';
import Avatar1 from '../../images/quan.jpg';

import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import SaveIcon from '@mui/icons-material/Save';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { NavLink } from 'react-router-dom';
import { getUser, getStore } from '../../utils/common';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


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
  textField: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center"
    }
  },
  radioButton: {
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center"
    }
  },
  dob: {
    display: "inline-block",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center"
    }
  },
  right: {
    textAlign: "left",
    paddingRight: "10px",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    }
  }

}));

export function UserSetting(props) {
  useInjectReducer({ key: 'userSetting', reducer });
  useInjectSaga({ key: 'userSetting', saga });

  const classes = useStyles();
  const user = getUser();
  const store = getStore();
  const [open, setOpen] = useState(true);
  const [firstname, setFirstName] = useState(user.firstname);
  const [lastname, setLastName] = useState(user.lastname);
  const [storeName, setStoreName] = useState("Quán Gốc Sung");
  const [gender, setGender] = useState("");

  const [dob, setDOB] = useState(new Date());

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChangeGender = (event) => {
    setValue(event.target.value);
  };



  const handleUploadClick = () => {

  }

  return (
    <div>
      <div>
        <p className={classes.font} style={{ fontWeight: "500", fontSize: "25px" }}>Hồ sơ của tôi</p>
        <p className={classes.font} style={{ fontWeight: "lighter", fontSize: "15px" }}>Quản lý thông tin để bảo mật tài khoản</p>
      </div>
      <hr />

      <Grid container spacing={0} style={{ marginTop: "15px" }}>
        <Grid item xs={12} md={4} style={{ padding: "10px" }}>
          <div className={classes.center} style={{ justifyContent: "right" }}>
            <CardContent>
              <Grid container >
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={handleUploadClick}
                />
                <label htmlFor="contained-button-file">
                  {user ? <Avatar sx={{ width: 150, height: 150 }} component="span" src={Avatar1}>
                    <AddPhotoAlternateIcon />
                  </Avatar> :
                    <Avatar src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" />
                  }

                </label>
              </Grid>
            </CardContent>
          </div>
        </Grid>
        <Grid item xs={12} md={7} style={{ padding: "10px" }}>
          <div>
            <Grid container spacing={0}>
              <Grid item xs={12} md={6} className={classes.text} >
                <span>Tên đăng nhập</span>
              </Grid>
              <Grid item xs={12} md={6} className={classes.text} style={{ fontWeight: "lighter", justifyContent: "left", }}>
                <span>{user.username}</span>
              </Grid>

              <Grid container spacing={0} style={{ marginTop: "10px" }}>
                <Grid item xs={12} md={6} className={classes.text} >
                  <span >Họ</span>
                </Grid>
                <Grid item xs={12} md={6} className={classes.textField}>
                  <OutlinedInput placeholder="Please enter text" value={firstname} onChange={(e) => setFirstName(e.target.value)} />
                </Grid>
              </Grid>

              <Grid container spacing={0} style={{ marginTop: "10px" }}>
                <Grid item xs={12} md={6} className={classes.text} >
                  <span >Tên</span>
                </Grid>
                <Grid item xs={12} md={6} className={classes.textField}>
                  <OutlinedInput placeholder="Please enter text" value={lastname} onChange={(e) => setLastName(e.target.value)} />
                </Grid>
              </Grid>

              <Grid container spacing={0} style={{ marginTop: "10px" }}>
                <Grid item xs={12} md={6} className={classes.text} >
                  <span>Số điện thoại</span>
                </Grid>
                <Grid item xs={12} md={3} className={classes.text} style={{ fontWeight: "lighter", justifyContent: "left", }}>
                  <span>{user.phone}</span>
                </Grid>
                <Grid item xs={12} md={3} className={classes.text} >
                  <span style={{ fontSize: "13px" }}><a href='#'>thay đổi</a></span>
                </Grid>
              </Grid>

              <Grid container spacing={0} style={{ marginTop: "10px" }}>
                <Grid item xs={12} md={6} className={classes.text} >
                  <span>Email</span>
                </Grid>
                <Grid item xs={12} md={3} className={classes.text} style={{ fontWeight: "lighter", justifyContent: "left", }}>
                  <span>{user.email}</span>
                </Grid>
                <Grid item xs={12} md={3} className={classes.text} >
                  <span style={{ fontSize: "13px" }}><a href='#'>thay đổi</a></span>
                </Grid>
              </Grid>

              <Grid container spacing={0} style={{ marginTop: "10px" }}>
                <Grid item xs={12} md={6} className={classes.text} >
                  <span >Ngày tháng năm sinh</span>
                </Grid>
                <Grid item xs={12} md={6} className={classes.textField}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="DOB"
                      value={dob}
                      onChange={(newValue) => {
                        setDOB(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>

              <Grid container spacing={0} style={{ marginTop: "10px" }}>
                <Grid item xs={12} md={6} className={classes.text} >
                  <span >Giới tính</span>
                </Grid>
                <Grid item xs={12} md={6} >
                  <RadioGroup
                    row
                    aria-labelledby="demo-form-control-label-placement"
                    value={gender}
                    onChange={handleChangeGender}
                    className={classes.radioButton}
                  >
                    <FormControlLabel value="male" control={<Radio />} label="Nam" />
                    <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                    <FormControlLabel value="diff" control={<Radio />} label="Khác" />
                  </RadioGroup>
                </Grid>
              </Grid>
            </Grid>

          </div>
        </Grid>

      </Grid>
      <div style={{ textAlign: "center" }}>
        <Button className={classes.btn} variant="outlined" startIcon={<SaveIcon />}>
          Lưu
        </Button>
      </div>
    </div >
  );
}

UserSetting.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userSetting: makeSelectUserSetting(),
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
)(UserSetting);
