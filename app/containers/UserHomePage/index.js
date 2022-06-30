/**
 *
 * UserHomePage
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
import makeSelectUserHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Box, AppBar, Toolbar, Select, MenuItem, FormControl } from '@mui/material';
import { makeStyles, Container, Typography, Grid, Button } from '@material-ui/core';
import { getUser, removeUserSession } from '../../utils/common';
import { logOut } from './actions';

export function UserHomePage(props) {
  const { dispatch } = props;
  useInjectReducer({ key: 'userHomePage', reducer });
  useInjectSaga({ key: 'userHomePage', saga });

  const [language, setLanguage] = useState("English");

  const user = getUser();
  const handleLogout = () => {
    dispatch(logOut());
    removeUserSession();
    props.history.push("/")
  }

  const handleSellerRegister = () => {
    if (user) {
      props.history.push("/sellerRegister")
    } else {
      props.history.push("/login")
    }
  }

  return (
    <div>
      <AppBar sx={{ background: "#fff" }} position='static'>
        <Toolbar>

          <Button onClick={handleSellerRegister}>Become a seller in No Ne </Button>
          {user ? <Button href='/myStore'>My Store </Button> : null}
          <Box sx={{ marginLeft: 'auto' }} >
            {user == null ?
              <>
                <Button href="/userRegister">Sign up </Button>
                <Button href="/login">Login </Button>
              </>
              : <Button onClick={handleLogout}>Logout </Button>}
          </Box>
        </Toolbar>
      </AppBar>
    </div >
  );
}

UserHomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userHomePage: makeSelectUserHomePage(),
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
)(UserHomePage);
