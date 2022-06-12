/**
 *
 * CustomTable
 *
 */

import React, { memo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const useStyles = makeStyles(() => ({
  all: {
    marginTop: "20px",
    background: "#ffffff",
    width: "100%",
    borderRadius: "40px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 2rem 3rem rgba(132, 139, 200, 0.18)",
    transition: "0.5s",
  },
  table: {
    width: "100%",
    padding: "20px",
    textAlign: "center",
  },
  tr: {
    height: "2.8rem",
    borderBottom: "1px solid rgba(132, 139, 200, 0.18)",
    color: "#677483",
    "&:hover": {
      backgroundColor: "#ececec",
    },
  },


  pagination: {
    marginTop: "10px",
    justifyContent: "center",
    display: "flex",
    listStyle: "none",
    borderRadius: "0.25rem"
  },
  th: {
    fontSize: "24px",
    fontWeight: "bolder",
    color: "#000000"
  }

}));

function CustomTable({ data, itemPerPage, totalItem, header, detailPage }) {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  var length = Math.ceil(totalItem / itemPerPage);
  const pageNumber = [];

  for (var i = 1; i <= length; i++) {
    pageNumber.push(i);
  }
  const history = useHistory();
  const handleClick = (item) => {
    const location = {
      pathname: `/${detailPage}`,
      state: {
        item: item
      }
    }
    history.push(location)
  }

  const handleChangPage = (event, page) => {
    console.log('page', page)
    console.log('e', event)
    setCurrentPage(page)
  }

  return (
    <div className={classes.all}>
      <table className={classes.table}>
        <thead>
          <tr>
            {header.map((item) =>
              <th scope="col" key={item} className={classes.th}>{item}</th>
            )}
          </tr>

        </thead>
        <tbody>

          {Object.values(currentItems).map((obj, index) => (
            <tr key={index} onClick={() => handleClick(obj)} className={classes.tr}>
              {Object.values(obj).map((value, index2) => (
                <td key={index2}>{value}</td>
              ))}
            </tr>
          ))}

        </tbody>
      </table>
      <nav className={classes.pagination}>
        <Stack spacing={2}>
          <Pagination count={length} onChange={handleChangPage} />
          {/* <Pagination count={10} color="primary" />
                    <Pagination count={10} color="secondary" />
                    <Pagination count={10} disabled /> */}
        </Stack>
      </nav>
    </div >
  );
}

CustomTable.propTypes = {};

export default memo(CustomTable);
