import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  createStyles,
  Fab,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";

import { AppState } from "../store";
import { Game, Time } from "../store/game/types";
import withRoot from "../withRoot";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "90%",
      transform: "translateY(-50%) translateX(-50%)",
    },
    wrapper: {
      margin: theme.spacing.unit * 2,
    },
  });

interface AppProps extends WithStyles<typeof styles> {
  game: Game;
}

class Result extends React.Component<AppProps, {}> {
  public render() {
    const { classes, game } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="h2" gutterBottom={true}>
          Result
        </Typography>
        <div className={classes.wrapper}>
          {game.date.time === Time.night ? (
            <Fab
              component={Link}
              {...{ to: "/night" } as any}
              variant="extended"
              color="primary"
              size="large"
            >
              NIGHT
            </Fab>
          ) : (
            <Fab
              component={Link}
              {...{ to: "/noon" } as any}
              variant="extended"
              color="primary"
              size="large"
            >
              NOON
            </Fab>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  game: state.game,
});

export default connect(
  mapStateToProps,
  {}
)(withRoot(withStyles(styles)(Result)));
