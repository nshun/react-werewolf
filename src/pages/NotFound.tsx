import React from "react";

import {
  Button,
  createStyles,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";

import withRoot from "../withRoot";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translateY(-50%) translateX(-50%)",
    },
    wrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing.unit * 5,
    },
    message: {
      textAlign: "right",
      marginLeft: theme.spacing.unit * 2,
    },
  });

function NouFound(props: WithStyles<typeof styles>) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Typography variant="h4">404</Typography>
        <Typography variant="subtitle1" className={classes.message}>
          This page could not be found.
        </Typography>
      </div>
      <div>
        <Button variant="contained" color="primary">
          TOP
        </Button>
      </div>
    </div>
  );
}

export default withRoot(withStyles(styles)(NouFound));
