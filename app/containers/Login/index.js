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
import './login.css';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Logo from '../../images/Happy_Delivery_Man_logo_cartoon_art_illustration.jpg';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import GoogleLogin from 'react-google-login';
import { Link, useHistory } from 'react-router-dom';
import { login } from './actions';
import { getUser } from '../../utils/common';
import Snackbar from '@mui/material/Snackbar';


export function Login(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });

  const responseGoogle = (response) => {
    //setToken(response.tokenObj.id_token);
    console.log('google', response.tokenObj.id_token)
  }

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
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
      // setOpen(true);
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
    <div className="body">
      <div className="container">
        <form>
          <div className="top">
            <div className="logo">
              <img src={Logo} alt="logo" />
              <h2>No <span>Nê</span></h2>
            </div>
          </div>
          <h3>Đăng nhập</h3>

          <div className="inputField" style={{ textAlign: "center", marginBottom: "10px" }}>
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
          </div>

          <div className="inputField" style={{ textAlign: "center" }}>
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
          </div>
          <label>
            <FormGroup>
              <FormControlLabel className="remember" control={<Checkbox defaultChecked />} label="Nhớ mật khẩu" />
            </FormGroup>
          </label>

          <Button className="btnSubmit" variant="contained" component="span" onClick={HandleLogin}>
            ĐĂNG NHẬP
          </Button>

          <div className="google" >
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
          <div className="backHome"><a href="#" className="aBackHome">Trở về trang chủ</a></div>
          <br />
          <div><span>Quên mật khẩu ?</span><a href="#" className="forget">Lấy lại mật khẩu</a></div>
          <div className="account"><span>Chưa có tài khoản ?</span><a href="/userRegister" className="forget">Đăng ký ngay</a></div>


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
