import {
  Avatar,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import {
  AccountBalance as AccountBalanceIcon,
  ExitToApp as LogoutIcon,
  Home as HomeIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from "@material-ui/icons";
import { useService } from "@xstate/react";
import clsx from "clsx";
import { head } from "lodash/fp";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Interpreter } from "xstate";
import { AuthMachineContext, AuthMachineEvents } from "../machines/authMachine";
import { formatAmount } from "../utils/transactionUtils";

const drawerWidth = 240;

export const mainListItems = (
  toggleDrawer: ((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void) | undefined,
  showTemporaryDrawer: Boolean
) => (
  <div>
    <ListItem
      button
      // @ts-ignore
      onClick={() => showTemporaryDrawer && toggleDrawer()}
      component={RouterLink}
      to="/"
      data-test="sidenav-home"
    >
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem
      button
      // @ts-ignore
      onClick={() => showTemporaryDrawer && toggleDrawer()}
      component={RouterLink}
      to="/user/settings"
      data-test="sidenav-user-settings"
    >
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="My Account" />
    </ListItem>
    <ListItem
      button
      // @ts-ignore
      onClick={() => showTemporaryDrawer && toggleDrawer()}
      component={RouterLink}
      to="/bankaccounts"
      data-test="sidenav-bankaccounts"
    >
      <ListItemIcon>
        <AccountBalanceIcon />
      </ListItemIcon>
      <ListItemText primary="Bank Accounts" />
    </ListItem>
    <ListItem
      button
      // @ts-ignore
      onClick={() => showTemporaryDrawer && toggleDrawer()}
      component={RouterLink}
      to="/notifications"
      data-test="sidenav-notifications"
    >
      <ListItemIcon>
        <NotificationsIcon />
      </ListItemIcon>
      <ListItemText primary="Notifications" />
    </ListItem>
  </div>
);

export const secondaryListItems = (signOutPending: Function) => (
  <div>
    <ListItem button onClick={() => signOutPending()} data-test="sidenav-signout">
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    marginTop: 50,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  userProfile: {
    padding: theme.spacing(2),
  },
  userProfileHidden: {
    display: "none",
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  accountBalance: {
    marginLeft: theme.spacing(2),
  },
  amount: {
    fontWeight: "bold",
  },
  accountBalanceHidden: {
    display: "none",
  },
  cypressLogo: {
    width: "40%",
  },
}));

interface Props {
  closeMobileDrawer: () => void;
  toggleDrawer: () => void;
  drawerOpen: boolean;
  authService: Interpreter<AuthMachineContext, any, AuthMachineEvents, any>;
}

const NavDrawer: React.FC<Props> = ({
  toggleDrawer,
  closeMobileDrawer,
  drawerOpen,
  authService,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [authState, sendAuth] = useService(authService);
  const showTemporaryDrawer = useMediaQuery(theme.breakpoints.only("xs"));

  const currentUser = authState?.context?.user;
  const signOut = () => sendAuth("LOGOUT");

  return (
    <Drawer
      data-test="sidenav"
      variant={showTemporaryDrawer ? "temporary" : "persistent"}
      classes={{
        paper: clsx(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose),
      }}
      open={drawerOpen}
      ModalProps={{
        onBackdropClick: () => closeMobileDrawer(),
        closeAfterTransition: showTemporaryDrawer,
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className={drawerOpen ? classes.userProfile : classes.userProfileHidden}
      >
        <Grid item>
          {currentUser && (
            <Avatar
              className={classes.avatar}
              alt={`${currentUser.firstName} ${currentUser.lastName}`}
              src={currentUser.avatar}
            />
          )}
        </Grid>
        <Grid item>
          {currentUser && (
            <>
              <Typography
                variant="subtitle1"
                color="textPrimary"
                data-test="sidenav-user-full-name"
              >
                {currentUser.firstName} {head(currentUser.lastName)}
              </Typography>
              <Typography
                variant="subtitle2"
                color="inherit"
                gutterBottom
                data-test="sidenav-username"
              >
                @{currentUser.username}
              </Typography>
            </>
          )}
        </Grid>
        <Grid item style={{ width: "30%" }}></Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className={drawerOpen ? classes.userProfile : classes.userProfileHidden}
      >
        <Grid item>
          {currentUser && (
            <>
              <Typography
                variant="h6"
                color="textPrimary"
                className={classes.amount}
                data-test="sidenav-user-balance"
              >
                {currentUser.balance ? formatAmount(currentUser.balance) : formatAmount(0)}
              </Typography>
              <Typography variant="subtitle2" color="inherit" gutterBottom>
                Account Balance
              </Typography>
            </>
          )}
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <List>{mainListItems(toggleDrawer, showTemporaryDrawer)}</List>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <List>{secondaryListItems(signOut)}</List>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default NavDrawer;
