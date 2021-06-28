import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  spinner: {
    margin: 'auto',
    paddingTop: 20,
    paddingBottom: 20,
    width: 45,
    textAlign: 'center',
    '& > *': {
      width: 15,
      height: 15,
      backgroundColor: theme.palette.secondary.main,
      borderRadius: '100%',
      display: 'inline-block',
      animation: '$bouncedelay 1.4s infinite ease-in-out both',
    },
  },
  bounce1: {
    animationDelay: '-0.32s',
  },
  bounce2: {
    animationDelay: '-0.16s',
  },
  '@keyframes bouncedelay': {
    '0%': {
      transform: 'scale(0)',
    },
    '80%': {
      transform: 'scale(0)',
    },
    '100%': {
      transform: 'scale(0)',
    },
    '40%': {
      transform: 'scale(1)',
    }
  },
}));

const TableFooterLoading: React.FC = () => {
  const classes = useStyles();

  return (
    <Box display="flex" justifyContent="center" width="100%">
      <div className={classes.spinner}>
        <div className={classes.bounce1}></div>
        <div className={classes.bounce2}></div>
        <div></div>
      </div>
    </Box>
  );
}
export default TableFooterLoading
