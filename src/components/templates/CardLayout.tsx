import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

const useStyles = makeStyles<Theme, Props>((theme: Theme) => ({
  card: {
    display: 'flex',
    flexFlow: 'column',
    position: 'relative',
    backgroundColor: theme.palette.card.default,
    height: '100%',
    borderRadius: 12,
    border: `1px solid ${theme.palette.background.default}`,
    overflowX: (props: Props) => props.minWidth ? 'scroll' : 'visible',
    '& > *': {
      minWidth: (props: Props) => props.minWidth ? props.minWidth : 'none'
    },
    '& ::-webkit-scrollbar': {
      display: 'none',
    },
    '& .MuiCardHeader-avatar': {
      marginRight: 8,
    }
  },
}));

interface Props {
  minWidth?: number;
}

const CardLayout: React.FC<Props> = ({ children, minWidth }) => {
  const classes = useStyles({ minWidth });

  return (
    <Card className={classes.card} elevation={0}>
      {children}
    </Card>
  )
}

export default CardLayout
