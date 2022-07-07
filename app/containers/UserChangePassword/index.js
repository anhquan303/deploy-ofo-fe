/**
 *
 * UserChangePassword
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
import makeSelectUserChangePassword from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Grid, TextField, Container } from '@mui/material';
import { makeStyles, Button } from '@material-ui/core';

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
  font: {
    fontFamily: "sans-serif",
    margin: "0"
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


}));

export function UserChangePassword() {
  useInjectReducer({ key: 'userChangePassword', reducer });
  useInjectSaga({ key: 'userChangePassword', saga });
  const classes = useStyles();

  const initialValues = { newPassword: "", oldPassword: "", verifyPassword: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [accept, setAccept] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  //set value for input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const validate = (values) => {
    const errors = {};
    const regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    if (!values.newPassword) {
      errors.newPassword = "required!";
    }
    if (!values.oldPassword) {
      errors.oldPassword = "required!";
    }
    if (!values.verifyPassword) {
      errors.verifyPassword = "required!";
    }
    if (values.passwordVerify != values.newPassword) {
      errors.passwordVerify1 = "password does not match";
    }
    return errors;
  }

  //check validate
  const handlesubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  }

  return (
    <div>
      <div>
        <p className={classes.font} style={{ fontWeight: "500", fontSize: "25px" }}>Đổi mật khẩu</p>
        <p className={classes.font} style={{ fontWeight: "lighter", fontSize: "15px" }}>Quản lý thông tin để bảo mật tài khoản</p>
      </div>
      <hr />
      <Grid container spacing={0} style={{ marginTop: "15px" }}>
        <Grid item xs={12} md={12} style={{ padding: "10px" }}>
          <div style={{ textAlign: "center" }} className={classes.inside}>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 0, width: '100%' }, marginBottom: "10px"
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                error={formErrors.oldPassword != null && formValues.oldPassword.length == ""}
                id="outlined-password-input"
                label="Mật khẩu cũ"
                type="password"
                autoComplete="current-password"
                name="oldPassword"
                value={formValues.oldPassword}
                onChange={handleChange}
                helperText={formErrors.oldPassword && formValues.oldPassword.length == "" ? formErrors.oldPassword : null}
              />
            </Box>

            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 0, width: '100%' }, marginBottom: "10px"
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                error={formErrors.newPassword != null && formValues.newPassword.length == ""}
                id="outlined-password-input"
                label="Mật khẩu mới"
                type="password"
                autoComplete="current-password"
                name="newPassword"
                value={formValues.newPassword}
                onChange={handleChange}
                helperText={formErrors.newPassword && formValues.newPassword.length == "" ? formErrors.newPassword : null}
              />
            </Box>

            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 0, width: '100%' }, marginBottom: "10px"
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-password-input"
                label="Xác nhận mật khẩu"
                type="password"
                autoComplete="current-password"
                value={formValues.passwordVerify}
                name="passwordVerify"
                onChange={handleChange}
                helperText={formErrors.passwordVerify && formValues.passwordVerify.length == "" ? formErrors.passwordVerify : formErrors.passwordVerify1 ? formErrors.passwordVerify1 : null}
                error={formErrors.passwordVerify != null && formValues.passwordVerify.length == "" ? true : formErrors.passwordVerify1 != null ? true : false}
              />
            </Box>
            <Button className={classes.btn} variant="outlined" startIcon={<SaveIcon />} onClick={handlesubmit}>
              Lưu
            </Button>
          </div>
        </Grid>
      </Grid>
    </div >
  );
}

UserChangePassword.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userChangePassword: makeSelectUserChangePassword(),
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
)(UserChangePassword);
