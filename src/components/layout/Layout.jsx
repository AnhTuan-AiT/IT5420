import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import NavTabs from "../NavTabs";
import Search from "../Search";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
  },
  container: {
    padding: "1rem 0rem",
  },
  searchContainer: {
    padding: "1rem 0rem",
    display: "flex",
    justifyContent: "center",
  },
}));

function Layout(props) {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* Search box */}
      <Container className={classes.searchContainer} maxWidth="md">
        <Search />
      </Container>

      {/* Navbar */}
      <NavTabs />

      {/* Main content */}
      <Container className={classes.container} component="main" maxWidth="md">
        {children}
      </Container>
    </div>
  );
}

export default Layout;
