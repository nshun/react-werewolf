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
  WithStyles,
  withStyles,
} from "@material-ui/core";

import { AppState } from "../store";
import { actionPlayer } from "../store/game/actions";
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
  game: Game;
  player: Player;
}

interface State {
  open: boolean;
  selectedId: number | null;
}

class ActionDialog extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      open: false,
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

  public handleClickOpen = () => this.setState({ ...this.state, open: true });

  public handleClose = () => this.setState({ ...this.state, open: false });

  public handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const actionId = Number(evt.target.value);
    this.actionPlayer(actionId);
    this.setState({
      ...this.state,
      selectedId: actionId,
    });
  };

  public PlayerMenuItems = () => {
    const players = this.props.game.players;
    return (
      <Select
        value={this.props.player.actionId || 0}
        onChange={this.handleChange}
        className={this.props.classes.select}
      >
        {players.map(player => {
          return (
            <MenuItem key={player.id} value={player.id}>
              {player.name}
            </MenuItem>
          );
        })}
      </Select>
    );
  };

  public render() {
    const { classes, player } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.wrapper}>
        <Button
          variant="outlined"
          color="primary"
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
            <DialogContentText id="dialog-description">
              You are the {Roles[player.role]}
            </DialogContentText>
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
  { actionPlayer }
)(withStyles(styles)(ActionDialog));
