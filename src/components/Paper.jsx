import { Box, Grid, Link, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";
import clsx from "clsx";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import dantri from "../assets/images/dan-tri.svg";
import dspl from "../assets/images/ds&pl.svg";
import nhandan from "../assets/images/nhan-dan.png";
import thanhnien from "../assets/images/thanh-nien.png";
import tienphong from "../assets/images/tien-phong.png";
import tuoitre from "../assets/images/tuoi-tre.png";
import vnexpress from "../assets/images/vn-express.svg";
import vnplus from "../assets/images/vn-plus.png";

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
  actions: { paddingLeft: 0 },
});

export default function Paper({ lg, sm, md, paper }) {
  const classes = useStyles();

  let logo;

  switch (paper?.newspaper) {
    case "Nhân dân":
      logo = nhandan;
      break;
    case "Dân trí":
      logo = dantri;
      break;
    case "Đời sống và pháp luật":
      logo = dspl;
      break;
    case "Vnexpress":
      logo = vnexpress;
      break;
    case "Tiền phong":
      logo = tienphong;
      break;
    case "Thanh niên":
      logo = thanhnien;
      break;
    case "Viet Nam Plus":
      logo = vnplus;
      break;
    case "Tuổi trẻ online":
      logo = tuoitre;
      break;
    default:
      logo = null;
  }

  return (
    <Card elevation={0}>
      <Grid container alignItems="flex-start">
        <Grid item md={lg ? 12 : 3}>
          {paper ? (
            <CardMedia
              className={clsx(classes.media, {
                [classes.lgMedia]: lg,
                [classes.mdMedia]: md,
                [classes.smMedia]: sm,
              })}
              image={paper.imageLink}
              title={paper.title}
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
        <Grid item md={lg ? 12 : 9}>
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
          <Box
            display="flex"
            alignItems="center"
            pl={2}
            className={clsx({ [classes.actions]: lg })}
          >
            {
              paper ? (
                <>
                  <Link
                    component={RouterLink}
                    to={`/news/paper/${paper.newspaper}`}
                    className={classes.sourceIcon}
                  >
                    <img
                      className={classes.sourceIcon}
                      alt="source"
                      src={logo}
                    />
                  </Link>
                  <Typography
                    variant="body2"
                    component="span"
                    className={classes.time}
                  >
                    2 giờ
                  </Typography>
                  {paper.similar?.length > 0 ? (
                    <Link
                      className={classes.relate}
                      color="inherit"
                      variant="body2"
                      href="#"
                    >
                      {`${paper.similar.length} liên quan`}
                    </Link>
                  ) : null}
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
