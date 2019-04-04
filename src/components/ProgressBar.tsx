import React from "react";

import {
  createStyles,
  LinearProgress,
  withStyles,
  WithStyles,
} from "@material-ui/core";

const styles = () =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  });

function ProgressBar(props: Readonly<WithStyles<typeof styles>>) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <LinearProgress color="primary" />
    </div>
  );
}

export default withStyles(styles)(ProgressBar);
