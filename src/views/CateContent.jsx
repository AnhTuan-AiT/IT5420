import { Divider, Grid } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import React, { Fragment, useEffect, useState } from "react";
import { request } from "../api";
import Paper from "../components/Paper";

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
  divider: {
    margin: "12px 0px",
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

function CateContent({ location }) {
  const classes = useStyles();
  const [papers, setPapers] = useState();
  const hotNews = true;

  //
  useEffect(() => {
    let url = location.pathname.substring(1);
    url = "news";

    request("get", `${url}/0/10`, (res) => {
      const data = res.data.content;
      const hot = data[0];
      data.shift();

      setPapers({ hot: hot, mdList: data });
    });
  }, [location]);

  return (
    <Grid container spacing={2} justify="center">
      <Grid item className={classes.div1}>
        {hotNews ? (
          <>
            <Paper lg paper={papers?.hot} />
            <Divider variant="fullWidth" className={classes.divider} />
          </>
        ) : null}

        {/*  */}
        {papers ? (
          papers.mdList.map((p, index) => (
            <Fragment key={p.id}>
              <Paper md paper={p} />
              {index === papers.mdList.length - 1 ? null : (
                <Divider variant="fullWidth" className={classes.divider} />
              )}
            </Fragment>
          ))
        ) : hotNews ? ( // Loading screen.
          <div className={classes.mdWrapper}>
            <Paper md />
          </div>
        ) : (
          Array(4)
            .fill(0)
            .map((index) => (
              <Fragment key={index}>
                <Paper md />
                <Divider variant="fullWidth" className={classes.divider} />
              </Fragment>
            ))
        )}
      </Grid>

      {/* abc */}
      <Grid item className={classes.div}>
        {papers
          ? papers.mdList.map((p, index) => (
              <Fragment key={p.id}>
                {index === 0 ? null : (
                  <Divider variant="fullWidth" className={classes.divider} />
                )}
                <Paper sm paper={p} />
              </Fragment>
            ))
          : // Loading screen.
            Array(5)
              .fill(0)
              .map((ele, index) => (
                <Fragment key={index}>
                  {index === 0 ? null : (
                    <Divider variant="fullWidth" className={classes.divider} />
                  )}
                  <Paper sm />
                </Fragment>
              ))}
      </Grid>
    </Grid>
  );
}

export default CateContent;
