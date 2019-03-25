import React from "react";

import {
  Button,
  createStyles,
  Dialog,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from "@material-ui/core";

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
  });

interface Props extends WithStyles<typeof styles> {
  initialCount: number;
}

interface State {
  open: boolean;
  count: number;
}

class IntervalDialog extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      open: true,
      count: this.props.initialCount,
    };
  }

  public handleClose = () =>
    this.setState({ ...this.state, count: 0, open: false });

  public componentDidMount() {
    const interval = setInterval(() => {
      const nextCount = this.state.count - 1;
      if (nextCount < 0) {
        clearInterval(interval);
        this.handleClose();
      } else {
        this.setState({ ...this.state, count: nextCount });
      }
    }, 1000);
  }

  public render() {
    const { classes } = this.props;
    const { count, open } = this.state;

    return (
      <Dialog fullScreen={true} open={open} keepMounted={true}>
        <div className={classes.root}>
          <Typography variant="h3" gutterBottom={true}>
            Interval
          </Typography>
          <Typography variant="h1">{count}</Typography>
          <Button size="large" onClick={this.handleClose} color="secondary">
            SKIP
          </Button>
        </div>
      </Dialog>
    );
  }
}

export default withStyles(styles)(IntervalDialog);
