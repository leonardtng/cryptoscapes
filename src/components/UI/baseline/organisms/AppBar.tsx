import React, { useEffect } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { AppBar as MuiAppBar, Toolbar } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import SideUtils from '../molecules/SideUtils';
import { appBarHeight } from '../../../../common/shared/dimensions';
import AppBarActions from '../molecules/AppBarActions';
import { fetchCoins, selectCoins } from '../../../../features/coinsSlice';
import { fetchSupportedCoins, selectSupportedCoins } from '../../../../features/supportedCoinsSlice';
import { fetchCoinCategories, selectCoinCategories } from '../../../../features/coinCategoriesSlice';

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

  const coins = useAppSelector(selectCoins);
  const supportedCoins = useAppSelector(selectSupportedCoins);
  const coinCategories = useAppSelector(selectCoinCategories);

  useEffect(() => {
    if (coins.value.length === 0 && coins.status === 'IDLE') {
      dispatch(fetchCoins());
    }
  }, [dispatch, coins.status, coins.value.length]);

  useEffect(() => {
    if (supportedCoins.value.length === 0 && supportedCoins.status === 'IDLE') {
      dispatch(fetchSupportedCoins());
    }
  }, [dispatch, supportedCoins.status, supportedCoins.value.length]);

  useEffect(() => {
    if (coinCategories.value.length === 0 && coinCategories.status === 'IDLE') {
      dispatch(fetchCoinCategories());
    }
  }, [dispatch, coinCategories.value, coinCategories.status]);

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
