import React, { useEffect } from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchGlobalCoinData, selectGlobalCoinData } from '../../features/globalCoinDataSlice';
import TopCoinsCard from '../../components/UI/organisms/TopCoinsCard';
import DominanceCard from '../../components/UI/organisms/DominanceCard';
import GasOracleCard from '../../components/UI/organisms/GasOracleCard';
import TrendingCoinsCard from '../../components/UI/organisms/TrendingCoinsCard';
import GlobalCoinDataCard from '../../components/UI/organisms/GlobalCoinDataCard';
import BannerCardSmall from '../../components/UI/molecules/BannerCardSmall';


const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: '100%',
    '& > .MuiGrid-item': {
      height: '100%',
    }
  },
  innerWrapper: {
    height: '100%',
    '& > .MuiGrid-item:not(:last-child)': {
      marginBottom: theme.spacing(3)
    }
  }
}));

const Coins: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const globalCoinData = useAppSelector(selectGlobalCoinData);

  // Fetch globalCoinData here as used in two cards (prevent fetching twice if dispatch in card)
  useEffect(() => {
    if (globalCoinData.value === null && globalCoinData.status === 'IDLE') {
      dispatch(fetchGlobalCoinData());
    }
  }, [dispatch, globalCoinData.value, globalCoinData.status]);

  return (
    <Grid
      container
      className={classes.wrapper}
      spacing={3}
      direction="row"
      justify="center"
      alignItems="stretch"
    >
      <Grid item xs={6} md={6} lg={4}>
        <TopCoinsCard />
      </Grid>
      <Grid item xs={6} md={6} lg={4}>
        <Grid container className={classes.innerWrapper} spacing={0}>
          <Grid item xs={12} style={{ height: 275 }}>
            <DominanceCard />
          </Grid>
          <Grid item xs={12} style={{ height: 205 }}>
            <GasOracleCard />
          </Grid>
          <Grid item xs={12} style={{ height: `calc(100% - ${275 + 205 + theme.spacing(3) * 2}px)` }}>
            <TrendingCoinsCard />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4}>
        <Grid container className={classes.innerWrapper} spacing={0}>
          <Grid item xs={12} style={{ height: 85 }}>
            <BannerCardSmall />
          </Grid>
          <Grid item xs={12} style={{ height: `calc(50% - ${42.5 + theme.spacing(3)}px)` }}>
            <GlobalCoinDataCard type="marketcap" />
          </Grid>
          <Grid item xs={12} style={{ height: `calc(50% - ${42.5 + theme.spacing(3)}px)` }}>
            <GlobalCoinDataCard type="volume" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Coins
