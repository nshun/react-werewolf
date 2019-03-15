import * as React from "react";
import { connect } from "react-redux";

import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  NativeSelect,
  Typography
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";

import { AppState } from "../store";
import { updateSetting } from "../store/setting/actions";
import { Setting } from "../store/setting/types";
import withRoot from "../withRoot";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      margin: theme.spacing.unit * 2,
      paddingTop: theme.spacing.unit * 20
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
    players: this.props.setting.players,
    villagers: this.props.setting.villagers,
    werewolves: this.props.setting.werewolves
  };
  public updateSetting = () => {
    const newSetting: Setting = {
      players: this.state.players,
      villagers: this.state.villagers,
      werewolves: this.state.werewolves
    };
    this.props.updateSetting(newSetting);
  };
  public handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    switch (evt.target.name) {
      case "player":
        this.setState({ players: evt.target.value });
        break;
    }
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
        <div className={this.props.classes.formsWrapper}>
          <div>
            <FormControl className={this.props.classes.formControl}>
              <InputLabel htmlFor="age-native-helper">
                Numbers of players
              </InputLabel>
              <NativeSelect
                name="player"
                onChange={this.handleChange}
                input={<Input name="playersNum" />}
              >
                <option value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </NativeSelect>
            </FormControl>
          </div>
          <div>
            <FormControl className={this.props.classes.formControl}>
              <InputLabel htmlFor="age-native-helper">The Villagers</InputLabel>
              <NativeSelect
                onChange={this.handleChange}
                input={<Input name="villagersNum" />}
              >
                <option value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </NativeSelect>
            </FormControl>
          </div>
          <div>
            <FormControl className={this.props.classes.formControl}>
              <InputLabel htmlFor="age-native-helper">
                The Werewolves
              </InputLabel>
              <NativeSelect
                onChange={this.handleChange}
                input={<Input name="werewolvesNum" />}
              >
                <option value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </NativeSelect>
            </FormControl>
          </div>
        </div>
        <Button
          variant="extendedFab"
          color="primary"
          size="large"
          onClick={this.updateSetting}
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
