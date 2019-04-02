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
import { votePlayer } from "../store/game/actions";
import { Game, Player } from "../store/game/types";

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
  votePlayer: typeof votePlayer;
  game: Game;
  player: Player;
}

interface State {
  open: boolean;
  selectedId: number | null;
}

class VoteDialog extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      open: false,
      selectedId: null,
    };
  }

  public votePlayer = (voteId: number) => {
    this.props.votePlayer(
      this.props.game.players,
      this.props.player.id,
      voteId
    );
  };

  public handleClickOpen = () => this.setState({ ...this.state, open: true });

  public handleClose = () => this.setState({ ...this.state, open: false });

  public handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const voteId = Number(evt.target.value);
    this.votePlayer(voteId);
    this.setState({
      ...this.state,
      selectedId: voteId,
    });
  };

  public PlayerMenuItems = () => {
    const players = this.props.game.players;
    return (
      <Select
        name="werewolves"
        value={this.props.player.voteId || ""}
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
          Vote: {player.name}
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
              Vote for
            </DialogContentText>
            <this.PlayerMenuItems />
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
  { votePlayer }
)(withStyles(styles)(VoteDialog));
