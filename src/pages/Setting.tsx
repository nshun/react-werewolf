import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

import NumberMenuItems from "../components/NumberMenuItems";
import { AppState } from "../store";
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
      transform: "translateY(-50%) translateX(-50%)"
    },
    wrapper: {
      margin: theme.spacing.unit * 2
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 150
    }
  });

interface AppProps extends WithStyles<typeof styles> {
  updateSetting: typeof updateSetting;
  setting: Setting;
}

interface State {
  openName: boolean;
  openRole: boolean;
  players: number;
  werewolves: number;
}

class Index extends React.Component<AppProps, State> {
  constructor(props: Readonly<AppProps>) {
    super(props);
    this.state = {
      openName: false,
      openRole: false,
      players: this.props.setting.players,
      werewolves: Math.max(
        1,
        Math.floor(Number(this.props.setting.players) / 3)
      )
    };
  }
  public updateSetting = () => {
    const newSetting: Setting = {
      players: this.state.players,
      villagers: this.state.players - this.state.werewolves,
      werewolves: this.state.werewolves
    };
    this.props.updateSetting(newSetting);
  };
  public handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    switch (evt.target.name) {
      case "players":
        return this.setState({
          ...this.state,
          openName: true,
          players: Number(evt.target.value),
          werewolves: Math.max(1, Math.floor(Number(evt.target.value) / 3))
        });
      default:
        return this.setState({
          ...this.state,
          [evt.target.name]: Number(evt.target.value)
        });
    }
  };
  public handleOpenName = () =>
    this.setState({ ...this.state, openName: true });
  public handleOpenRole = () =>
    this.setState({ ...this.state, openRole: true });
  public handleCancel = () =>
    this.setState({ ...this.state, openName: false, openRole: false });
  public handleOk = () => {
    this.updateSetting();
    this.handleCancel();
  };

  public NameDialog = () => {
    const nums = new Array(this.state.players);
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
                <TextField label={`Player ${item}`} />
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

  public RoleDialog = () => {
    const villagers = this.state.players - this.state.werewolves;
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
                {NumberMenuItems(1, this.state.players - 1)}
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
              {NumberMenuItems(2, 10)}
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
        <Button
          component={Link}
          {...{ to: "/" } as any}
          variant="extendedFab"
          color="primary"
          size="large"
        >
          START
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  setting: state.setting
});

export default connect(
  mapStateToProps,
  { updateSetting }
)(withRoot(withStyles(styles)(Index)));