import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { useService } from "@xstate/react";
import React from "react";
import { Interpreter } from "xstate";
import PersonalSettingsIllustration from "../components/SvgUndrawPersonalSettingsKihd";
import UserSettingsForm from "../components/UserSettingsForm";
import { AuthMachineContext, AuthMachineEvents } from "../machines/authMachine";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export interface Props {
  authService: Interpreter<AuthMachineContext, any, AuthMachineEvents, any>;
}

const UserSettingsContainer: React.FC<Props> = ({ authService }) => {
  const classes = useStyles();
  const [authState, sendAuth] = useService(authService);

  const currentUser = authState?.context?.user;
  const updateUser = (payload: any) => sendAuth({ type: "UPDATE", ...payload });

  return (
    <Paper className={classes.paper}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        User Settings
      </Typography>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid item>
          <PersonalSettingsIllustration style={{ height: 200, width: 300 }} />
        </Grid>
        <Grid item style={{ width: "50%" }}>
          {currentUser && <UserSettingsForm userProfile={currentUser} updateUser={updateUser} />}
        </Grid>
      </Grid>
    </Paper>
  );
};
export default UserSettingsContainer;
