import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import GlobalLoadingProgress from './GlobalLoadingProgress';
import GitHubButton from '../atoms/GitHubButton';

const useStyles = makeStyles((theme: Theme) => ({
  sideUtils: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiTypography-root': {
      marginRight: theme.spacing(2)
    }
  }
}));

const SideUtils: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.sideUtils}>
      <GlobalLoadingProgress />
      <GitHubButton />
    </Box>
  )
}

export default SideUtils;
