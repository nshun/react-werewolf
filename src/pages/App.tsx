import * as React from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

import { ActionDispatcher } from "../containers/AppContainer";
import { GameState } from "../reducers/counter";
import withRoot from "../withRoot";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      paddingTop: theme.spacing.unit * 20
    }
  });

interface Props extends WithStyles<typeof styles> {
  value: GameState;
  actions: ActionDispatcher;
}

class Index extends React.Component<Props> {
  public render() {
    return (
      <div className={this.props.classes.root}>
        <Typography variant="h4" gutterBottom={true}>
          Werewolf
        </Typography>
        <Typography variant="subtitle1" gutterBottom={true}>
          A party game with offline
        </Typography>
        <Typography variant="subtitle2" gutterBottom={true}>
          score: {this.props.value.num}
        </Typography>
        <Button variant="contained" color="primary" onClick={this.onIncrement}>
          Increment
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.onDecrement}
        >
          Decrement
        </Button>
      </div>
    );
  }
  private onIncrement = () => {
    this.props.actions.increment(1);
  };
  private onDecrement = () => {
    this.props.actions.decrement(1);
  };
}

export default withRoot(withStyles(styles)(Index));
