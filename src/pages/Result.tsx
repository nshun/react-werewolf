import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  createStyles,
  Fab,
  List,
  ListItem,
  ListItemText,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";

import { AppState } from "../store";
import { Game, Roles, Time } from "../store/game/types";

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
    content: {
      margin: theme.spacing.unit * 4,
    },
    wrapper: {
      margin: theme.spacing.unit * 2,
    },
    list: {
      textAlign: "center",
      display: "inline-block",
    },
  });

interface AppProps extends WithStyles<typeof styles> {
  game: Game;
}

class Result extends React.Component<AppProps, {}> {
  public render() {
    const { classes, game } = this.props;
    const { winner, lastDiedPlayer } = game.state;

    const ResultText = () => {
      if (winner) {
        return (
          <div className={classes.content}>
            <Typography variant="h4" gutterBottom={true}>
              {winner === Roles.werewolf ? "Werewolves won" : "Villagers won"}
            </Typography>
            <List className={classes.list}>
              {game.players.map(player => (
                <ListItem key={String(player)}>
                  <ListItemText
                    primary={
                      <Typography variant="h6">{player.name}</Typography>
                    }
                    secondary={
                      <Typography variant="body2">
                        {Roles[player.role]}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </div>
        );
      } else {
        return (
          <Typography variant="h4" gutterBottom={true}>
            {lastDiedPlayer
              ? `${lastDiedPlayer.name} was killed`
              : "No one died"}
          </Typography>
        );
      }
    };

    const NextLink = () => (
      <div className={classes.wrapper}>
        {winner ? (
          <Fab
            component={Link}
            {...{ to: "/" } as any}
            variant="extended"
            color="primary"
            size="large"
          >
            TOP
          </Fab>
        ) : game.date.time === Time.night ? (
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
    );

    return (
      <div className={classes.root}>
        <Typography variant="h2" gutterBottom={true}>
          Result
        </Typography>
        <ResultText />
        <NextLink />
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
