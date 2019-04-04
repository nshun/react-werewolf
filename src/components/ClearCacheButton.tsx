import React from "react";

import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";

import configureStore from "../store";

const { persistor } = configureStore();

const styles = (theme: Theme) =>
  createStyles({
    wrapper: {
      margin: theme.spacing.unit * 2,
    },
  });

interface State {
  open: boolean;
}

class CountDownDialog extends React.Component<
  WithStyles<typeof styles>,
  State
> {
  constructor(props: Readonly<WithStyles<typeof styles>>) {
    super(props);
    this.state = {
      open: false,
    };
  }

  public handleOpen = () => this.setState({ ...this.state, open: true });

  public handleClose = () => this.setState({ ...this.state, open: false });

  public handleOk = () => {
    persistor.purge();
    this.handleClose();
  };

  public render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div>
        <IconButton onClick={this.handleOpen} aria-label="clear cache">
          <DeleteIcon fontSize="small" color="secondary" />
        </IconButton>
        <Dialog open={open} keepMounted={true}>
          <DialogTitle>Confirm</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure to clear cache?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              NO
            </Button>
            <Button onClick={this.handleOk} color="primary" autoFocus={true}>
              YES
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(CountDownDialog);
