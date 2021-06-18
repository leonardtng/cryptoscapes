import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  gridIconAnimation: {
    width: 80,
    height: 80,
    position: 'relative',
    marginBottom: theme.spacing(2),
    '& div': {
      position: 'absolute',
      width: 16,
      height: 16,
      borderRadius: '50%',
      background: theme.palette.primary.main,
      animation: '$grid-animation 1.2s linear infinite',
    },
    '& div:nth-child(1)': {
      top: 8,
      left: 8,
      animationDelay: '0s'
    },
    '& div:nth-child(2)': {
      top: 8,
      left: 32,
      animationDelay: '-0.4s'
    },
    '& div:nth-child(3)': {
      top: 8,
      left: 56,
      animationDelay: '-0.8s'
    },
    '& div:nth-child(4)': {
      top: 32,
      left: 8,
      animationDelay: '-0.4s'
    },
    '& div:nth-child(5)': {
      top: 32,
      left: 32,
      animationDelay: '-0.8s'
    },
    '& div:nth-child(6)': {
      top: 32,
      left: 56,
      animationDelay: '-1.2s'
    },
    '& div:nth-child(7)': {
      top: 56,
      left: 8,
      animationDelay: '-0.8s'
    },
    '& div:nth-child(8)': {
      top: 56,
      left: 32,
      animationDelay: '-1.2s'
    },
    '& div:nth-child(9)': {
      top: 56,
      left: 56,
      animationDelay: '-1.6s'
    },
  },
  textEllipsis: {
    width: 187,
    marginLeft: 20,
    '&:after': {
      overflow: 'hidden',
      display: 'inline-block',
      verticalAlign: 'bottom',
      animation: '$ellipsis-animation steps(4,end) 900ms infinite',
      content: '"..."', /* ascii code for the ellipsis character */
      width: 0
    }
  },
  '@keyframes grid-animation': {
    '0%': {
      opacity: 1
    },
    '50%': {
      opacity: 0.5
    },
    '100%': {
      opacity: 1
    }
  },
  '@keyframes ellipsis-animation': {
    'to': {
      width: '1.25em'
    }
  }
}));

const GridIconLoadingState: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <div className={classes.gridIconAnimation}>
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
      </div>
      <Box>
        <Typography variant="h6" color="textSecondary" className={classes.textEllipsis}>Loading Heatmap</Typography>
      </Box>
    </Box>
  )
}

export default GridIconLoadingState
