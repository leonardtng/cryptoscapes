import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: 'flex',
    flexFlow: 'column',
    backgroundColor: theme.palette.card.main,
    height: '100%',
    borderRadius: 12,
    '& ::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));

const CardLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      {children}
    </Card>
  )
}

export default CardLayout
