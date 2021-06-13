import React from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useAppSelector } from '../../../app/hooks';
import { selectCoins } from '../../../features/coinsSlice';
import { selectGlobalCoinData } from '../../../features/globalCoinDataSlice';
import { Coin } from '../../../models';
import { shortenNumber } from '../../../common/helpers/shortenNumber';
import { roundDecimals } from '../../../common/helpers/roundDecimals';

const useStyles = makeStyles((theme: Theme) => ({
  chartSkeleton: {
    margin: '0 16px',
    transform: 'scale(1, 0.8)',
  },
  responsiveContainer: {
    '& .recharts-default-tooltip': {
      borderRadius: 12,
      backgroundColor: `${theme.palette.background.default}dd !important`,
      border: 'none !important',
      '& .recharts-tooltip-item': {
        color: `${theme.palette.text.primary} !important`
      }
    }
  }
}));

interface DataFormat {
  coinName: string;
  coinSymbol: string;
  value: number;
}

const GlobalCoinDataDonutChart: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const coins = useAppSelector(selectCoins);
  const globalCoinData = useAppSelector(selectGlobalCoinData);

  const formatRawData = (totalValue: number) => {
    const newData: DataFormat[] = [];

    const coinsToDisplay = 5;
    const topCoins = coins.value.slice(0, coinsToDisplay);

    topCoins.forEach((coin: Coin) => {
      newData.push({
        coinName: coin.name,
        coinSymbol: coin.symbol.toUpperCase(),
        value: coin.marketCap
      })
    });

    newData.push({
      coinName: 'Others',
      coinSymbol: 'Others',
      value:
        totalValue - topCoins.reduce((acc: number, coin: Coin) => acc + coin.marketCap, 0)
    });

    return newData
  };

  return (
    <>
      {coins.value.length === 0 || coins.status === 'LOADING' || globalCoinData.value === null ? (
        <Skeleton animation="wave" height="100%" className={classes.chartSkeleton} />
      ) : (
        <ResponsiveContainer height="100%" width="100%" className={classes.responsiveContainer}>
          <PieChart>
            <Pie
              data={formatRawData(globalCoinData.value.totalMarketCap.usd)}
              dataKey="value"
              nameKey="coinSymbol"
              cx="50%"
              cy="50%"
              innerRadius="40%"
              outerRadius="55%"
              fill={theme.palette.primary.main}
              label={(data: DataFormat) => data.coinName}
              paddingAngle={5}
              cursor="pointer"
            >
              {formatRawData(globalCoinData.value.totalMarketCap.usd).map((data: DataFormat, index: number) => (
                <Cell key={`cell-${index}`} fill={Object.values(theme.palette.chartHues)[index]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) =>
                globalCoinData.value !== null &&
                [`US$${shortenNumber(value)} (${roundDecimals(
                  value / globalCoinData.value.totalMarketCap.usd * 100
                )}%)`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </>
  )
}

export default GlobalCoinDataDonutChart
