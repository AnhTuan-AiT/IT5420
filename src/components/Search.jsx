import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export default function Search() {
  const classes = useStyles();
  const history = useHistory();

  //
  const [value, setValue] = useState("");

  //
  const onSearch = () => {
    history.push(`/search/${value}`);
  };
  const onTextChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Paper className={classes.root}>
      <InputBase
        value={value}
        onChange={onTextChange}
        className={classes.input}
        placeholder="Nhập nội dung tìm kiếm"
        inputProps={{ "aria-label": "search" }}
      />
      <IconButton
        onClick={onSearch}
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
