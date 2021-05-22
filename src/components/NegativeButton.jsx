import { Button } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
const NegativeButton = withStyles((theme) => ({
  root: {
    width: "100%",
    textTransform: "none",
    color: blue[700],
    "&:hover": {
      color: blue[700],
    },
  },
}))((props) => (
  <Button variant="outlined" {...props}>
    {props.children}
  </Button>
));

export default NegativeButton;
