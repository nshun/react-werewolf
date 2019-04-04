import React, { lazy } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  Button,
  createStyles,
  Fab,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";

import { NavigateNext } from "@material-ui/icons";

const ActionDialog = lazy(() => import("../components/ActionDialog"));

import { AppState } from "../store";
import { tickTime } from "../store/game/actions";
import { Game, Time } from "../store/game/types";

import withRoot from "../withRoot";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing.unit * 10,
      textAlign: "center",
    },
    wrapper: {
      margin: theme.spacing.unit * 2,
    },
    stepper: {
      backgroundColor: "transparent",
    },
    content: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
    stepLabel: {
      textAlign: "left",
    },
  });
interface AppProps extends WithStyles<typeof styles> {
  tickTime: typeof tickTime;
  game: Game;
}

interface State {
  activeStep: number;
}

class Night extends React.Component<AppProps, State> {
  constructor(props: Readonly<AppProps>) {
    super(props);
    this.state = {
      activeStep: 0,
    };
  }

  public handleNext = () =>
    this.setState({ ...this.state, activeStep: this.state.activeStep + 1 });

  public setActiveStep = (step: number) =>
    this.setState({ ...this.state, activeStep: step });

  public tickTime = () => this.props.tickTime(this.props.game, Time.noon);

  public render() {
    const { classes, game } = this.props;
    const { activeStep } = this.state;
    let step = 0;

    return (
      <div className={classes.root}>
        <Typography variant="h2" gutterBottom={true}>
          Night
        </Typography>
        <Typography variant="subtitle1" gutterBottom={true}>
          Day {game.date.day}
        </Typography>
        <Stepper
          className={classes.stepper}
          activeStep={activeStep}
          orientation="vertical"
        >
          {game.players.map((player, index) => {
            if (player.alive) {
              const thisStep = step;
              step++;
              return (
                <Step key={String(player)}>
                  <StepLabel
                    className={classes.stepLabel}
                    // tslint:disable-next-line: jsx-no-lambda
                    onClick={() => this.setActiveStep(thisStep)}
                  >
                    {player.name}
                  </StepLabel>
                  <StepContent>
                    <div className={classes.content}>
                      <ActionDialog player={player} />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.wrapper}
                      >
                        Next
                      </Button>
                    </div>
                  </StepContent>
                </Step>
              );
            }
          })}
        </Stepper>
        <div className={classes.wrapper}>
          <Fab
            onClick={this.tickTime}
            component={Link}
            {...{ to: "/result" } as any}
            color="primary"
          >
            <NavigateNext />
          </Fab>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  game: state.game,
});

export default connect(
  mapStateToProps,
  { tickTime }
)(withRoot(withStyles(styles)(Night)));
