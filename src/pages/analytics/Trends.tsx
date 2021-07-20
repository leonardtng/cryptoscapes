import React from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Hidden } from '@material-ui/core';
import CoinCorrelationCard from '../../components/UI/trends/organisms/CoinCorrelationCard';
import FearGreedIndexCard from '../../components/UI/trends/organisms/FearGreedIndexCard';
import BitcoinHashRateCard from '../../components/UI/trends/organisms/BitcoinHashRateCard';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: '100%',
    '& > .MuiGrid-item': {
      height: '100%',
    },
    [theme.breakpoints.only('md')]: {
      overflow: 'scroll',
      '& > .MuiGrid-item': {
        height: 'fit-content',
      },
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
    [theme.breakpoints.only('md')]: {
      '& > .MuiGrid-item': {
        marginBottom: '0px !important'
      },
    },
    [theme.breakpoints.down('sm')]: {
      overflow: 'scroll',
    }
  }
}));

const Trends: React.FC = () => {
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
        <Grid item lg={8} xl={9}>
          <CoinCorrelationCard />
        </Grid>
        <Grid item lg={4} xl={3}>
          <Grid container className={classes.innerWrapper} spacing={0}>
            <Grid item xs={12} style={{ height: `calc(50% - ${theme.spacing(3) / 2}px)` }}>
              <FearGreedIndexCard />
            </Grid>
            <Grid item xs={12} style={{ height: `calc(50% - ${theme.spacing(3) / 2}px)` }}>
              <BitcoinHashRateCard />
            </Grid>
          </Grid>
        </Grid>
      </Hidden>

      <Hidden smDown lgUp>
        {/* Height = 1200 + theme.spacing(3) */}
        <Grid item md={12}>
          <Grid container className={classes.innerWrapper} spacing={3}>
            <Grid item xs={6} style={{ height: 400 }}>
              <FearGreedIndexCard />
            </Grid>
            <Grid item xs={6} style={{ height: 400 }}>
              <BitcoinHashRateCard />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12} style={{ height: 800 }}>
          <CoinCorrelationCard />
        </Grid>
      </Hidden>

      <Hidden mdUp>
        {/* Height = content */}
        <Grid item xs={12}>
          <Grid container className={classes.innerWrapper} spacing={0}>
            <Grid item xs={12} style={{ height: 400 }}>
              <FearGreedIndexCard />
            </Grid>
            <Grid item xs={12} style={{ height: 400 }}>
              <BitcoinHashRateCard />
            </Grid>
            <Grid item xs={12} style={{ height: 800 }}>
              <CoinCorrelationCard />
            </Grid>
          </Grid>
        </Grid>
      </Hidden>

    </Grid>
  )
}

export default Trends
