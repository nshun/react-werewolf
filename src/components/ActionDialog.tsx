import React from "react";
import { connect } from "react-redux";

import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";

import { AppState } from "../store";
import { actionPlayer, finishAction } from "../store/game/actions";
import { Game, Player, Roles } from "../store/game/types";

const styles = (theme: Theme) =>
  createStyles({
    wrapper: {
      margin: theme.spacing.unit * 2,
    },
    openButton: {
      textTransform: "none",
    },
    select: {
      minWidth: 150,
    },
  });

interface Props extends WithStyles<typeof styles> {
  actionPlayer: typeof actionPlayer;
  finishAction: typeof finishAction;
  game: Game;
  player: Player;
}

interface State {
  open: boolean;
  resultOpen: boolean;
  selectedId: number | null;
}

class ActionDialog extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      open: false,
      resultOpen: false,
      selectedId: null,
    };
  }

  public actionPlayer = (actionId: number) => {
    this.props.actionPlayer(
      this.props.game.players,
      this.props.player.id,
      actionId
    );
  };

  public finishAction = () =>
    this.props.finishAction(this.props.game.players, this.props.player.id);

  public handleClickOpen = () => this.setState({ ...this.state, open: true });

  public handleClose = () => {
    this.finishAction();
    this.setState({
      ...this.state,
      open: false,
      resultOpen: this.props.player.role === Roles.seer,
    });
  };

  public handleResultClose = () =>
    this.setState({
      ...this.state,
      resultOpen: false,
    });

  public handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const actionId = Number(evt.target.value);
    this.actionPlayer(actionId);
    this.setState({
      ...this.state,
      selectedId: actionId,
    });
  };

  public ActionResultDialog = () => {
    const { game, player } = this.props;
    return (
      <Dialog
        open={this.state.resultOpen}
        keepMounted={true}
        onClose={this.handleResultClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">Result</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {game.players
              .filter(p => p.id === player.actionId)
              .map(p => `${p.name} is ${Roles[p.role]}`)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleResultClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  public PlayerMenuItems = () => {
    const players = this.props.game.players;
    return (
      <div>
        {this.props.player.role === Roles.werewolf && (
          <Typography variant="body2">
            Others:{" "}
            {players
              .filter(
                player =>
                  player.role === Roles.werewolf && player !== this.props.player
              )
              .map(player => player.name)
              .join(", ")}
          </Typography>
        )}
        <Select
          value={this.props.player.actionId || 0}
          onChange={this.handleChange}
          className={this.props.classes.select}
        >
          {players
            .filter(p => p.alive)
            .map(p => {
              return (
                <MenuItem key={p.id} value={p.id}>
                  {p.name}
                </MenuItem>
              );
            })}
        </Select>
      </div>
    );
  };

  public render() {
    const { classes, player } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.wrapper}>
        <this.ActionResultDialog />
        <Button
          variant="outlined"
          color="primary"
          disabled={this.props.player.actioned}
          onClick={this.handleClickOpen}
          className={classes.openButton}
        >
          Action: {player.name}
        </Button>
        <Dialog
          open={open}
          keepMounted={true}
          onClose={this.handleClose}
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
        >
          <DialogTitle id="dialog-title">{player.name}</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              You are the {Roles[player.role]}
            </Typography>
            {player.role !== Roles.villager && <this.PlayerMenuItems />}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  game: state.game,
});

export default connect(
  mapStateToProps,
  { actionPlayer, finishAction }
)(withStyles(styles)(ActionDialog));
