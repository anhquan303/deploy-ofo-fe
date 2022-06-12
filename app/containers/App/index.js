/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, useLocation } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Login from 'containers/Login/Loadable';
import UserRegister from '../UserRegister';
import Dashboard from '../../containers/Dashboard';
import DashboardStore from '../../containers/DashboardStore';
import DetailStore from '../../containers/DetailStore';
import SellerRegister from '../../containers/SellerRegister';
import Header from 'components/Header';
import Footer from 'components/Footer';

import GlobalStyle from '../../global-styles';

import SideBar from '../../components/SideBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

export default function App() {
  const location = useLocation();
  console.log(location.pathname)


  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      {/* <Header /> */}

      {location.pathname != "/login" && location.pathname != "/userRegister" && location.pathname != "/sellerRegister" ?
        <Grid container spacing={2}>
          <Grid item sm={2} xs={2}>
            <SideBar />
          </Grid>
          <Grid item sm={10} xs={10}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/features" component={FeaturePage} />
              <Route path="/login" component={Login} />
              <Route path="/userRegister" component={UserRegister} />
              <Route path="/sellerRegister" component={SellerRegister} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/store" component={DashboardStore} />
              <Route path="/detailStore" component={DetailStore} />
              <Route path="" component={NotFoundPage} />

            </Switch>
          </Grid>
        </Grid>
        :
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/features" component={FeaturePage} />
              <Route path="/login" component={Login} />
              <Route path="/userRegister" component={UserRegister} />
              <Route path="/sellerRegister" component={SellerRegister} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/detailStore" component={DetailStore} />
              <Route path="" component={NotFoundPage} />

            </Switch>
          </Grid>
        </Grid>
      }

      {/* <Footer /> */}
      <GlobalStyle />
    </AppWrapper >
  );
}
