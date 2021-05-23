import { Grid } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import React, { Fragment, useEffect, useRef, useState } from "react";
import request from "../api";
import News from "../components/News";
import Pagination from "../components/Pagination";
import Paper from "../components/Paper";
import { StyledDivider } from "../components/StyledDivider";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  secondaryContent: {
    maxWidth: 330,
    width: "100%",
  },
  primaryContent: {
    maxWidth: 625,
    paddingBottom: 32,
    width: "100%",
  },
  cate: {
    position: "relative",
    display: "inline-block",
    fontSize: 22,
    padding: "4px 12px 12px",
    textTransform: "uppercase",
    color: orange[500],
    textDecoration: "none",
    "&:hover": { textDecoration: "none", color: orange[900] },
    "&::before": {
      content: '""',
      display: "inline-block",
      width: 2,
      height: "calc(100% - 16px)",
      position: "absolute",
      top: 4,
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

function CateContent({ hotNews, location }) {
  const classes = useStyles();

  //
  const [papers, setPapers] = useState();
  const [news, setNews] = useState();
  const [currPage, setCurrPage] = useState(0);
  const [lastPage, setLastPage] = useState(false);

  //
  const prevPathRef = useRef();

  //
  const onViewNextPage = () => {
    setCurrPage((currPage) => currPage + 1);
    setPapers();
  };

  const onViewPreviousPage = () => {
    setCurrPage((currPage) => currPage - 1);
    setPapers();
  };

  useEffect(() => {
    prevPathRef.current = location.pathname;
  });

  const prevPathname = prevPathRef.current;

  useEffect(() => {
    let offset = currPage;
    let cate = location.pathname.substring(1);

    if (prevPathname !== location.pathname) {
      offset = 0;
      setCurrPage(0);
      setPapers();
      setNews();
    }

    switch (cate) {
      case "world":
        cate = "Thế giới";
        break;
      case "entertainment":
        cate = "Giải trí";
        break;
      case "education":
        cate = "Giáo dục";
        break;
      case "economy":
        cate = "Kinh tế";
        break;
      case "sport":
        cate = "Thể thao";
        break;
    }

    request(
      "get",
      `news/category?category=${cate}&offset=${offset}&limit=50`,
      (res) => {
        const data = res.data;

        if (currPage === 0) {
          const hot = data.content[0];
          data.content.shift();

          setLastPage(data.last);
          setPapers({ hot: hot, mdList: data.content });
        } else {
          setPapers({ mdList: data.content });
        }
      },
      { onError: () => setPapers({ mdList: [] }) }
    );

    request(
      "get",
      `news?offset=0&limit=10`,
      (res) => {
        setNews(res.data.content);
      },
      { onError: () => setNews([]) }
    );
  }, [location, currPage]);

  return (
    <Grid container spacing={2} justify="center">
      <Grid item className={classes.primaryContent}>
        {hotNews && currPage === 0 ? (
          <>
            <Paper lg paper={papers?.hot} />
            {papers ? <StyledDivider /> : null}
          </>
        ) : null}

        {/*  */}
        {papers ? (
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
      </Grid>

      {/* News */}
      <News news={news} />

      {/* Pagination */}
      <Pagination
        show={papers}
        currPage={currPage}
        lastPage={lastPage}
        onPreviousPage={onViewPreviousPage}
        onNextPage={onViewNextPage}
      />
      {/* papers ? */}
    </Grid>
  );
}

export default CateContent;
