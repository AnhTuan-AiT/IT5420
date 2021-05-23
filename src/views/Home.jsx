import { Grid, Link } from "@material-ui/core";
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
    zIndex: -1,
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

function Content({ hotNews, location }) {
  const classes = useStyles();
  const [papers, setPapers] = useState();
  const params = useParams();

  const title = ["Thế giới", "Xã hội", "Kinh tế", "Thể thao"];

  //
  useEffect(() => {
    let url = location.pathname.substring(1);
    url = url === "" ? "news" : url;
    if (params.paperName) url = `news/${params.paperName}`;

    request("get", `${url}?offset=0&limit=20`, (res) => {
      setPapers(res.data.content);
    });
  }, [location]);

  return (
    <Grid container spacing={2} justify="center">
      <Grid item className={classes.div1}>
        {hotNews ? <Paper lg paper={papers?.hot} /> : null}
        {papers ? (
          title.map((cate) => (
            <Fragment key={cate}>
              <Link href="#" className={classes.cate}>
                {cate}
              </Link>
              {papers.map((p, index) => (
                <Fragment key={p.id}>
                  <Paper md paper={p} />
                  {index === papers.length - 1 ? null : <StyledDivider />}
                </Fragment>
              ))}
            </Fragment>
          ))
        ) : hotNews ? ( // Loading screen.
          <div className={classes.mdWrapper}>
            <Paper md />
            <StyledDivider />
            <Paper md />
          </div>
        ) : (
          Array(4)
            .fill(0)
            .map((index) => (
              <Fragment key={index}>
                <Paper md />
                <StyledDivider />
              </Fragment>
            ))
        )}
      </Grid>

      {/* abc */}
      <Grid item className={classes.div}>
        {papers
          ? papers.map((p, index) => (
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

export default Content;
