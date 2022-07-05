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
  Box, Grid, Container, Avatar, Typography, List, FormControlLabel, Radio, RadioGroup,
  ListItemButton, ListItemIcon, ListItemText, Collapse, OutlinedInput, Select, MenuItem
} from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';
import Avatar1 from '../../images/quan.jpg';

import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import HomeIcon from '@mui/icons-material/Home';
import PasswordIcon from '@mui/icons-material/Password';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';


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


}));

export function UserSetting(props) {
  useInjectReducer({ key: 'userSetting', reducer });
  useInjectSaga({ key: 'userSetting', saga });

  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("Anh Quan");
  const [storeName, setStoreName] = useState("Quán Gốc Sung");
  const [gender, setGender] = useState("");
  const [bday, setBDay] = useState(1);
  const [bmonth, setBMonth] = useState(1);
  const [byear, setBYear] = useState(1);
  const months = [];

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChangeGender = (event) => {
    setValue(event.target.value);
  };

  const days = [];
  for (var i = 1; i <= 31; i++) {
    days.push(i);
  }
  for (var i = 1; i <= 12; i++) {
    months.push(i);
  }

  return (
    <div>
      <Headerr />
      <Container fixed>
        <Grid container spacing={2} style={{ marginTop: "15px" }}>
          <Grid item xs={12} md={3} style={{ padding: "10px" }}>
            <div>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3} className={classes.center}>
                  <Avatar alt="avatar store" src={Avatar1} sx={{ width: 56, height: 56 }} />
                </Grid>
                <Grid item xs={12} md={9}>
                  <p >Anh Quan</p>
                </Grid>
              </Grid>
              <hr />
              <div style={{ marginTop: "15px" }}>
                <List
                  sx={{ width: '100%', maxWidth: 360, bgcolor: '#FAFAFA' }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tài khoản của tôi" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <ArticleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Hồ sơ" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Địa chỉ" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <PasswordIcon />
                        </ListItemIcon>
                        <ListItemText primary="Đổi mật khẩu" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <ListItemButton>
                    <ListItemIcon>
                      <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Lịch sử mua hàng" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon>
                      <ReceiptIcon />
                    </ListItemIcon>
                    <ListItemText primary="Voucher của tôi" />
                  </ListItemButton>

                </List>
              </div>

            </div>
          </Grid>
          <Grid item xs={12} md={9} style={{ padding: "10px", backgroundColor: "#fff" }}>
            <div>
              <p className={classes.font} style={{ fontWeight: "500", fontSize: "25px" }}>Hồ sơ của tôi</p>
              <p className={classes.font} style={{ fontWeight: "lighter", fontSize: "15px" }}>Quản lý thông tin để bảo mật tài khoản</p>
            </div>
            <hr />
            <Grid container spacing={0} style={{ marginTop: "15px" }}>
              <Grid item xs={12} md={8} style={{ padding: "10px" }}>
                <Grid container spacing={0}>
                  <Grid item xs={12} md={6} style={{ textAlign: "right", paddingRight: "10px" }}>
                    <span>Tên đăng nhập</span>
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <span>quananh</span>
                  </Grid>
                  <Grid item xs={12} md={6} className={classes.center} style={{ justifyContent: "right", paddingRight: "10px" }}>
                    <span >Tên</span>
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <OutlinedInput placeholder="Please enter text" value={name} onChange={(e) => setName(e.target.value)} />
                  </Grid>
                  <Grid item xs={12} md={6} style={{ textAlign: "right", paddingRight: "10px" }}>
                    <span>Email</span>
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <span>abc@gmail.com</span> <span style={{ marginLeft: "15px" }}><a href='#'>thay đổi</a></span>
                  </Grid>
                  <Grid item xs={12} md={6} style={{ textAlign: "right", paddingRight: "10px" }}>
                    <span>Số điện thoại</span>
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <span>0123456798</span> <span style={{ marginLeft: "15px" }}><a href='#'>thay đổi</a></span>
                  </Grid>
                  <Grid item xs={12} md={6} className={classes.center} style={{ justifyContent: "right", paddingRight: "10px" }}>
                    <span >Tên shop</span>
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <OutlinedInput placeholder="Please enter text" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
                  </Grid>
                  <Grid item xs={12} md={6} className={classes.center} style={{ justifyContent: "right", paddingRight: "10px" }}>
                    <span >Giới tính</span>
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <RadioGroup
                      row
                      aria-labelledby="demo-form-control-label-placement"
                      value={gender}
                      onChange={handleChangeGender}
                    >
                      <FormControlLabel value="male" control={<Radio />} label="Nam" />
                      <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                      <FormControlLabel value="diff" control={<Radio />} label="Khác" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} md={6} className={classes.center} style={{ justifyContent: "right", paddingRight: "10px" }}>
                    <span >Ngày tháng năm sinh</span>
                  </Grid>
                  <Grid item xs={12} md={6} style={{ display: "inline-block" }}>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={bday}
                      onChange={(e) => setBDay(e.target.value)}
                      autoWidth
                      label="ngayf"
                    >
                      {days.map((item, index) =>
                        <MenuItem key={index} value={item} style={{ maxHeight: "50px" }}>{item}</MenuItem>
                      )}
                    </Select>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={bmonth}
                      onChange={(e) => setBMonth(e.target.value)}
                      autoWidth
                      label="thang"
                      style={{ margin: "0 10px" }}
                    >
                      {months.map((item, index) =>
                        <MenuItem key={index} value={item} style={{ maxHeight: "50px" }}>{item}</MenuItem>
                      )}
                    </Select>
                    <OutlinedInput placeholder="Please enter text" value={byear} onChange={(e) => setBYear(e.target.value)} style={{ width: "35%" }} />
                  </Grid>
                </Grid>
                <div style={{ textAlign: "center" }}>
                  <Button className={classes.btn} variant="outlined" startIcon={<SaveIcon />}>
                    Lưu
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12} md={4} style={{ padding: "10px" }}>
                <div style={{ textAlign: "center" }}>
                  <Avatar alt="avatar store" src={Avatar1} sx={{ width: 150, height: 150, margin: "0 auto" }} />
                  <Button className={classes.btn} variant="outlined" startIcon={<InsertPhotoIcon />}>
                    Chọn ảnh
                  </Button>
                  <p className={classes.font} style={{ fontWeight: "300", fontSize: "15px" }}>Chọn ảnh định dạng <br /> .JPEG, .JPG, .PNG</p>
                </div>

              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* <FormattedMessage {...messages.header} /> */}
      </Container>
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
