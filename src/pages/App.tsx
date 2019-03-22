import * as React from "react";
import { Link } from "react-router-dom";

import {
  createStyles,
  Fab,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";

import withRoot from "../withRoot";

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
      margin: theme.spacing.unit * 2
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 150
    }
  });

class Index extends React.Component<WithStyles<typeof styles>, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="h1" gutterBottom={true}>
          Werewolf
        </Typography>
        <Typography variant="subtitle1" gutterBottom={true}>
          A party game with offline
        </Typography>
        <div className={classes.wrapper}>
          <Fab
            component={Link}
            {...{ to: "/setting" } as any}
            variant="extended"
            color="primary"
            size="large"
          >
            PLAY
          </Fab>
        </div>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Index));
