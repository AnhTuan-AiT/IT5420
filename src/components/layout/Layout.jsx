import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import NavTabs from "../NavTabs";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    padding: "1rem 0rem",
  },
}));

function Layout(props) {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavTabs />
      <Container className={classes.container} component="main" maxWidth="md">
        {children}
      </Container>
    </div>
  );
}

export default Layout;
