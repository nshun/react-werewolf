import * as React from "react";
import { Link } from "react-router-dom";

import { Fab, Typography } from "@material-ui/core";
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

class Noon extends React.Component<WithStyles<typeof styles>, {}> {
  public render() {
    return (
      <div className={this.props.classes.root}>
        <Typography variant="h2" gutterBottom={true}>
          noon
        </Typography>
        <Typography variant="subtitle1" gutterBottom={true}>
          It became noon.
        </Typography>
        <div className={this.props.classes.wrapper}>
          <Fab
            component={Link}
            {...{ to: "/night" } as any}
            variant="extended"
            color="primary"
            size="large"
          >
            NEXT
          </Fab>
        </div>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Noon));
