/**
 *
 * SideBar
 *
 */

import React, { memo, useCallback, useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import CloseIcon from '@mui/icons-material/Close';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


import Logo from '../../images/Happy_Delivery_Man_logo_cartoon_art_illustration.jpg';
//import './index.css';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { makeStyles, Container, Typography } from '@material-ui/core';
import { fontWeight } from '@mui/system';


const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    paddingTop: theme.spacing(5),
    backgroundColor: "white",
    textDecoration: "none",

  },
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    transition: '0.4s',
    borderRadius: "10px",
    padding: "10px 0",

    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
      cursor: "pointer",
      "&:hover": {
        color: "#FF9900",
        marginLeft: "20px",
        backgroundColor: "#FFD18C"
      },
    },

  },
  topLogo: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(3),
      cursor: "pointer"
    },
  },
  textLogo: {
    fontWeight: 600,
    fontSize: 30,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  text: {
    fontWeight: "580",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  logo: {
    width: "5rem",
    height: "4rem",
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "1.5rem",
      height: "2rem",
    },
    [theme.breakpoints.up("sm")]: {
      width: "4rem",
      height: "4rem",
    }

  },
  link: {
    textDecoration: "none",
    color: "#7d8da1",
    alignItems: "center",
    "&.active": {
      color: "#FFAC30"
    }
  },
  icon: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(2),
    fontSize: "1.6rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "40px"
    }
  },
  span: {
    color: "#FFAC30"
  }

}));


function SideBar(props) {
  // const drawerWidth = 240;
  // const { window } = props;
  // const [mobileOpen, setMobileOpen] = useState(false);
  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  // const drawer = (
  //   <div className="bodyy">
  //     <div className="container1">
  //       <aside>
  //         <div className="topp">
  //           <div className="logo">
  //             <img src={Logo} alt="logo" />
  //             <h2>No <span>Nê</span></h2>
  //           </div>
  //           <div className="close" id="close-btn">
  //             <CloseIcon />
  //           </div>
  //         </div>
  //         <div className="sidebarr">
  //           <NavLink to="/dashboard">
  //             <span><DashboardRoundedIcon /></span>
  //             <h3>Dashboard</h3>
  //           </NavLink>

  //           <NavLink to="/customer">
  //             <span><PersonIcon /></span>
  //             <h3>Customer</h3>
  //           </NavLink>
  //           <NavLink to="/account">
  //             <span><AccountBoxIcon /></span>
  //             <h3>Account</h3>
  //           </NavLink>
  //           <NavLink to="/store">
  //             <span><StoreIcon /></span>
  //             <h3>Store</h3>
  //           </NavLink>
  //           <NavLink to="/order">
  //             <span><LocalGroceryStoreIcon /></span>
  //             <h3>Order</h3>
  //           </NavLink>
  //           <NavLink to="/report">
  //             <span><ReportProblemIcon /></span>
  //             <h3>Report</h3>
  //             <span className="report-count">12</span>
  //           </NavLink>
  //           <NavLink to="/register">
  //             <span><FastfoodIcon /></span>
  //             <h3>Register</h3>
  //             <span className="report-count">13</span>
  //           </NavLink>
  //           <NavLink to="/setting">
  //             <span><SettingsIcon /></span>
  //             <h3>Setting</h3>
  //           </NavLink>
  //           <NavLink to="/logout">
  //             <span><LogoutIcon /></span>
  //             <h3>Log out</h3>
  //           </NavLink>
  //         </div>
  //       </aside>
  //     </div>
  //   </div>
  // );



  // const mobile = (
  //   <Container className={classes.container}>
  //     <div className={classes.item}>
  //       <NavLink to="/dashboard">
  //         <DashboardRoundedIcon className={classes.icon} />
  //         <Typography className={classes.text}>Dashboard</Typography>
  //       </NavLink>
  //     </div>
  //     <div className={classes.item}>
  //       <NavLink to="/customer">
  //         <PersonIcon className={classes.icon} />
  //         <Typography className={classes.text}>Customer</Typography>
  //       </NavLink>
  //     </div>
  //     <div className={classes.item}>
  //       <NavLink to="/account">
  //         <AccountBoxIcon className={classes.icon} />
  //         <Typography className={classes.text}>Account</Typography>
  //       </NavLink>
  //     </div>
  //     <div className={classes.item}>
  //       <NavLink to="/store">
  //         <StoreIcon className={classes.icon} />
  //         <Typography className={classes.text}>Store</Typography>
  //       </NavLink>
  //     </div>
  //     <div className={classes.item}>
  //       <NavLink to="/order">
  //         <LocalGroceryStoreIcon className={classes.icon} />
  //         <Typography className={classes.text}>Order</Typography>
  //       </NavLink>
  //     </div>
  //     <div className={classes.item}>
  //       <NavLink to="/report">
  //         <ReportProblemIcon className={classes.icon} />
  //         <Typography className={classes.text}>Report</Typography>
  //       </NavLink>
  //     </div>
  //     <div className={classes.item}>
  //       <NavLink to="/register">
  //         <FastfoodIcon className={classes.icon} />
  //         <Typography className={classes.text}>Register</Typography>
  //       </NavLink>
  //     </div>
  //     <div className={classes.item}>
  //       <NavLink to="/setting">
  //         <SettingsIcon className={classes.icon} />
  //         <Typography className={classes.text}>Setting</Typography>
  //       </NavLink>
  //     </div>
  //     <div className={classes.item}>
  //       <NavLink to="/logout">
  //         <LogoutIcon className={classes.icon} />
  //         <Typography className={classes.text}>Log out</Typography>
  //       </NavLink>
  //     </div>
  //   </Container>
  // )

  // const container = window !== undefined ? () => window().document.body : undefined;
  const classes = useStyles();
  return (

    // <div className="bodyy">
    //   <div className="container1">
    //     <aside>
    //       <div className="topp">
    //         <div className="logo">
    //           <img src={Logo} alt="logo" />
    //           <h2>No <span>Nê</span></h2>
    //         </div>
    //         <div className="close" id="close-btn">
    //           <CloseIcon />
    //         </div>
    //       </div>
    //       <div className="sidebarr">
    //         <NavLink to="/dashboard">
    //           <span><DashboardRoundedIcon /></span>
    //           <h3>Dashboard</h3>
    //         </NavLink>

    //         <NavLink to="/customer">
    //           <span><PersonIcon /></span>
    //           <h3>Customer</h3>
    //         </NavLink>
    //         <NavLink to="/account">
    //           <span><AccountBoxIcon /></span>
    //           <h3>Account</h3>
    //         </NavLink>
    //         <NavLink to="/store">
    //           <span><StoreIcon /></span>
    //           <h3>Store</h3>
    //         </NavLink>
    //         <NavLink to="/order">
    //           <span><LocalGroceryStoreIcon /></span>
    //           <h3>Order</h3>
    //         </NavLink>
    //         <NavLink to="/report">
    //           <span><ReportProblemIcon /></span>
    //           <h3>Report</h3>
    //           <span className="report-count">12</span>
    //         </NavLink>
    //         <NavLink to="/register">
    //           <span><FastfoodIcon /></span>
    //           <h3>Register</h3>
    //           <span className="report-count">13</span>
    //         </NavLink>
    //         <NavLink to="/setting">
    //           <span><SettingsIcon /></span>
    //           <h3>Setting</h3>
    //         </NavLink>
    //         <NavLink to="/logout">
    //           <span><LogoutIcon /></span>
    //           <h3>Log out</h3>
    //         </NavLink>
    //       </div>
    //     </aside>
    //   </div>
    // </div>
    // <Box sx={{ display: 'flex' }}>
    //   {mobile}

    //   <Box
    //     component="nav"
    //     sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    //     aria-label="mailbox folders"
    //   >
    //     <Drawer
    //       container={container}
    //       variant="temporary"
    //       open={mobileOpen}
    //       onClose={handleDrawerToggle}
    //       ModalProps={{
    //         keepMounted: true, // Better open performance on mobile.
    //       }}
    //       sx={{
    //         display: { xs: 'block', sm: 'none' },
    //         '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
    //       }}
    //     >
    //       {drawer}
    //     </Drawer>
    //     <Drawer
    //       variant="permanent"
    //       sx={{
    //         display: { xs: 'none', sm: 'block' },
    //         '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
    //       }}
    //       open
    //     >
    //       {drawer}
    //     </Drawer>

    //   </Box>
    // </Box>
    <Container className={classes.container}>
      <div className={classes.topLogo}>
        <img src={Logo} alt="logo" className={classes.logo} />
        <Typography className={classes.textLogo}>No <span className={classes.span}>Nê</span></Typography>
      </div>
      <NavLink to="/dashboard" className={classes.link}>
        <div className={classes.item}>
          <DashboardRoundedIcon className={classes.icon} />
          <Typography className={classes.text}>Dashboard</Typography>
        </div>
      </NavLink>
      <NavLink to="/customer" className={classes.link}>
        <div className={classes.item}>
          <PersonIcon className={classes.icon} />
          <Typography className={classes.text}>Customer</Typography>
        </div>
      </NavLink>
      <NavLink to="/account" className={classes.link}>
        <div className={classes.item}>
          <AccountBoxIcon className={classes.icon} />
          <Typography className={classes.text}>Account</Typography>
        </div>
      </NavLink>
      <NavLink exact to="/store" className={classes.link}>
        <div className={classes.item}>
          <StoreIcon className={classes.icon} />
          <Typography className={classes.text}>Store</Typography>
        </div>
      </NavLink >
      <NavLink to="/order" className={classes.link}>
        <div className={classes.item}>
          <LocalGroceryStoreIcon className={classes.icon} />
          <Typography className={classes.text}>Order</Typography>
        </div>
      </NavLink>
      <NavLink to="/report" className={classes.link}>
        <div className={classes.item}>
          <ReportProblemIcon className={classes.icon} />
          <Typography className={classes.text}>Report</Typography>
        </div>
      </NavLink>
      {/* <NavLink to="/register" className={classes.link}>
        <div className={classes.item}>
          <FastfoodIcon className={classes.icon} />
          <Typography className={classes.text}>Register</Typography>
        </div>
      </NavLink> */}
      <NavLink to="/setting" className={classes.link}>
        <div className={classes.item}>
          <SettingsIcon className={classes.icon} />
          <Typography className={classes.text}>Setting</Typography>
        </div>
      </NavLink>
      <NavLink to="/logout" className={classes.link}>
        <div className={classes.item}>
          <LogoutIcon className={classes.icon} />
          <Typography className={classes.text}>Log out</Typography>
        </div>
      </NavLink>
    </Container >
  );
}

SideBar.propTypes = {};

export default memo(SideBar);
