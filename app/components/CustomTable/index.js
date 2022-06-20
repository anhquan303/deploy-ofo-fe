/**
 *
 * CustomTable
 *
 */

import React, { memo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Link, Route, useHistory } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { DetailStore } from '../../containers/DetailStore';

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
    borderCollapse: "collapse"
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

function CustomTable({ data, itemPerPage, totalItem, detailPage, columns }) {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  console.log(totalItem)

  var length = Math.ceil(totalItem / itemPerPage);
  const pageNumber = [];

  for (var i = 1; i <= length; i++) {
    pageNumber.push(i);
  }
  const history = useHistory();

  const handleClick = (item) => {
    const location = {
      pathname: `/${detailPage}/${item.id}`,
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

  const TableHeadItem = ({ item }) => <th className={classes.th}>{item.title}</th>
  const TableRowItem = ({ item, columns }) =>
  (

    <tr className={classes.tr} onClick={() => handleClick(item)}>
      {columns.map((columnsItem, index) => {
        return <td key={index}>{item[`${columnsItem.field}`]}</td>
      })}
    </tr>

  )

  return (
    <div className={classes.all}>
      <table className={classes.table}>
        <thead>
          <tr>
            {/* {header.map((item) =>
              <th scope="col" key={item} className={classes.th}>{item}</th>
            )} */}
            {/* {columns.map((item, index) =>
              <th key={index} className={classes.th}>{item.title}</th>)} */}
            {columns.map((item, index) => <TableHeadItem item={item} key={index} />)}
          </tr>

        </thead>
        <tbody>

          {/* {Object.values(currentItems).map((obj, index) => (
            <tr key={index} onClick={() => handleClick(obj)} className={classes.tr}>
              {Object.values(obj).map((value, index2) => (
                <td key={index2}>{value}</td>
              ))}
            </tr>
          ))} */}
          {currentItems.map((item, index) => <TableRowItem item={item} columns={columns} key={index} />)}
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
      {/* <Route path="/store/:id" component={DetailStore} /> */}
    </div >
  );
}

CustomTable.propTypes = {};

export default memo(CustomTable);
