import { Grid, Typography } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import request from "../api";
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
  noResult: {
    background: "#FEF3C7",
    color: "#B45309",
    padding: 12,
  },
}));

function SearchContent({ location }) {
  const classes = useStyles();
  const params = useParams();

  //
  const [searchResult, setSearchResult] = useState();
  const [news, setNews] = useState();

  //
  useEffect(() => {
    request(
      "get",
      `news/similar?news_id=${params.id}`,
      (res) => {
        let data = res.data;

        if (params.paperName) data = data.content;
        setSearchResult(data);
      },
      { onError: () => setSearchResult([]) }
    );

    request(
      "get",
      `news?offset=0&limit=10`,
      (res) => {
        setNews(res.data.content);
      },
      { onError: () => setNews([]) }
    );
  }, [location]);

  return (
    <Grid container spacing={2} justify="center">
      <Grid item className={classes.primaryContent}>
        {searchResult ? (
          searchResult.length > 0 ? (
            searchResult.map((p, index) => (
              <Fragment key={p.id}>
                <Paper md paper={p} />
                {index === searchResult.length - 1 ? null : <StyledDivider />}
              </Fragment>
            ))
          ) : (
            <Typography className={classes.noResult}>
              Không tìm thấy kết quả nào phù hợp!
            </Typography>
          )
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
      <Grid item className={classes.secondaryContent}>
        {news
          ? news.map((p, index) => (
              <Fragment key={p.id}>
                {index === 0 ? null : <StyledDivider />}
                <Paper sm paper={p} />
              </Fragment>
            ))
          : // Loading screen.
            Array(5)
              .fill(0)
              .map((ele, index) => (
                <Fragment key={index}>
                  {index === 0 ? null : <StyledDivider />}
                  <Paper sm />
                </Fragment>
              ))}
      </Grid>
    </Grid>
  );
}

export default SearchContent;
