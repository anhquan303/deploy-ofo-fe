/**
 *
 * Login
 *
 */

import React, { memo } from 'react';
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
import { Link } from 'react-router-dom';


export function Login() {
  useInjectReducer({ key: 'login', reducer });
  useInjectSaga({ key: 'login', saga });

  const responseGoogle = (response) => {
    setToken(response.tokenObj.id_token);
    console.log('google', response)
  }

  return (
    // <div>
    //   <Helmet>
    //     <title>Login</title>
    //     <meta name="description" content="Description of Login" />
    //   </Helmet>
    //   <FormattedMessage {...messages.header} />
    // </div>
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

          <div className="google">
            <GoogleLogin
              clientId="525769427042-2vrp9m5sfv6g8fb03fdl2dm1ddv1q03r.apps.googleusercontent.com"
              buttonText="Đăng nhập với gmail"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            //isSignedIn={true}
            />
          </div>

          <div className="inputField" style={{ textAlign: "center" }}>
            <div className="box">
              <div className="icon">

              </div>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-textarea"
                  label="Tài khoản"
                  placeholder="Tài khoản"
                  multiline
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
                  '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-password-input"
                  label="Mật khẩu"
                  type="password"
                  autoComplete="current-password"
                />
              </Box>
            </div>
          </div>
          <label>
            <FormGroup>
              <FormControlLabel className="remember" control={<Checkbox defaultChecked />} label="Nhớ mật khẩu" />
            </FormGroup>
          </label>

          <Button className="btnSubmit" variant="contained" component="span">
            ĐĂNG NHẬP
          </Button>
          <Link to="/sellerRegister" style={{ textDecoration: "none" }}>
            <Button className="btnRegister" variant="contained" component="span">
              ĐĂNG KÝ ĐỐI TÁC
            </Button>
          </Link>
          <br />
          <br />
          <div className="backHome"><a href="#" className="aBackHome">Trở về trang chủ</a></div>
          <br />
          <div><span>Quên mật khẩu ? </span><a href="#" className="forget">Lấy lại mật khẩu</a></div>
          <div className="account"><span>Không có tài khoản ? </span><a href="/userRegister" className="forget">Đăng ký ngay</a></div>


        </form>


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
