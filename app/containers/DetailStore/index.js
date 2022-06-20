/**
 *
 * DetailStore
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
import makeSelectDetailStore from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { useParams } from 'react-router-dom';
import DashboardHeader from '../../components/DashboardHeader';
import ShopImage from '../../images/kinh-nghiem-mo-quan-an-nho-2.jpg';
import { makeStyles } from '@material-ui/core';
import { Grid, Box, Button, TextField, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
    }
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
  approved: {
    fontWeight: "600",
    fontSize: "1.5em",
    textAlign: "center",
    color: "#2AC267",
  },
  btnSubmit: {
    position: "relative",
    width: "100%",
    borderRadius: "10px",
    backgroundColor: "#ff9900",
    margin: "0 auto",
    "&:hover": {
      backgroundColor: "orange",
      fontWeight: "bold",
      color: "#000",
    }
  },
  btnSearch: {
    position: "relative",
    width: "100%",
    borderRadius: "10px",
    backgroundColor: "#ff9900",
    marginTop: "10px",
    marginLeft: "10px",
    "&:hover": {
      backgroundColor: "orange",
      fontWeight: "bold",
      color: "#000",
    },
  },
  verify: {
    // height: "100%",
    // display: "flex",
    // alignContent: "center",
    // flexWrap: "wrap",
    textAlign: "center",
    marginTop: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto"
    }

  },
  information_second: {
    background: "#fff",
    padding: "20px",
    borderRadius: "50px",
    marginTop: "1rem",
    boxShadow: "0 2rem 3rem rgba(132, 139, 200, 0.18)",
    transition: "0.5s",
    height: "100%",
  },
  to: {
    width: "100%"
  },
  intro: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center"
    }
  },
  one: {
    [theme.breakpoints.down("sm")]: {
      order: "1"
    }
  },
  two: {
    [theme.breakpoints.down("sm")]: {
      order: "2"
    }
  },
  three: {
    [theme.breakpoints.down("sm")]: {
      order: "3"
    }
  },
  zero: {
    [theme.breakpoints.down("sm")]: {
      order: "0"
    }
  },
  divCheckIcon: {
    width: "60%",
    height: "60%",
    marginTop: "2.8rem",
    marginLeft: "3rem",
    [theme.breakpoints.down("sm")]: {
      width: "65%",
      height: "65%",
      margin: "0 auto"
    }
  },
  checkIcon: {
    width: "100%",
    height: "100%",
    color: "#5890FF",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto"
    }
  }


}));

export function DetailStore(props) {
  useInjectReducer({ key: 'detailStore', reducer });
  useInjectSaga({ key: 'detailStore', saga });


  let param = useParams();
  console.log('param ', props.location.state.item)
  const classes = useStyles();

  const [value, setValue] = useState(new Date());


  return (
    <div style={{ paddingRight: "15px" }}>
      <DashboardHeader text="Bún Bò Huế" />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item sm={6} xs={12} >
            <div className={classes.information_image}>

            </div>
          </Grid>
          <Grid item sm={6} xs={12}>
            <div className={classes.information_one}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item sm={8} xs={12} className={classes.one}>

                    <div className={classes.intro}>
                      <h1>Bún Bò Huế</h1>
                      <h1>Thôn 8, Thạch Thất</h1>
                      <h2>3535453435</h2>
                    </div>

                  </Grid>
                  <Grid item sm={4} xs={12} className={classes.zero}>

                    <div className={classes.divCheckIcon}>
                      <span ><CheckCircleIcon className={classes.checkIcon} /></span>
                    </div>

                  </Grid>
                  <Grid item sm={8} xs={12} className={classes.two}>

                    <div className={classes.approved}>
                      <p>Approved</p>
                    </div>

                  </Grid>
                  <Grid item sm={4} xs={12} className={classes.three}>

                    <div className={classes.verify}>
                      <Button className={classes.btnSubmit} variant="contained" component="span" style={{ width: "80%" }}>
                        Change Status
                      </Button>
                    </div>

                  </Grid>
                </Grid>
              </Box>
            </div>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <h1>Information</h1>
        <div className={classes.information_second}>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <div style={{ textAlign: "center" }}>
                <span><h2>Owner: Long Le</h2></span>
                <span><h2>Register at: 04/08/2022</h2></span>
              </div>
            </Grid>
            <Grid item sm={6} xs={12}>
              <div style={{ textAlign: "center" }}>
                <span><h2>Cell Phone: 541351351</h2></span>
                <span><h2>Approved at: 04/08/2022</h2></span>
              </div>
            </Grid>
          </Grid>
        </div>
      </Box>

      <div style={{ marginTop: "20px" }}>
        <Grid container spacing={2}>
          <Grid item sm={4} xs={12}>
            <span><h2>Order</h2></span>
          </Grid>
          <Grid item sm={8} xs={12}  >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid container spacing={2}>
                <Grid item sm={3} xs={12}>

                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 0, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <DatePicker
                      label="From"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Box>
                </Grid>
                <Grid item sm={3} xs={12}>
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 0, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <DatePicker
                      label="To"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Box>
                </Grid>
                <Grid item sm={2} xs={12}>
                  <Button className={classes.btnSearch} variant="contained" component="span" style={{ width: "100%" }}>
                    Search
                  </Button>
                </Grid>
              </Grid>
            </LocalizationProvider>

          </Grid>
        </Grid>
      </div>

    </div>
  );
}

DetailStore.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  detailStore: makeSelectDetailStore(),
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
)(DetailStore);
