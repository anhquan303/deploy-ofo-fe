/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { logOut } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Box, AppBar, Toolbar, Select, MenuItem, FormControl } from '@mui/material';
import { makeStyles, Container, Typography, Grid, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { getUser, removeUserSession } from '../../utils/common';


const key = 'home';

export function HomePage(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [language, setLanguage] = useState("English");
  console.log(props)
  //const dispatch = useDispatch();

  const user = getUser();
  const handleLogout = (e) => {
    e.preventDefault();
    //dispatch(logOut());
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

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
