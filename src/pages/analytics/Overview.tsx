import React from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import TopCoinsCard from '../../components/UI/analytics/organisms/TopCoinsCard';
import CoinDominanceCard from '../../components/UI/analytics/organisms/CoinDominanceCard';
import GasOracleCard from '../../components/UI/analytics/organisms/GasOracleCard';
import TrendingCoinsCard from '../../components/UI/analytics/organisms/TrendingCoinsCard';
import MarketCapCard from '../../components/UI/analytics/organisms/MarketCapCard';
import BannerCardSmall from '../../components/UI/analytics/molecules/BannerCardSmall';
import VolumeCard from '../../components/UI/analytics/organisms/VolumeCard';

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

const Overview: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

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
            <CoinDominanceCard />
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
            <MarketCapCard />
          </Grid>
          <Grid item xs={12} style={{ height: `calc(50% - ${42.5 + theme.spacing(3)}px)` }}>
            <VolumeCard />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Overview
