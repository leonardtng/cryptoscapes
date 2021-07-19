import React from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import GaugeChart from 'react-gauge-chart';
import { useAppSelector } from '../../../../app/hooks';
import { selectCoinDetails } from '../../../../features/coinDetailsSlice';
import { coinDetailsGaugeHeight } from '../../../../common/shared/dimensions';

const useStyles = makeStyles((theme: Theme) => ({
  gaugeSurface: {
    '& #fear-greed-index-gauge': {
      width: '200px !important',
      '& svg': {
        height: '100%',
        width: '100%'
      }
    }
  },
  gutterBottom: {
    marginBottom: 6
  }
}));

interface Props {
  title: string;
  type: 'sentiment' | 'coinGeckoScore' | 'liquidityScore' | 'publicInterestScore'
}

const CoinGaugeChart: React.FC<Props> = ({ title, type }) => {
  const classes = useStyles();
  const theme = useTheme();

  const coinDetails = useAppSelector(selectCoinDetails);

  const gaugeData = () => {
    switch (type) {
      case ('sentiment'):
        return coinDetails.value?.sentimentVotesUpPercentage
      case ('coinGeckoScore'):
        return coinDetails.value?.coingeckoScore
      case ('liquidityScore'):
        return coinDetails.value?.liquidityScore
      case ('publicInterestScore'):
        const score = coinDetails.value?.publicInterestScore || 0;
        return score > 1 ? score : score * 100
    }
  };

  return (
    <Box height={coinDetailsGaugeHeight} display="flex" flexDirection="column" alignItems="center" padding={2}>
      {coinDetails.value && coinDetails.status !== 'LOADING' ? (
        <Typography variant="h6" align="center">{title}</Typography>
      ) : (
        <Skeleton height={32} width="60%" className={classes.gutterBottom} />
      )}
      <Box display="flex" alignItems="center" justifyContent="center" flex="1" className={classes.gaugeSurface}>
        {gaugeData() !== null ? (
          <GaugeChart
            id="fear-greed-index-gauge"
            nrOfLevels={20}
            textColor={theme.palette.text.primary}
            needleColor={theme.palette.gauge.needle}
            needleBaseColor={theme.palette.gauge.needle}
            colors={[theme.palette.error.main, theme.palette.success.main]}
            percent={coinDetails.value && coinDetails.status !== 'LOADING' ? Number(gaugeData() || 0) / 100 : 0}
          />
        ) : (
          <Typography variant="body1" color="textSecondary">No Data Available</Typography>
        )}
      </Box>
    </Box>
  )
}

export default CoinGaugeChart
