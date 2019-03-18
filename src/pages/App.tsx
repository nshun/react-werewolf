import * as React from "react";
import { Link } from "react-router-dom";

import { Button, Typography } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

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
    return (
      <div className={this.props.classes.root}>
        <Typography variant="h2" gutterBottom={true}>
          Werewolf
        </Typography>
        <Typography variant="subtitle1" gutterBottom={true}>
          A party game with offline
        </Typography>
        <div className={this.props.classes.wrapper}>
          <Button
            component={Link}
            {...{ to: "/setting" } as any}
            variant="extendedFab"
            color="primary"
            size="large"
          >
            START
          </Button>
        </div>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Index));
