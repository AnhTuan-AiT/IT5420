import { Grid, Link } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import request, { paralelRequest } from "../api";
import { tabs } from "../components/NavTabs";
import News from "../components/News";
import Pagination from "../components/Pagination";
import Paper from "../components/Paper";
import { StyledDivider } from "../components/StyledDivider";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  div: {
    maxWidth: 330,
    width: "100%",
  },
  div1: {
    maxWidth: 625,
    paddingBottom: 32,
    width: "100%",
  },
  cate: {
    position: "relative",
    display: "inline-block",
    fontSize: 22,
    padding: "12px 12px",
    textTransform: "uppercase",
    color: orange[500],
    textDecoration: "none",
    "&:hover": { textDecoration: "none", color: orange[900] },
    "&::before": {
      content: '""',
      display: "inline-block",
      width: 2,
      height: "calc(100% - 24px)",
      position: "absolute",
      top: 12,
      left: 0,
      background: orange[500],
    },
    "&:hover:before": {
      background: orange[900],
    },
  },
  mdWrapper: {
    padding: "32px 0px",
  },
  mdWrapperNonPadding: {
    padding: 0,
  },
}));

function Content({ hotNews, location }) {
  const classes = useStyles();

  //
  const [papers, setPapers] = useState();
  const [catePapers, setCatePapers] = useState();
  const [currPage, setCurrPage] = useState(0);
  const [lastPage, setLastPage] = useState(false);

  //
  const cate = ["Thế giới", "Kinh tế", "Giáo dục", "Giải trí", "Thể thao"];
  const urls = cate.map((c) => `news/category?category=${c}&offset=0&limit=20`);

  //
  const onViewNextPage = () => {
    if (currPage === 0) setCatePapers();
    setCurrPage((currPage) => currPage + 1);
    setPapers((prev) => ({
      smList: prev.smList,
    }));
  };

  const onViewPreviousPage = () => {
    setCurrPage((currPage) => currPage - 1);
    setPapers((prev) => ({
      smList: prev.smList,
    }));
  };

  // const getCatePapers = () => {
  //   try {
  //     Promise.all(
  //       [...Array(5).keys()].map((idx) =>
  //         axios.get(`${process.env.REACT_APP_API_ENDPOINT}${urls[idx]}`)
  //       )
  //     ).then((responses) => {
  //       const data = [];

  //       responses.forEach((res, idx) => {
  //         data.push({ cate: cate[idx], data: res.data.content });
  //       });

  //       setCatePapers(data);
  //     });
  //   } catch (e) {
  //     if (e.response) {
  //       // The request was made and the server responded with a status code that falls out of the range of 2xx.
  //       console.log(
  //         "The request was made and the server responded with a status code that falls out of the range of 2xx",
  //         e
  //       );
  //     } else if (e.request) {
  //       // The request was made but no response was received
  //       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //       // http.ClientRequest in node.js
  //       console.log(
  //         "The request was made but no response was received",
  //         e.request
  //       );
  //     } else {
  //       // Something happened in setting up the request that triggered an Error.
  //       console.log(
  //         "Something happened in setting up the request that triggered an Error",
  //         e.message
  //       );
  //     }

  //     console.log("Request config", e.config);
  //   }
  // };

  useEffect(() => {
    if (currPage === 0) {
      request("get", `news?offset=0&limit=20`, (res) => {
        const data = res.data.content;
        setPapers({
          hot: data[0],
          mdList: data.slice(1, 10),
          smList: data.slice(10),
        });
      });

      // getCatePapers();
      paralelRequest(
        [...Array(5).keys()].map((idx) =>
          axios.get(`${process.env.REACT_APP_API_ENDPOINT}${urls[idx]}`)
        ),
        (responses) => {
          const data = [];

          responses.forEach((res, idx) => {
            data.push({ cate: cate[idx], data: res.data.content });
          });

          setCatePapers(data);
        }
      );
    } else {
      request("get", `news?offset=${currPage}&limit=50`, (res) => {
        const data = res.data.content;
        setPapers((prev) => ({ mdList: data, smList: prev.smList }));
      });
    }
  }, [location, currPage]);

  return (
    <Grid container spacing={2} justify="center">
      <Grid item className={classes.div1}>
        {hotNews && currPage === 0 ? (
          <>
            <Paper lg paper={papers?.hot} />
            {papers ? <StyledDivider /> : null}
          </>
        ) : null}

        {/* News */}
        {papers?.mdList ? (
          papers.mdList.map((p, index) => (
            <Fragment key={p.id}>
              <Paper md paper={p} />
              {index === papers.mdList.length - 1 ? null : <StyledDivider />}
            </Fragment>
          ))
        ) : hotNews && currPage === 0 ? ( // Loading screen.
          <div className={classes.mdWrapper}>
            <Paper md />
            <StyledDivider />
            <Paper md />
          </div>
        ) : (
          Array(4)
            .fill(0)
            .map((ele, index) => (
              <Fragment key={index}>
                <Paper md />
                <StyledDivider />
              </Fragment>
            ))
        )}

        {/* Cate */}
        {catePapers
          ? catePapers.map((papers) => (
              <Fragment key={papers.cate}>
                <Link
                  component={RouterLink}
                  to={tabs[papers.cate]}
                  className={classes.cate}
                >
                  {papers.cate}
                </Link>
                {papers.data.map((p, index) => (
                  <Fragment key={p.id}>
                    <Paper md paper={p} />
                    {index === papers.data.length - 1 ? null : (
                      <StyledDivider />
                    )}
                  </Fragment>
                ))}
              </Fragment>
            ))
          : null}
      </Grid>

      {/* News */}
      <News news={papers?.smList} />

      {/* Pagination */}
      <Pagination
        show={papers?.mdList}
        currPage={currPage}
        lastPage={lastPage}
        onPreviousPage={onViewPreviousPage}
        onNextPage={onViewNextPage}
      />
      {/* papers?.mdList */}
    </Grid>
  );
}

export default Content;
