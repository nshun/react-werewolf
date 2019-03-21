import React from "react";

import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Player, Roles } from "../store/game/types";

const styles = (theme: Theme) =>
  createStyles({
    wrapper: {
      margin: theme.spacing.unit * 2
    },
    openButton: {
      textTransform: "none"
    }
  });

interface Props extends WithStyles<typeof styles> {
  player: Player;
}

interface State {
  open: boolean;
}

class VoteDialog extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      open: false
    };
  }

  public handleClickOpen = () => this.setState({ ...this.state, open: true });

  public handleClose = () => this.setState({ ...this.state, open: false });

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
              Vote for?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(VoteDialog);
