import React, { useEffect } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { AppBar as MuiAppBar, Toolbar } from '@material-ui/core';
import { useAppDispatch } from '../../../../app/hooks';
import { fetchSupportedCoins } from '../../../../features/supportedCoinsSlice';
import SideUtils from '../molecules/SideUtils';
import { appBarHeight } from '../../../../common/shared/dimensions';
import AppBarActions from '../molecules/AppBarActions';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none',
    '& .MuiToolbar-root': {
      minHeight: appBarHeight,
      justifyContent: 'space-between',
    }
  }
}));

const AppBar: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSupportedCoins());
  }, [dispatch]);

  return (
    <MuiAppBar position="fixed" className={classes.appBar} color="transparent">
      <Toolbar>
        <AppBarActions />
        <SideUtils />
      </Toolbar>
    </MuiAppBar>
  )
}

export default AppBar;
