import React from "react";

import {
  createStyles,
  Paper,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translateY(-50%) translateX(-50%)"
    },
    wrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing.unit * 5
    },
    message: {
      textAlign: "right",
      marginLeft: theme.spacing.unit * 2
    }
  });

function NouFound(props: WithStyles<typeof styles>) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Paper className={classes.wrapper} elevation={1}>
        <Typography variant="h4">404</Typography>
        <Typography variant="subtitle1" className={classes.message}>
          This page could not be found.
        </Typography>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(NouFound);
