import { Box, Grid, Link, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { SaveOutlined } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";
import clsx from "clsx";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import dantri from "../assets/images/dan-tri.svg";
import dspl from "../assets/images/dspl.svg";
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
    "&:hover": {
      color: blue[500],
      textDecoration: "none",
    },
  },
  sourceIcon: {
    height: 16,
    paddingTop: 1,
  },
  time: {
    marginLeft: 12,
  },
  relate: {
    "&:hover": {
      color: blue[500],
      textDecoration: "none",
    },
  },
  smRelate: { marginLeft: 12 },
  lgActions: { paddingLeft: 0 },
  smActions: { paddingTop: 0 },
  smTime: { flexDirection: "column" },
  description: {
    display: "-webkit-box",
    "-webkit-box-orient": "vertical",
    "-webkit-line-clamp": 2 /* number of lines to show */,
    lineHeight: "24px",
    maxHeight: 48,
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
  },
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
    case "Tiên phong":
      logo = tienphong;
      break;
    case "thanh nien":
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

  const formatTime = (totalSecond, date) => {
    const hour = Math.floor(totalSecond / 3600);
    const minute = Math.floor((totalSecond % 3600) / 60);
    const d = new Date(date);
    
    d.setMonth(d.getMonth() + 1)

    return `${d.getDate()} tháng ${d.getMonth()} lúc ${
      hour < 10 ? `0${hour}` : hour
    }:${minute < 10 ? `0${minute}` : minute}`;
  };

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
              {paper ? (
                <Link
                  variant={lg && "h4"}
                  color="inherit"
                  href={paper.newspaperLink}
                  target="_blank"
                  rel="noopener noreferer"
                  className={clsx(classes.titleText, {
                    [classes.mdTitle]: md,
                  })}
                >
                  {paper.title}
                  {sm ? null : (
                    <Typography className={classes.description}>
                      {paper.description}
                    </Typography>
                  )}
                </Link>
              ) : (
                <Typography
                  variant={lg && "h4"}
                  className={clsx(classes.titleText, {
                    [classes.mdTitle]: md,
                  })}
                >
                  <Skeleton animation="wave" variant="rect" width="100%" />
                </Typography>
              )}
            </CardContent>
          </Grid>
          <Box
            display="flex"
            alignItems="flex-start"
            pl={2}
            pt={1}
            className={clsx({
              [classes.lgActions]: lg,
              [classes.smActions]: sm,
            })}
          >
            {paper ? (
              <>
                <Link
                  component={RouterLink}
                  to={`/news/paper/${paper.newspaper}`}
                  className={classes.sourceIcon}
                >
                  <img className={classes.sourceIcon} alt="source" src={logo} />
                </Link>
                <Box
                  display="flex"
                  className={clsx(classes.time, { [classes.smTime]: sm })}
                >
                  <Typography variant="body2" component="span">
                    {formatTime(paper.totalSecond, paper.date)}
                  </Typography>

                  {paper.similar?.length > 0 ? (
                    <Link
                      component={RouterLink}
                      to={`/relevant/${paper.id}`}
                      className={clsx(classes.relate, {
                        [classes.smRelate]: !sm,
                      })}
                      color="inherit"
                      variant="body2"
                    >
                      {`${paper.similar.length} liên quan`}
                    </Link>
                  ) : null}
                </Box>
              </>
            ) : null}
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
