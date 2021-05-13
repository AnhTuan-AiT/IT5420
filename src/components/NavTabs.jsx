import Box from "@material-ui/core/Box";
import { purple } from "@material-ui/core/colors";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

const StyledTabs = withStyles({
  root: { background: purple[700] },
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginBottom: 6,
    "& > span": {
      maxWidth: 40,
      width: "100%",
      backgroundColor: "#fff",
    },
  },
})((props) => (
  <Tabs {...props} centered TabIndicatorProps={{ children: <span /> }} />
));

const LinkTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: "#fff",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple component={NavLink} {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const tabs = [
  { label: "Nóng", path: "/" },
  { label: "Mới", path: "/new" },
  { label: "Thế giới", path: "/world" },
  { label: "Xã hội", path: "/society" },
  { label: "Kinh tế", path: "/economy" },
  { label: "Thể thao", path: "/sport" },
];

export default function NavTabs() {
  const classes = useStyles();

  //
  const location = useLocation();
  // const ref = useRef();

  //
  useEffect(() => {
    // Fixed bug: indicator not show in the first load.
    window.dispatchEvent(new CustomEvent("resize"));
  }, [location.pathname]);

  return (
    <div className={classes.root}>
      <StyledTabs value={location.pathname} aria-label="styled tabs example">
        {tabs.map((tab, index) => (
          <LinkTab
            key={tab.path}
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label={tab.label}
            to={tab.path}
            value={tab.path}
            {...a11yProps(index)}
          />
        ))}
      </StyledTabs>
    </div>
  );
}
