import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  Paper,
  Fab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Avatar,
} from '@material-ui/core'
import CommentIcon from '@material-ui/icons/Comment';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import SendIcon from '@material-ui/icons/Send';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import GuestBookDialog from './GuestBookDialog.js'

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));

export default function BottomAppBar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <GuestBookDialog
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
        />
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open dialog" onClick={handleClickOpen}>
            <CommentIcon />
          </IconButton>
          <Fab color="secondary" aria-label="scoreToggle" className={classes.fabButton} onClick={props.handleScoreToggle}>
            {!props.guess ? <SendIcon /> : <ArrowBackIcon />}
          </Fab>
          <div className={classes.grow} />
          <IconButton edge="end" color="inherit" onClick={props.findMyLocation}>
            <PersonPinCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
