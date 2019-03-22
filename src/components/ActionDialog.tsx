import React from "react";

import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Theme,
  WithStyles,
  withStyles,
} from "@material-ui/core";

import { Player, Roles } from "../store/game/types";

const styles = (theme: Theme) =>
  createStyles({
    wrapper: {
      margin: theme.spacing.unit * 2,
    },
    openButton: {
      textTransform: "none",
    },
  });

interface Props extends WithStyles<typeof styles> {
  player: Player;
}

interface State {
  open: boolean;
}

class ActionDialog extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      open: false,
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

export default withStyles(styles)(ActionDialog);
