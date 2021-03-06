import React, { lazy } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  Button,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";

import NumberMenuItems from "../components/NumberMenuItems";

import { AppState } from "../store";
import { initGame } from "../store/game/actions";
import { Game } from "../store/game/types";
import { updateSetting } from "../store/setting/actions";
import { Setting } from "../store/setting/types";

import withRoot from "../withRoot";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translateY(-50%) translateX(-50%)",
    },
    wrapper: {
      margin: theme.spacing.unit * 2,
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 150,
    },
  });

interface AppProps extends WithStyles<typeof styles> {
  initGame: typeof initGame;
  updateSetting: typeof updateSetting;
  setting: Setting;
  game: Game;
}

interface State {
  openName: boolean;
  openRole: boolean;
  names: string[];
  players: number;
  werewolves: number;
  seers: number;
  doctors: number;
  interval: number;
}

class Index extends React.Component<AppProps, State> {
  constructor(props: Readonly<AppProps>) {
    super(props);

    const { players, seers, doctors } = this.props.setting;
    this.state = {
      openName: false,
      openRole: false,
      names: this.props.game.players.map(val => val.name),
      players,
      werewolves: Math.max(
        1,
        Math.floor(Number(this.props.setting.players) / 3)
      ),
      seers,
      doctors,
      interval: this.props.setting.interval,
    };
  }
  public updateSetting = () => {
    const { players, werewolves, seers, doctors, interval } = this.state;
    const newSetting: Setting = {
      players,
      villagers: this.calcRemains(1),
      werewolves,
      seers,
      doctors,
      interval,
    };
    this.props.updateSetting(newSetting);
  };
  public initGame = () =>
    this.props.initGame(this.state.names, [
      this.calcRemains(1),
      this.state.werewolves,
      this.state.seers,
      this.state.doctors,
    ]);
  public handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    switch (evt.target.name) {
      case "players":
        return this.setState({
          ...this.state,
          openName: true,
          players: Number(evt.target.value),
          werewolves: Math.max(1, Math.floor(Number(evt.target.value) / 3)),
        });
      default:
        return this.setState({
          ...this.state,
          [evt.target.name]: Number(evt.target.value),
        });
    }
  };
  public handleNameChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    const { names } = this.state;
    const set = Number(evt.target.name);
    names[set] = evt.target.value;
    return this.setState({
      ...this.state,
      names,
    });
  };
  public handleOpenName = () =>
    this.setState({ ...this.state, openName: true });
  public handleOpenRole = () =>
    this.setState({ ...this.state, openRole: true });
  public handleCancel = () =>
    this.setState({ ...this.state, openName: false, openRole: false });
  public handleOk = () => this.handleCancel();
  public handleStart = () => {
    this.initGame();
    this.updateSetting();
  };

  public NameDialog = () => {
    const nums = new Array<number>(this.state.players);
    for (let i = 0; i < nums.length; i++) {
      nums[i] = i + 1;
    }
    return (
      <Dialog open={this.state.openName} onClose={this.handleCancel}>
        <DialogTitle>Names</DialogTitle>
        <DialogContent>
          {nums.map((item, i) => {
            return (
              <div key={i} className={this.props.classes.wrapper}>
                <TextField
                  name={String(i)}
                  value={this.state.names[i]}
                  label={`Player ${item}`}
                  onChange={this.handleNameChange}
                />
              </div>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={this.handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  public calcRemains = (current: number) => {
    const { players, werewolves, seers, doctors } = this.state;
    return players - werewolves - seers - doctors + current - 1;
  };

  public RoleDialog = () => {
    const villagers = this.calcRemains(1);
    return (
      <Dialog open={this.state.openRole} onClose={this.handleCancel}>
        <DialogTitle>Roles</DialogTitle>
        <DialogContent className={this.props.classes.wrapper}>
          <form>
            <FormControl
              className={this.props.classes.formControl}
              disabled={true}
            >
              <InputLabel>The Villagers</InputLabel>
              <Select name="villagers" value={villagers}>
                <MenuItem value={villagers}>{villagers}</MenuItem>
              </Select>
            </FormControl>
          </form>
          <form>
            <FormControl className={this.props.classes.formControl}>
              <InputLabel>The Werewolves</InputLabel>
              <Select
                name="werewolves"
                value={this.state.werewolves}
                onChange={this.handleChange}
              >
                {NumberMenuItems(1, this.calcRemains(this.state.werewolves))}
              </Select>
            </FormControl>
          </form>
          <form>
            <FormControl className={this.props.classes.formControl}>
              <InputLabel>The Seers</InputLabel>
              <Select
                name="seers"
                value={this.state.seers}
                onChange={this.handleChange}
              >
                {NumberMenuItems(0, this.calcRemains(this.state.seers))}
              </Select>
            </FormControl>
          </form>
          <form>
            <FormControl className={this.props.classes.formControl}>
              <InputLabel>The Doctors</InputLabel>
              <Select
                name="doctors"
                value={this.state.doctors}
                onChange={this.handleChange}
              >
                {NumberMenuItems(0, this.calcRemains(this.state.doctors))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={this.handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  public render() {
    return (
      <div className={this.props.classes.root}>
        <Typography variant="h4" gutterBottom={true}>
          Game Setting
        </Typography>
        <form className={this.props.classes.wrapper} autoComplete="off">
          <FormControl className={this.props.classes.formControl}>
            <InputLabel>Numbers of Players</InputLabel>
            <Select
              name="players"
              value={this.state.players}
              onChange={this.handleChange}
              onClose={this.handleOpenName}
            >
              {NumberMenuItems(4, 12)}
            </Select>
          </FormControl>
        </form>
        <div className={this.props.classes.wrapper}>
          <Button variant="outlined" onClick={this.handleOpenName}>
            Player Names
          </Button>
        </div>
        <this.NameDialog />
        <div className={this.props.classes.wrapper}>
          <Button variant="outlined" onClick={this.handleOpenRole}>
            Roles
          </Button>
        </div>
        <this.RoleDialog />
        <FormControl className={this.props.classes.formControl}>
          <InputLabel>Interval seconds</InputLabel>
          <Select
            name="interval"
            value={this.state.interval}
            onChange={this.handleChange}
          >
            {NumberMenuItems(30, 600, 30)}
          </Select>
        </FormControl>
        <div className={this.props.classes.wrapper}>
          <Fab
            onClick={this.handleStart}
            component={Link}
            {...{ to: "/night" } as any}
            variant="extended"
            color="primary"
            size="large"
          >
            START
          </Fab>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  setting: state.setting,
  game: state.game,
});

export default connect(
  mapStateToProps,
  { updateSetting, initGame }
)(withRoot(withStyles(styles)(Index)));
