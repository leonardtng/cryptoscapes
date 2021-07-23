import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import WorkInProgress from '../../assets/images/illustrations/work-in-progress.svg';

const useStyles = makeStyles((theme: Theme) => ({
  illustration: { 
    paddingTop: theme.spacing(3)
  }
}));

const InProgressLayout: React.FC = () => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%" width="100%">
      <Typography variant="h5">Stay Tuned!</Typography>
      <Typography variant="body1" color="textSecondary">This page is coming soon</Typography>
      <img src={WorkInProgress} alt="Work in Progress" height="30%" className={classes.illustration} />
    </Box>
  )
}

export default InProgressLayout
