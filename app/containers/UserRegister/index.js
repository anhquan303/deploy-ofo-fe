/**
 *
 * UserRegister
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUserRegister from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { makeStyles, Container, Typography } from '@material-ui/core';
import BackGround from '../../images/dhfpt.png';
import Logo from '../../images/Happy_Delivery_Man_logo_cartoon_art_illustration.jpg';
import { Grid, Box, FormGroup, TextField, FormControlLabel, Checkbox, Button } from '@mui/material';

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
    width: "fit-content",
    minHeight: "600px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "30px",
    margin: "20px",
    borderRadius: "30px"
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
  topLogo: {
    margin: "0 auto",
    display: "flex",
    marginBottom: "20px"
  }

}));


export function UserRegister() {
  useInjectReducer({ key: 'userRegister', reducer });
  useInjectSaga({ key: 'userRegister', saga });

  const classes = useStyles();

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
          <h3 className={classes.registerTag}>Đăng ký</h3>
          <div>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
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
                    label="Họ và tên"
                    placeholder="Họ và tên"
                    multiline
                  />
                </Box>
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
                    label="Email"
                    placeholder="Email"
                    multiline
                  />
                </Box>
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
                    label="Tên tài khoản"
                    placeholder="Tên tài khoản"
                    multiline
                  />
                </Box>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-password-input"
                    label="Xác nhận mật khẩu"
                    type="password"
                    autoComplete="current-password"
                  />
                </Box>

              </Grid>
              <Grid item sm={6} xs={12}>
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
                    label="Số điện thoại"
                    placeholder="Số điện thoại"
                    multiline
                  />
                </Box>
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
                    label="Địa chỉ"
                    placeholder="Địa chỉ"
                    multiline
                  />
                </Box>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '100%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-password-input"
                    label="mật khẩu"
                    type="password"
                    autoComplete="current-password"
                  />
                </Box>
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
                    label="Captcha"
                    placeholder="Captcha"
                    multiline
                  />
                </Box>
              </Grid>
            </Grid>
          </div>
          <label >
            <FormGroup style={{ marginLeft: "10px" }}>
              <FormControlLabel className="" control={<Checkbox defaultChecked />} label="Tôi đồng ý với điều khoản dịch vụ và chính sách bảo mật" />
            </FormGroup>
          </label>
          <Button type="submit" className={classes.btnSubmit} variant="contained" component="span">
            ĐĂNG KÝ
          </Button>
        </form>
      </div>
    </div>
  );
}

UserRegister.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userRegister: makeSelectUserRegister(),
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
)(UserRegister);
