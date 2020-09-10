import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
// import images from '../images/'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function MatAvatar(props) {
  const classes = useStyles();

  return (
    <div className="avatar-wrapper">
      <div className={classes.root}>
        <Avatar alt={props.name} src={props.avatar} />
      </div>
      <div>
        <h4>{props.name}</h4>
        <p>{props.city}</p>
      </div>
    </div>
  );
}