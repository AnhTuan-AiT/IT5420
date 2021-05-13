import { Box, Grid, Link, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";
import clsx from "clsx";
import React from "react";
import { useHistory } from "react-router";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
  media: {
    width: "100%",
    borderRadius: 4,
  },
  smMedia: {
    paddingTop: "100%",
  },
  lgMedia: {
    paddingTop: 0,
    height: 340,
  },
  mdMedia: {
    height: 100,
  },
  lgTitleWrapper: {
    "&.MuiCardContent-root:last-child": { padding: "16px 0px 0px" },
  },
  titleWrapper: { "&.MuiCardContent-root:last-child": { paddingBottom: 0 } },
  nLgTitle: {
    paddingTop: 0,
    paddingRight: 0,
  },
  mdTitle: {
    fontSize: 22,
  },
  titleText: {
    fontWeight: 500,
  },
  sourceIcon: {
    height: 16,
  },
  time: {
    marginLeft: 12,
  },
  relate: {
    marginLeft: 12,
    "&:hover": {
      color: blue[500],
      textDecoration: "none",
    },
  },
});

export default function Paper({ lg, sm, md, title, paper }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card elevation={0}>
      <Grid md={12} container alignItems="flex-start">
        <Grid item md={lg ? 12 : 3}>
          {paper ? (
            <CardMedia
              className={clsx(classes.media, {
                [classes.lgMedia]: lg,
                [classes.mdMedia]: md,
                [classes.smMedia]: sm,
              })}
              image={
                "https://photo-baomoi.zadn.vn/w700_r16x9/2021_05_12_293_38814399/4240b26eac2c45721c3d.jpg"
              }
              title={title}
            />
          ) : (
            <Skeleton
              animation="wave"
              variant="rect"
              width="100%"
              className={clsx(classes.media, {
                [classes.lgMedia]: lg,
                [classes.mdMedia]: md,
                [classes.smMedia]: sm,
              })}
            />
          )}
        </Grid>
        <Grid container md={lg ? 12 : 9}>
          <Grid item md={12}>
            <CardContent
              className={clsx(classes.titleWrapper, {
                [classes.nLgTitle]: !lg,
                [classes.lgTitleWrapper]: lg,
              })}
            >
              <Typography
                variant={lg && "h4"}
                className={clsx(classes.titleText, {
                  [classes.mdTitle]: md,
                })}
              >
                {paper ? (
                  paper.title
                ) : (
                  <Skeleton animation="wave" variant="rect" width="100%" />
                )}
              </Typography>
            </CardContent>
          </Grid>
          <Box display="flex" alignItems="center" pl={2}>
            {
              paper ? (
                <>
                  <Link
                    component={RouterLink}
                    to="/paper/abc"
                    className={classes.sourceIcon}
                  >
                    <img
                      className={classes.sourceIcon}
                      alt="source"
                      src="https://photo-baomoi.zadn.vn/4e023e6de32e0a70533f.png"
                    />
                  </Link>
                  <Typography
                    variant="body2"
                    component="span"
                    className={classes.time}
                  >
                    2 giờ
                  </Typography>
                  <Link
                    className={classes.relate}
                    color="inherit"
                    variant="body2"
                    href="#"
                  >
                    {`78 liên quan`}
                  </Link>
                </>
              ) : null
              //   <Skeleton variant="rect" height={20} width={200} />
            }
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
