import React from "react";
import { Link } from "react-router-dom";

import {
  createStyles,
  Fab,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";

import ClearCacheButton from "../components/ClearCacheButton";
import GithubButton from "../components/GithubButton";

import withRoot from "../withRoot";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    nav: {
      overflow: "hidden",
      position: "fixed",
      display: "flex",
      top: "0",
      right: "0",
      padding: theme.spacing.unit * 2,
    },
    wrapper: {
      margin: theme.spacing.unit * 2,
    },
    content: {
      textAlign: "center",
    },
  });

class Top extends React.Component<WithStyles<typeof styles>, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.nav}>
          <GithubButton />
          <ClearCacheButton />
        </div>
        <div className={classes.content}>
          <Typography variant="h1" className={classes.wrapper}>
            Werewolf
          </Typography>
          <Typography variant="subtitle1" className={classes.wrapper}>
            A party game with offline
          </Typography>
          <Fab
            component={Link}
            {...{ to: "/setting" } as any}
            variant="extended"
            color="primary"
            size="large"
            className={classes.wrapper}
          >
            PLAY
          </Fab>
        </div>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Top));
