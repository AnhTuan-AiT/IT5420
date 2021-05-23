import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { Fragment } from "react";
import Paper from "./Paper";
import { StyledDivider } from "./StyledDivider";

const useStyles = makeStyles((theme) => ({
  secondaryContent: {
    maxWidth: 330,
    width: "100%",
  },
}));

function News({ news }) {
  const classes = useStyles();

  return (
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
  );
}

export default News;
