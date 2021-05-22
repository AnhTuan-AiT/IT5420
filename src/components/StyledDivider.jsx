import { Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";

export const StyledDivider = withStyles({
  root: { margin: "12px 0px" },
})((props) => <Divider variant="fullWidth" {...props} />);
