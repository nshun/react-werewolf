import React from "react";

import {
  Button,
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core";

import { grey } from "@material-ui/core/colors";

const styles = (theme: Theme) =>
  createStyles({
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
  });

function GithubButton(props: Readonly<WithStyles<typeof styles>>) {
  const { classes } = props;

  return (
    <Button
      href="https://github.com/nshun/react-werewolf"
      target="_blank"
      rel="noopener"
      value="Github repository"
      size="small"
      variant="outlined"
      className={classes.githubButton}
    >
      Github
    </Button>
  );
}

export default withStyles(styles)(GithubButton);
