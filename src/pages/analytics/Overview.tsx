import React from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Hidden } from '@material-ui/core';
import TopCoinsCard from '../../components/UI/overview/organisms/TopCoinsCard';
import CoinDominanceCard from '../../components/UI/overview/organisms/CoinDominanceCard';
import GasOracleCard from '../../components/UI/overview/organisms/GasOracleCard';
import TrendingCoinsCard from '../../components/UI/overview/organisms/TrendingCoinsCard';
import MarketCapCard from '../../components/UI/overview/organisms/MarketCapCard';
import BannerCardSmall from '../../components/UI/overview/molecules/BannerCardSmall';
import VolumeCard from '../../components/UI/overview/organisms/VolumeCard';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: '100%',
    '& > .MuiGrid-item': {
      height: '100%',
    },
    [theme.breakpoints.only('md')]: {
      overflow: 'scroll'
    },
    [theme.breakpoints.down('sm')]: {
      '& ::-webkit-scrollbar': {
        display: 'none'
      }
    }
  },
  innerWrapper: {
    height: '100%',
    '& > .MuiGrid-item:not(:last-child)': {
      marginBottom: theme.spacing(3)
    },
    [theme.breakpoints.down('sm')]: {
      overflow: 'scroll'
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

      <Hidden mdDown>
        {/* Height = match screen 100% */}
        <Grid item lg={4}>
          <TopCoinsCard />
        </Grid>
        <Grid item lg={4}>
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
      </Hidden>

      <Hidden smDown lgUp>
        {/* Height = 1205 + theme.spacing(3) * 3 */}
        <Grid item md={6}>
          <Grid container className={classes.innerWrapper} spacing={0}>
            <Grid item xs={12} style={{ height: 700 }}>
              <TopCoinsCard />
            </Grid>
            <Grid item xs={12} style={{ height: 205 }}>
              <GasOracleCard />
            </Grid>
            <Grid item xs={12} style={{ height: 300 }}>
              <CoinDominanceCard />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6}>
          <Grid container className={classes.innerWrapper} spacing={0}>
            <Grid item xs={12} style={{ height: 85 }}>
              <BannerCardSmall />
            </Grid>
            <Grid item xs={12} style={{ height: 350 }}>
              <MarketCapCard />
            </Grid>
            <Grid item xs={12} style={{ height: 350 }}>
              <VolumeCard />
            </Grid>
            <Grid item xs={12} style={{ height: 420 - theme.spacing(3) }}>
              <TrendingCoinsCard />
            </Grid>
          </Grid>
        </Grid>
      </Hidden>

      <Hidden mdUp>
        {/* Height = content */}
        <Grid item xs={12}>
          <Grid container className={classes.innerWrapper} spacing={0}>
            <Grid item xs={12} style={{ height: 85 }}>
              <BannerCardSmall />
            </Grid>
            <Grid item xs={12} style={{ height: 'fit-content' }}>
              <TopCoinsCard />
            </Grid>
            <Grid item xs={12} style={{ height: 350 }}>
              <MarketCapCard />
            </Grid>
            <Grid item xs={12} style={{ height: 350 }}>
              <VolumeCard />
            </Grid>
            <Grid item xs={12} style={{ height: 205 }}>
              <GasOracleCard />
            </Grid>
            <Grid item xs={12} style={{ height: 300 }}>
              <CoinDominanceCard />
            </Grid>
            <Grid item xs={12} style={{ height: 'fit-content' }}>
              <TrendingCoinsCard />
            </Grid>
          </Grid>
        </Grid>
      </Hidden>

    </Grid>
  )
}

export default Overview
