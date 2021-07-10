import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import CoinPriceStatistics from '../atoms/CoinPriceStatistics';
import CoinGaugeChart from '../atoms/CoinGaugeChart';

const useStyles = makeStyles((theme: Theme) => ({
  innerWrapper: {
    height: '100%',
    '& > .MuiGrid-item:not(:last-child)': {
      marginBottom: theme.spacing(3)
    }
  }
}));

const CoinStatisticsWrapper: React.FC = () => {
  const classes = useStyles();

  return (
    <Box marginBottom={5} paddingLeft={1} paddingRight={1}>
      <Grid container spacing={3}>
        <Grid item xs={6} xl={4}>
          <CoinPriceStatistics />
        </Grid>
        <Grid item xs={3} xl={4}>
          <Grid container className={classes.innerWrapper} spacing={0}>
            <Grid item xs={12}>
              <CoinGaugeChart title="Market Sentiment" type="sentiment" />
            </Grid>
            <Grid item xs={12}>
              <CoinGaugeChart title="Liquidity" type="liquidityScore" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} xl={4}>
          <Grid container className={classes.innerWrapper} spacing={0}>
            <Grid item xs={12}>
              <CoinGaugeChart title="Public Interest" type="publicInterestScore" />
            </Grid>
            <Grid item xs={12}>
              <CoinGaugeChart title="CoinGecko Score" type="coinGeckoScore" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CoinStatisticsWrapper
