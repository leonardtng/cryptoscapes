import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: 'flex',
    flexFlow: 'column',
    backgroundColor: theme.palette.card.default,
    height: '100%',
    borderRadius: 12,
    '& ::-webkit-scrollbar': {
      display: 'none',
    },
    '& .MuiCardHeader-avatar': {
      marginRight: 8,
    }
  },
}));

const CardLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} elevation={0}>
      {children}
    </Card>
  )
}

export default CardLayout
