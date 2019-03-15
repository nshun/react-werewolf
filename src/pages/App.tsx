import * as React from "react";
import { connect } from "react-redux";

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
    formsWrapper: {
      margin: theme.spacing.unit * 2
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 200
    }
  });

interface AppProps extends WithStyles<typeof styles> {
  updateSetting: typeof updateSetting;
  setting: Setting;
}

class Index extends React.Component<AppProps> {
  public state = {
    open: false,
    players: this.props.setting.players,
    werewolves: 0
  };

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
          open: true,
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
  public handleClickOpen = () => this.setState({ ...this.state, open: true });
  public handleCancel = () => this.setState({ ...this.state, open: false });
  public handleOk = () => {
    this.updateSetting();
    this.setState({ ...this.state, open: false });
  };

  public RoleDialog = () => {
    const villagers = this.state.players - this.state.werewolves;
    return (
      <Dialog
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        open={this.state.open}
        onClose={this.handleCancel}
      >
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent className={this.props.classes.formsWrapper}>
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
          Werewolf
        </Typography>
        <Typography variant="subtitle1" gutterBottom={true}>
          A party game with offline
        </Typography>
        <form className={this.props.classes.formsWrapper} autoComplete="off">
          <FormControl className={this.props.classes.formControl}>
            <InputLabel>Numbers of Players</InputLabel>
            <Select
              name="players"
              value={this.state.players}
              onChange={this.handleChange}
            >
              {NumberMenuItems(2, 10)}
            </Select>
          </FormControl>
        </form>
        <this.RoleDialog />
        <Button variant="extendedFab" color="primary" size="large">
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
