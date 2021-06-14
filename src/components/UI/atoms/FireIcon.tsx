import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import { WhatshotRounded } from '@material-ui/icons';
const useStyles = makeStyles((theme: Theme) => ({
  avatarColor: {
    marginRight: 6,
    backgroundColor: theme.palette.card.paper,
  },
  fire: {
    fill: "url(#linearFire)",
  }
}));

const FireIcon: React.FC = () => {
  const classes = useStyles();

  return (
    <Avatar variant="circle" className={classes.avatarColor}>
      <svg width="0" height="0">
        <linearGradient id="linearFire" x1="0" y1="0" x2="1" y2="1">
          <stop offset="20%" stopColor="#f12711" />
          <stop offset="90%" stopColor="#f5af19" />
        </linearGradient>
      </svg>
      <WhatshotRounded classes={{ root: classes.fire }} />
    </Avatar>
  )
}

export default FireIcon
