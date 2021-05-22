import { Box, Grid, Typography } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import request from "../api";
import NegativeButton from "../components/NegativeButton";
import Paper from "../components/Paper";
import PositiveButton from "../components/PositiveButton";
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
  const [currPage, setCurrPage] = useState(0);
  const [lastPage, setLastPage] = useState(false);

  //
  const onViewNextPage = () => {
    setCurrPage((currPage) => currPage + 1);
    setSearchResult();
  };

  const onViewPreviousPage = () => {
    setCurrPage((currPage) => currPage - 1);
    setSearchResult();
  };

  useEffect(() => {
    let url = `news/search?text=${params.keyword}&offset=${currPage}&limit=50`;
    if (params.paperName) {
      url = `news/newspaper?newspaper=${params.paperName}&offset=${currPage}&limit=50`;
    }

    request(
      "get",
      url,
      (res) => {
        let data = res.data;

        setLastPage(data.last);
        setSearchResult(data.content);
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
  }, [location, currPage]);

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
      {searchResult ? (
        <Box
          display="flex"
          justifyContent="center"
          mr="auto"
          width={625}
          mt={3}
          mb={3}
        >
          {currPage > 0 ? (
            <NegativeButton
              onClick={onViewPreviousPage}
              style={{ maxWidth: 100, borderRadius: 6 }}
            >
              Quay lại
            </NegativeButton>
          ) : null}
          {lastPage ? null : (
            <PositiveButton
              onClick={onViewNextPage}
              style={{ maxWidth: 100, borderRadius: 6, marginLeft: 12 }}
            >
              Xem thêm
            </PositiveButton>
          )}
        </Box>
      ) : null}
    </Grid>
  );
}

export default SearchContent;
