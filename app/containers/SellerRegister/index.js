/**
 *
 * SellerRegister
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
import makeSelectSellerRegister from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Logo from '../../images/Happy_Delivery_Man_logo_cartoon_art_illustration.jpg';
import { Grid, Box, TextField, Button, Tab, Tabs, TextareaAutosize, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { makeStyles, Container, Typography } from '@material-ui/core';
import BackGround from '../../images/dhfpt.png';
import { NavLink } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { getUser } from '../../utils/common';


const useStyles = makeStyles((theme) => ({

  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundImage: `url(${BackGround})`,
    backgroundSize: "cover",

  },
  container: {
    position: "relative",
    width: "800px",
    minHeight: "600px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "30px",
    margin: "20px",
    borderRadius: "30px",
    [theme.breakpoints.down("sm")]: {
      width: "fit-content",
    }

  },
  logo: {
    width: "6rem",
    height: "5rem",
  },
  top: {
    display: "flex",
    margin: "0 auto",
    textAlign: "center"
  },
  registerTag: {
    fontWeight: "600",
    fontSize: "2em",
    width: "100%",
    textAlign: "center",
    textTransform: "uppercase",
    color: "#20d167",
  },
  btnSubmit: {
    position: "relative",
    width: "100%",
    borderRadius: "10px",
    backgroundColor: "#ff9900",
    marginTop: "10px",
    "&:hover": {
      backgroundColor: "orange",
      fontWeight: "bold",
      color: "#000",
    }
  },
  btnBack: {
    position: "relative",
    width: "100%",
    borderRadius: "10px",
    backgroundColor: "#fff",
    border: "1px solid #000",
    color: "#000",
    marginTop: "10px",
    "&:hover": {
      backgroundColor: "orange",
      fontWeight: "bold"
    }
  },
  topLogo: {
    margin: "0 auto",
    display: "flex",
    marginBottom: "20px"
  },
  upload: {
    backgroundColor: "#D9D9D9",
    padding: "20px",
    borderRadius: "10px"
  }

}));

export function SellerRegister() {
  useInjectReducer({ key: 'sellerRegister', reducer });
  useInjectSaga({ key: 'sellerRegister', saga });

  const classes = useStyles();
  const [registerType, setRegisterType] = useState("1");

  const [value, setValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleUploadFile = async e => {
    const file = e.target.files;
    console.log(file)
    const data = new FormData();
    data.append(file, file[0])
  }

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const handleChangeStartTime = (newValue) => {
    setStartTime(newValue)
  }


  const handleChangeEndTime = (newValue) => {
    setEndTime(newValue)
  }

  const user = getUser();
  console.log(user)


  return (
    <div className={classes.body}>
      <div className={classes.container}>
        <form className="">
          <div className={classes.top}>
            <div className={classes.topLogo}>
              <img src={Logo} alt="logo" className={classes.logo} />
              <h2>No <span>Nê</span></h2>
            </div>
          </div>
          <h3 className={classes.registerTag}>Đăng Ký Đối Tác</h3>
          <div style={{ display: "flex", textAlign: "center" }}>
            {/* <Grid container spacing={3} style={{ margin: "0 auto" }}>
              <Grid item sm="auto" xs="auto">
                <NavLink to="/sellerRegister" className={classes.link}>
                  <Typography>1. Thông tin quán - cơ bản</Typography>
                </NavLink>
              </Grid>
              <Grid item sm="auto" xs="auto">
                <NavLink to="/sellerRegister" className={classes.link}>
                  <Typography>2. Thông tin người đại diện</Typography>
                </NavLink>
              </Grid>
              <Grid item sm="auto" xs="auto">
                <NavLink to="/sellerRegister" className={classes.link}>
                  <Typography>3. Thông tin quán - chi tiết</Typography>
                </NavLink>
              </Grid>
            </Grid> */}
            <Tabs style={{ margin: "0 auto" }} value={value} onChange={handleChangeTab} textColor="primary" indicatorColor="primary" centered>
              <Tab label="1. Thông tin quán - cơ bản" />
              <Tab label="2. Thông tin người đại diện" />
              <Tab label="3. Thông tin quán - chi tiết" />
            </Tabs>

          </div>


          <br />
          {value == 0 ?
            <>
              <div style={{ textAlign: "center" }}>
                <Grid container spacing={2} >
                  <Grid item sm={6} xs={12} >
                    <Box
                      component="form"
                      sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        required
                        id="outlined-textarea"
                        label="Tên quán"
                        placeholder="Tên quán"
                        multiline
                      />
                    </Box>
                  </Grid>
                  <Grid item sm={6} xs={12} >
                    <Box
                      component="form"
                      sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        required
                        id="outlined-textarea"
                        label="Địa chỉ"
                        placeholder="Địa chỉ"
                        multiline
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid item sm="auto" xs="auto" style={{ width: "100%" }}>
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      required
                      id="outlined-textarea"
                      label="Số điện thoại liên hệ"
                      placeholder="Số điện thoại liên hệ"
                      multiline
                    />
                  </Box>
                </Grid>
                <Grid item sm="auto" xs="auto" style={{ width: "100%" }}>
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-textarea"
                      label="Thành phố"
                      placeholder="Thành phố"
                      multiline
                    />
                  </Box>
                </Grid>
                <Grid item sm="auto" xs="auto" style={{ width: "100%" }}>
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-textarea"
                      label="Quận"
                      placeholder="Quận"
                      multiline
                    />
                  </Box>
                </Grid>
                <Grid item sm="auto" xs="auto" style={{ width: "100%" }}>
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-textarea"
                      label="Số nhà và đường phố"
                      placeholder="Số nhà và đường phố"
                      multiline
                    />
                  </Box>
                </Grid>
              </div>
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Button className={classes.btnSubmit} variant="contained" component="span" style={{ width: "50%" }}>
                  Lưu và tiếp tục
                </Button>
              </div>
            </>

            // page 2
            : value == 1 ?

              <>
                <div style={{ textAlign: "center" }}>
                  <Grid item sm={12} xs={12}>
                    <Box
                      component="form"
                      sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        required
                        id="outlined-textarea"
                        label="Tên đầy đủ của người đại diện"
                        placeholder="Tên đầy đủ của người đại diện"
                        multiline
                        value={user.username}
                        disabled
                      />
                    </Box>
                  </Grid>
                  <Grid item sm={12} xs={12} >
                    <Box
                      component="form"
                      sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        required
                        id="outlined-textarea"
                        label="Email"
                        placeholder="Email"
                        multiline
                      />
                    </Box>
                  </Grid>
                  <Grid item sm={12} xs={12} >
                    <Box
                      component="form"
                      sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        required
                        value={user.phone}
                        id="outlined-textarea"
                        label="Số điện thoại"
                        placeholder="Số điện thoại"
                        disabled

                      />
                    </Box>
                  </Grid>
                  <Grid item sm={12} xs={12} >
                    <Box
                      component="form"
                      sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="outlined-textarea"
                        label="Số nhà và đường phố"
                        placeholder="Số nhà và đường phố"
                        multiline
                      />
                    </Box>
                  </Grid>
                  <Grid container spacing={2} >
                    <Grid item sm={6} xs={12} >
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <div>
                          <p>Ảnh chụp mặt trước CCCD *</p>
                        </div>
                        <div className={classes.upload}>
                          <input type="file" name="front" placeholder="upload an image" onChange={handleUploadFile} />
                        </div>
                      </Box>
                    </Grid>
                    <Grid item sm={6} xs={12} >
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <div>
                          <p>Ảnh chụp mặt sau CCCD *</p>
                        </div>
                        <div className={classes.upload}>
                          <input type="file" name="back" placeholder="upload an image" />
                        </div>
                      </Box>
                    </Grid>
                  </Grid>
                </div>
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <Grid container spacing={2} >
                    <Grid item sm={6} xs={12} >
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <Button style={{ width: "50%" }} className={classes.btnBack} variant="contained" component="span">
                          Quay lại
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item sm={6} xs={12} >
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <Button style={{ width: "50%" }} className={classes.btnSubmit} variant="contained" component="span" >
                          Lưu và tiếp tục
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              </>

              //page 3
              : <>
                <div style={{ textAlign: "center" }}>
                  <Grid container spacing={2} >
                    <Grid item sm={6} xs={12} >
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 0, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <TimePicker
                            label="Thời gian mở cửa"
                            value={startTime}
                            onChange={handleChangeStartTime}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
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
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <TimePicker
                            label="Thời gian đóng cửa"
                            value={endTime}
                            onChange={handleChangeEndTime}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </Box>
                    </Grid>
                  </Grid>
                  <div style={{ marginTop: "20px" }}>
                    <Grid item sm="auto" xs="auto" style={{ width: "100%" }}>
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextareaAutosize
                          aria-label="Miêu tả về quán"
                          minRows={3}
                          placeholder="Miêu tả về quán"
                          style={{ width: "100%" }}
                        />
                      </Box>
                    </Grid>
                  </div>

                  <div>
                    <Grid container spacing={3} >
                      <Grid item sm={4} xs={12} >
                        <Box
                          component="form"
                          sx={{
                            '& .MuiTextField-root': { m: 1, width: '100%' },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <div>
                            <p>Ảnh đại diện quán *</p>
                          </div>
                          <div className={classes.upload}>
                            <input type="file" name="front" placeholder="upload an image" onChange={handleUploadFile} />
                          </div>
                        </Box>
                      </Grid>
                      <Grid item sm={4} xs={12} >
                        <Box
                          component="form"
                          sx={{
                            '& .MuiTextField-root': { m: 1, width: '100%' },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <div>
                            <p>Chứng nhận thực phẩm sạch *</p>
                          </div>
                          <div className={classes.upload}>
                            <input type="file" name="back" placeholder="upload an image" />
                          </div>
                        </Box>
                      </Grid>
                      <Grid item sm={4} xs={12} >
                        <Box
                          component="form"
                          sx={{
                            '& .MuiTextField-root': { m: 1, width: '100%' },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <div>
                            <p>Menu *</p>
                          </div>
                          <div className={classes.upload}>
                            <input type="file" name="menu" placeholder="upload an image" />
                          </div>
                        </Box>
                      </Grid>
                    </Grid>
                  </div>
                </div>
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <Grid container spacing={2} >
                    <Grid item sm={12} xs={12} >
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"

                      >
                        <label style={{ textAlign: "center", width: "100%" }}>
                          <FormGroup style={{ margin: "0 auto", width: "65%" }}>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Tôi đồng ý với điều khoản dịch vụ và chính sách bảo mật" />
                          </FormGroup>
                        </label>
                      </Box>
                    </Grid>
                    <Grid item sm={12} xs={12} >
                      <Box
                        component="form"
                        sx={{
                          '& .MuiTextField-root': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <Button type="submit" className={classes.btnSubmit} style={{ width: "50%" }} variant="contained" component="span">
                          ĐĂNG KÝ
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              </>}
        </form>

      </div>
    </div>
  );
}

SellerRegister.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sellerRegister: makeSelectSellerRegister(),
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
)(SellerRegister);
