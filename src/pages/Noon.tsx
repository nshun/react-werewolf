import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  Button,
  Fab,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

import CheckRolePopover from "../components/CheckRolePopover";
import { AppState } from "../store";
import { Game, Roles } from "../store/game/types";
import withRoot from "../withRoot";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "90%",
      transform: "translateY(-50%) translateX(-50%)"
    },
    wrapper: {
      margin: theme.spacing.unit * 2
    },
    stepper: {
      backgroundColor: "transparent"
    },
    content: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center"
    },
    stepLabel: {
      textAlign: "left"
    }
  });
interface AppProps extends WithStyles<typeof styles> {
  game: Game;
}

interface State {
  activeStep: number;
}

class Noon extends React.Component<AppProps, State> {
  constructor(props: Readonly<AppProps>) {
    super(props);
    this.state = {
      activeStep: 0
    };
  }

  public getStepContent(role: Roles) {
    switch (role) {
      case Roles.villager:
        return `You are ${Roles[role]}`;
      case Roles.werewolf:
        return `You are ${Roles[role]}`;
      default:
        return `You are ${role}`;
    }
  }

  public handleNext = () =>
    this.setState({ ...this.state, activeStep: this.state.activeStep + 1 });

  public handleBack = () =>
    this.setState({ ...this.state, activeStep: this.state.activeStep - 1 });

  public setActiveStep = (step: number) =>
    this.setState({ ...this.state, activeStep: step });

  public render() {
    return (
      <div className={this.props.classes.root}>
        <Typography variant="h2" gutterBottom={true}>
          Noon
        </Typography>
        <Stepper
          className={this.props.classes.stepper}
          activeStep={this.state.activeStep}
          orientation="vertical"
        >
          {this.props.game.players.map((player, index) => (
            <Step key={String(player)}>
              <StepLabel
                className={this.props.classes.stepLabel}
                // tslint:disable-next-line: jsx-no-lambda
                onClick={() => this.setActiveStep(index)}
              >
                {player.name}
              </StepLabel>
              <StepContent>
                <div className={this.props.classes.content}>
                  <CheckRolePopover player={player} />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={this.props.classes.wrapper}
                  >
                    {"Next"}
                  </Button>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {this.state.activeStep === this.props.game.players.length && (
          <div className={this.props.classes.stepper}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <div className={this.props.classes.wrapper}>
              <Fab
                component={Link}
                {...{ to: "/night" } as any}
                variant="extended"
                color="primary"
                size="large"
              >
                NEXT
              </Fab>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state: AppState) => ({
  game: state.game
});

export default connect(
  mapStateToProps,
  {}
)(withRoot(withStyles(styles)(Noon)));
