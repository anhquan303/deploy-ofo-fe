/**
 *
 * DetailRegister
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
import makeSelectDetailRegister from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Box, TextField } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { makeStyles, Grid, Button } from '@material-ui/core';
import ShopImage from '../../images/kinh-nghiem-mo-quan-an-nho-2.jpg';
import Menu from '../../images/menu.jpg';
import Certi from '../../images/mau-an-toan-thuc-pham.jpg';

const useStyles = makeStyles((theme) => ({
  information_image: {
    background: "#fff",
    padding: "20px",
    borderRadius: "50px",
    marginTop: "1rem",
    boxShadow: "0 2rem 3rem rgba(132, 139, 200, 0.18)",
    transition: "0.5s",
    height: "100%",
    backgroundImage: `url(${ShopImage})`,
    backgroundSize: "cover",
    [theme.breakpoints.down("sm")]: {
      height: "200px"
    },
    // [theme.breakpoints.between("xl", "lg")]: {
    //   height: "650px"
    // },
    // [theme.breakpoints.down("lg")]: {
    //   height: "400px"
    // },
    // [theme.breakpoints.down("md")]: {
    //   height: "300px"
    // },
  },
  information_one: {
    background: "#fff",
    padding: "20px",
    borderRadius: "50px",
    marginTop: "1rem",
    boxShadow: "0 2rem 3rem rgba(132, 139, 200, 0.18)",
    transition: "0.5s",
    height: "100%",
  },
  pending: {
    fontWeight: "600",
    fontSize: "1.5em",
    textAlign: "center",
    color: "#DAF33D",
  },
  btnChangeStatus: {
    // "& .MuiButton-root": {
    //   borderRadius: "90px",
    //   color: "#000",
    // },
    position: "relative",
    width: "100%",
    borderRadius: "10px",
    backgroundColor: "#ff9900",
    color: "#fff",
    margin: "0 auto",
    "&:hover": {
      backgroundColor: "#FFA500",
      fontWeight: "bold",
      color: "#000",
      boxShadow: "2rem 2rem 3rem rgba(132, 139, 200, 0.18)",
    },
    [theme.breakpoints.up("xl")]: {
      height: "100px",
    },
  },
  verify: {
    textAlign: "center",
    marginTop: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto"
    }

  },
  divCheckIcon: {
    width: "100px",
    height: "100px",
    margin: "0 auto",
    [theme.breakpoints.up("xl")]: {
      width: "200px",
      height: "200px",
    },

  },
  text: {
    [theme.breakpoints.between("xl", "md")]: {
      fontSize: "40px",
      fontWeight: "700",
      fontFamily: "sans-serif",
      fontStyle: "normal"
    },
    [theme.breakpoints.between("lg", "xl")]: {
      fontSize: "60px",
      fontWeight: "700",
      fontFamily: "sans-serif",
      fontStyle: "normal"
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "30px",
      fontWeight: "700",
      fontFamily: "sans-serif",
      fontStyle: "normal"
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "20px",
      fontWeight: "700",
      fontFamily: "sans-serif",
      fontStyle: "normal"
    },
  },
  one: {
    [theme.breakpoints.down("sm")]: {
      order: "1"
    },
    [theme.breakpoints.down("md")]: {
      order: "0"
    },
    [theme.breakpoints.down("xs")]: {
      order: "1"
    }
  },
  two: {
    [theme.breakpoints.down("sm")]: {
      order: "2"
    },
  },
  three: {
    [theme.breakpoints.down("sm")]: {
      order: "3"
    }
  },
  zero: {
    [theme.breakpoints.down("sm")]: {
      order: "0"
    },
    [theme.breakpoints.down("sm")]: {
      order: "1"
    },
    [theme.breakpoints.down("xs")]: {
      order: "0"
    }
  },
  detailImg: {
    width: "70%",
    heigth: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      heigth: "90%",
    },
  },
  detailText: {
    fontSize: "20px",
    fontFamily: "san-serif",
    [theme.breakpoints.up("sm")]: {
      fontSize: "15px",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "20px",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "30px",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "40px",
    },
  },
  titleText: {
    fontSize: "20px",
    fontWeight: "bolder",
    fontFamily: "san-serif",
    [theme.breakpoints.down("md")]: {
      fontSize: "15px",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "20px",
    },
    [theme.breakpoints.up("xl")]: {
      fontSize: "35px",
    },
  }

}));

export function DetailRegister(props) {
  useInjectReducer({ key: 'detailRegister', reducer });
  useInjectSaga({ key: 'detailRegister', saga });

  console.log('param ', props.location.state.item)

  const classes = useStyles();
  return (
    <div style={{ paddingRight: "15px" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12} xs={12} >
            <div className={classes.information_image}>

            </div>
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <div className={classes.information_one}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item sm={8} xs={12} className={classes.one}>

                    <div className={classes.intro}>
                      <p className={classes.text}>{props.location.state.item.name}</p>
                      <p className={classes.text}>Thôn 8, Thạch Thất</p>
                      <p className={classes.text}>3535453435</p>
                    </div>

                  </Grid>
                  <Grid item sm={4} xs={12} className={classes.zero}>
                    <div className={classes.divCheckIcon} >
                      <CheckCircleIcon style={{ width: "100%", height: "100%", color: "#5890FF" }} />
                    </div>

                  </Grid>
                  <Grid item md={5} sm={8} xs={12} className={classes.two}>

                    <div className={classes.pending}>
                      <p>Pending</p>
                    </div>

                  </Grid>
                  <Grid item md={7} sm={4} xs={12} className={classes.three}>

                    <div className={classes.verify}>
                      <Button variant="contained" component="span" className={classes.btnChangeStatus}>
                        Change Status
                      </Button>
                    </div>

                  </Grid>
                </Grid>
              </Box>
            </div>
          </Grid>
        </Grid>

        <div style={{ backgroundColor: "#FFFFFF", marginTop: "30px", padding: "20px", borderRadius: "20px" }}>
          <Box sx={{ flexGrow: 1 }} >
            <Grid container spacing={3} >
              <Grid item md={4} sm={4} xs={12}>
                <div style={{ textAlign: "center" }}>
                  <p className={classes.detailText}>Owner: {props.location.state.item.user.username}</p>
                  <p className={classes.detailText}>Register ar: 04/08/2022</p>
                  <p className={classes.detailText}>Cell Phone: {props.location.state.item.user.phoneNumber}</p>
                  <p className={classes.detailText}>Email: {props.location.state.item.user.email}</p>
                  <p className={classes.detailText}>Open Time: {props.location.state.item.open_time}</p>
                  <p className={classes.detailText}>Close Time: {props.location.state.item.close_time}</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p className={classes.titleText}>Menu</p>
                  <img src={Menu} alt="menu" className={classes.detailImg} />
                </div>
              </Grid>
              <Grid item md={4} sm={4} xs={12}>
                <div style={{ textAlign: "center" }}>
                  <p className={classes.titleText}>Căn cước công dân mặt trước</p>
                  <img src={Menu} alt="menu" className={classes.detailImg} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <p className={classes.titleText}>Căn cước công dân mặt sau</p>
                  <img src={Menu} alt="menu" className={classes.detailImg} />
                </div>
              </Grid>
              <Grid item md={4} sm={4} xs={12}>
                <div style={{ textAlign: "center" }}>
                  <p className={classes.titleText}>Chứng nhận thực phẩm sạch</p>
                  <img src={Certi} alt="menu" className={classes.detailImg} />
                </div>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Box>

    </div >
  );
}

DetailRegister.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  detailRegister: makeSelectDetailRegister(),
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
)(DetailRegister);
