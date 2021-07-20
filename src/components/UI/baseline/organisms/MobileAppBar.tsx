import React, { useEffect } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { AppBar as MuiAppBar, Toolbar } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { appBarHeight } from '../../../../common/shared/dimensions';
import { fetchCoins, selectCoins } from '../../../../features/coinsSlice';
import { fetchCoinCategories, selectCoinCategories } from '../../../../features/coinCategoriesSlice';
import { useCleanReduxState } from '../../../../common/hooks/useCleanReduxState';
import SideUtils from '../molecules/SideUtils';
import MobileAppBarActions from '../molecules/MobileAppBarActions';

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

interface Props {
  handleDrawerToggle: () => void;
}

const MobileAppBar: React.FC<Props> = ({ handleDrawerToggle }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const coins = useAppSelector(selectCoins);
  const coinCategories = useAppSelector(selectCoinCategories);

  useEffect(() => {
    if (coins.value.length === 0 && coins.status === 'IDLE') {
      dispatch(fetchCoins());
    }
  }, [dispatch, coins.status, coins.value.length]);

  useEffect(() => {
    if (coinCategories.value.length === 0 && coinCategories.status === 'IDLE') {
      dispatch(fetchCoinCategories());
    }
  }, [dispatch, coinCategories.value, coinCategories.status]);

  useCleanReduxState();

  return (
    <MuiAppBar position="fixed" className={classes.appBar} color="transparent">
      <Toolbar>
        <MobileAppBarActions handleDrawerToggle={handleDrawerToggle} />
        <SideUtils />
      </Toolbar>
    </MuiAppBar>
  )
}

export default MobileAppBar;
