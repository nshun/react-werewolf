import React from "react";

import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import { Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { Player, Roles } from "../store/game/types";

const styles = (theme: Theme) => ({
  wrapper: {
    margin: theme.spacing.unit * 2
  },
  typography: {
    margin: theme.spacing.unit * 2
  }
});

interface AppProps extends WithStyles<typeof styles> {
  player: Player;
}

interface State {
  anchorEl: HTMLElement | null;
}

class ChackRolePopover extends React.Component<AppProps, State> {
  constructor(props: Readonly<AppProps>) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  public handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) =>
    this.setState({
      anchorEl: event.currentTarget
    });

  public handleClose = () =>
    this.setState({
      anchorEl: null
    });

  public render() {
    const { classes, player } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.wrapper}>
        <Button
          aria-owns={open ? "simple-popper" : undefined}
          aria-haspopup="true"
          variant="contained"
          onClick={this.handleClick}
        >
          Check Role
        </Button>
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
        >
          <Typography className={classes.typography}>
            You are {Roles[player.role]}.
          </Typography>
        </Popover>
      </div>
    );
  }
}

export default withStyles(styles)(ChackRolePopover);
