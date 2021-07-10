import React from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import GaugeChart from 'react-gauge-chart';
import { useAppSelector } from '../../../../app/hooks';
import { selectCoinDetails } from '../../../../features/coinDetailsSlice';
import { coinDetailsGaugeHeight } from '../../../../common/shared/dimensions';

const useStyles = makeStyles((theme: Theme) => ({
  statsCard: {
    height: coinDetailsGaugeHeight,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
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
        return coinDetails.value?.publicInterestScore
    }
  };

  return (
    <>
      {coinDetails.value && coinDetails.status !== 'LOADING' ? (
        <Card className={classes.statsCard}>
          <CardHeader
            title={title}
            titleTypographyProps={{ variant: 'h6', color: 'textPrimary' }}
          />
          <Box display="flex" alignItems="center" justifyContent="center" flex="1">
            {gaugeData() !== null ? (
              <GaugeChart
                id="fear-greed-index-gauge"
                nrOfLevels={20}
                colors={[theme.palette.error.main, theme.palette.success.main]}
                percent={Number(gaugeData() || 0) / 100}
              />
            ) : (
              <Typography variant="body1" color="textSecondary">No Data Available</Typography>
            )}
          </Box>
        </Card>
      ) : (
        <Card className={classes.statsCard}>
          <CardContent>
            <Skeleton height={32} width="40%" className={classes.gutterBottom} />
            <Skeleton height={24} width="90%" />
            <Skeleton height={24} width="100%" />
            <Skeleton height={24} width="60%" />
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default CoinGaugeChart
