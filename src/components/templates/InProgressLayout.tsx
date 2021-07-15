import React from 'react';
import { Box, Typography } from '@material-ui/core';
import WorkInProgress from '../../assets/images/illustrations/work-in-progress.svg';

const InProgressLayout: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%" width="100%">
      <Typography variant="h5">Stay Tuned!</Typography>
      <Typography variant="body1" color="textSecondary">This page is coming soon</Typography>
      <Box paddingTop="24px"  height="30%">
        <img src={WorkInProgress} alt="Work in Progress" height="100%" />
      </Box>
    </Box>
  )
}

export default InProgressLayout
