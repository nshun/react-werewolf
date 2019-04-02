import * as React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  createStyles,
  Fab,
  IconButton,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";

import { grey } from "@material-ui/core/colors";

import DeleteIcon from "@material-ui/icons/Delete";

import configureStore from "../store";
import withRoot from "../withRoot";

const { persistor } = configureStore();

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translateY(-50%) translateX(-50%)",
    },
    nav: {
      textAlign: "center",
      position: "absolute",
      top: "0%",
      left: "100%",
      transform: "translateY(0%) translateX(-100%)",
      padding: theme.spacing.unit * 2,
    },
    buttons: {
      display: "flex",
    },
    button: {
      textTransform: "none",
      margin: theme.spacing.unit,
    },
    githubButton: {
      textTransform: "none",
      color: theme.palette.getContrastText(grey[900]),
      backgroundColor: grey[900],
      "&:hover": {
        color: theme.palette.getContrastText(grey[100]),
        backgroundColor: grey[100],
      },
      margin: theme.spacing.unit,
    },
    wrapper: {
      margin: theme.spacing.unit * 2,
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 150,
    },
  });

const clearCache = () => persistor.purge();

class Index extends React.Component<WithStyles<typeof styles>, {}> {
  public render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.nav}>
          <div className={classes.buttons}>
            <Button
              target="_blank"
              href="https://github.com/nshun/react-werewolf"
              size="small"
              variant="outlined"
              className={classes.githubButton}
            >
              Github
            </Button>
            <IconButton aria-label="Delete" onClick={clearCache}>
              <DeleteIcon fontSize="small" color="secondary" />
            </IconButton>
          </div>
        </div>
        <div className={classes.root}>
          <Typography variant="h1" gutterBottom={true}>
            Werewolf
          </Typography>
          <Typography variant="subtitle1" gutterBottom={true}>
            A party game with offline
          </Typography>
          <div className={classes.wrapper}>
            <Fab
              component={Link}
              {...{ to: "/setting" } as any}
              variant="extended"
              color="primary"
              size="large"
            >
              PLAY
            </Fab>
          </div>
        </div>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(Index));
