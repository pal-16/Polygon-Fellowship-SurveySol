import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Paper, Typography, Divider } from "@material-ui/core";
import constants from "../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "80vh",
    paddingTop: theme.spacing(3)
  },
  item: {
    marginBottom: theme.spacing(1),
    textAlign: "center"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(3)
  },
  point: {
    marginBottom: theme.spacing(1.2),
    fontSize: "1.1rem",
    fontStyle: "italic"
  }
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <Box
      className={classes.root}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.item}>
          <Typography variant="h4">Survey as a Service!</Typography>
          <Divider style={{ marginBottom: "16px" }} />
          <Typography>

          </Typography>
        </Grid>

      </Grid>
    </Box>
  );
};

export default Landing;
