/**
 *
 * Login
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import './login.css';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Logo from '../../images/Happy_Delivery_Man_logo_cartoon_art_illustration.jpg';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
//import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import GoogleLogin from 'react-google-login';
import { Link, useHistory } from 'react-router-dom';
import { login } from './actions';
import { getToken, getUser, removeUserSession } from '../../utils/common';
import Snackbar from '@mui/material/Snackbar';
import BackGround from '../../images/dhfpt.png';
import { Grid } from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';

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
  registerTag: {
    fontWeight: "600",
    fontSize: "2em",
    width: "100%",
    textAlign: "center",
    textTransform: "uppercase",
    color: "#20d167",
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
  topLogo: {
    margin: "0 auto",
    display: "flex",
    marginBottom: "20px"
  },
  remember: {
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontSize: "0.85rem",
    display: "flex",
  },
  btnSubmit: {
    position: "relative",
    width: "60%",
    borderRadius: "10px",
    backgroundColor: "#ff9900",
    marginTop: "10px",
    "&:hover": {
      backgroundColor: "orange",
      fontWeight: "bold",
      color: "#000",
    }
  },
  google: {
    margin: "10px 0",
    textAlign: "center",
  }

}));


export function Login(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });

  const responseGoogle = (response) => {
    //setToken(response.tokenObj.id_token);
    console.log('google', response.tokenObj.id_token)
  }

  const classes = useStyles();
  const initialValues = { userName: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("right");
  const [isSubmit, setIsSubmit] = useState(false);


  //validate
  const HandleLogin = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

  }

  //login
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const data = {
        username: formValues.userName,
        password: formValues.password
      }
      dispatch(login(data));
      setOpen(true);
    }

  }, [formErrors])

  const user = getUser();

  //redirect follow role
  useEffect(() => {
    if (user != null) {
      if (user.authorities[0].authority != "ADMIN") {
        props.history.push("/");
      } else {
        props.history.push("/dashboard");
      }
    } else {
      // props.history.push("/login");
      // if (user && token) {
      //   removeUserSession();
      // }
    }
  }, [props.login.message, user]);


  //set value for input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const validate = (values) => {
    const errors = {};
    if (!values.userName) {
      errors.userName = "username is required!";
    }
    if (!values.password) {
      errors.password = "password is required!";
    }
    return errors;
  }

  //close toast
  const handleCloseToast = () => {
    setOpen(false);
  }


  return (
    <div className={classes.body}>
      <div className={classes.container}>
        <form>
          <div className={classes.top}>
            <div className={classes.topLogo}>
              <img src={Logo} alt="logo" className={classes.logo} />
              <h2>No <span>Nê</span></h2>
            </div>
          </div>
          <h3 className={classes.registerTag}>Đăng nhập</h3>

          <div>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12} style={{ textAlign: "center" }}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '80%' },
                  }}
                  noValidate
                  autoComplete="off"
                >

                  <TextField
                    error={formErrors.userName != null && formValues.userName.length == ""}
                    id="outlined-textarea"
                    label="Tài khoản"
                    placeholder="Tài khoản"
                    multiline
                    name="userName"
                    value={formValues.userName}
                    // onChange={(e) => setUserName(e.target.value)}
                    onChange={handleChange}
                    helperText={formErrors.userName && formValues.userName.length == "" ? formErrors.userName : null}
                  />

                </Box>
              </Grid>
              <Grid item sm={12} xs={12} style={{ textAlign: "center" }}>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 0, width: '80%' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    error={formErrors.password != null && formValues.password.length == ""}
                    id="outlined-password-input"
                    label="Mật khẩu"
                    type="password"
                    autoComplete="current-password"
                    name="password"
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    value={formValues.password}
                    onChange={handleChange}
                    helperText={formErrors.password && formValues.password.length == "" ? formErrors.password : null}
                  />
                </Box>
              </Grid>
            </Grid>
          </div>

          {/* <div className="inputField" style={{ textAlign: "center", marginBottom: "10px" }}>
            <div className="box">
              <div className="icon">

              </div>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 0, width: '100%' },
                }}
                noValidate
                autoComplete="off"
              >

                <TextField
                  error={formErrors.userName != null && formValues.userName.length == ""}
                  id="outlined-textarea"
                  label="Tài khoản"
                  placeholder="Tài khoản"
                  multiline
                  name="userName"
                  value={formValues.userName}
                  // onChange={(e) => setUserName(e.target.value)}
                  onChange={handleChange}
                  helperText={formErrors.userName && formValues.userName.length == "" ? formErrors.userName : null}
                />

              </Box>
            </div>
          </div> */}

          {/* <div className="inputField" style={{ textAlign: "center" }}>
            <div className="box">
              <div className="icon">

              </div>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 0, width: '100%' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  error={formErrors.password != null && formValues.password.length == ""}
                  id="outlined-password-input"
                  label="Mật khẩu"
                  type="password"
                  autoComplete="current-password"
                  name="password"
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  value={formValues.password}
                  onChange={handleChange}
                  helperText={formErrors.password && formValues.password.length == "" ? formErrors.password : null}
                />
              </Box>
            </div>
          </div> */}

          <div style={{ marginLeft: "40px" }}>
            <FormGroup>
              <FormControlLabel className={classes.remember} control={<Checkbox defaultChecked />} label="Nhớ mật khẩu" />
            </FormGroup>
          </div>

          <div style={{ textAlign: "center" }}>
            <Button className={classes.btnSubmit} variant="contained" component="span" onClick={HandleLogin}>
              ĐĂNG NHẬP
            </Button>
          </div>
          <div className={classes.google} >
            <GoogleLogin
              clientId="525769427042-2vrp9m5sfv6g8fb03fdl2dm1ddv1q03r.apps.googleusercontent.com"
              buttonText="Đăng nhập với gmail"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              //isSignedIn={true}
              style={{ width: "100%" }}
            />
          </div>
          <br />
          <div style={{ textAlign: "center" }}>
            <div><a href="/" style={{ textDecoration: "none" }}>Trở về trang chủ</a></div>
            <br />
            <div><span>Quên mật khẩu ? </span><a href="#" style={{ textDecoration: "none" }}>Lấy lại mật khẩu</a></div>
            <div><span>Chưa có tài khoản ? </span><a href="/userRegister" style={{ textDecoration: "none" }}>Đăng ký ngay</a></div>
          </div>

        </form>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleCloseToast}
          message={props.login.message}
          autoHideDuration={5000}
        />

      </div>
    </div>
  );
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  login: makeSelectLogin(),
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
)(Login);
