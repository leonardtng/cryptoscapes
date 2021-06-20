import React from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ChartSkeleton from '../atoms/ChartSkeleton';
import { useAppSelector } from '../../../app/hooks';
import { selectCoins } from '../../../features/coinsSlice';
import { selectGlobalCoinData } from '../../../features/globalCoinDataSlice';
import { Coin } from '../../../models';
import { shortenNumber } from '../../../common/helpers/shortenNumber';
import { useWindowSize } from '../../../common/hooks/useWindowSize';
import chroma from "chroma-js";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: '100%',
    width: '100%',
    padding: theme.spacing(3),
    '& .recharts-surface': {
      cursor: 'pointer',
      '& .recharts-tooltip-cursor': {
        fill: theme.palette.card.paper,
      }
    }
  },
  customTooltip: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: `${theme.palette.background.default}dd`
  }
}));

interface DataFormat {
  coinName: string;
  coinSymbol: string;
  value: number;
}

const VolumeBarChart: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const coins = useAppSelector(selectCoins);
  const globalCoinData = useAppSelector(selectGlobalCoinData);

  const windowSize = useWindowSize();
  const coinsToDisplay = windowSize.width / 250

  const formatRawData = () => {
    const newData: DataFormat[] = [];

    const coinsValueDesc = [...coins.value];
    coinsValueDesc.sort((a: Coin, b: Coin) => b.totalVolume - a.totalVolume);

    const topCoins = coinsValueDesc.slice(0, coinsToDisplay);

    topCoins.forEach((coin: Coin) => {
      newData.push({
        coinName: coin.name,
        coinSymbol: coin.symbol.toUpperCase(),
        value: coin.totalVolume
      })
    });

    return newData
  };

  return (
    <>
      {coins.value.length === 0 || coins.status === 'LOADING' || globalCoinData.value === null ? (
        <ChartSkeleton />
      ) : (
        <Box className={classes.container}>
          <ResponsiveContainer height="100%" width="100%">
            <BarChart
              data={formatRawData()}
              margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="coinSymbol" />
              <YAxis
                tickFormatter={tick => shortenNumber(tick)}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return <Box className={classes.customTooltip}>
                      <Typography variant="body2">
                        {payload[0].payload.coinName}
                      </Typography>
                      <Typography variant="body2">
                        {`${label}: US$${shortenNumber(payload[0].payload.value)}`}
                      </Typography>
                    </Box>
                  } else {
                    return null
                  }
                }}
              />
              <Bar dataKey="value" fill={theme.palette.secondary.main} animationDuration={2000}>
                {formatRawData().map((data: DataFormat, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={chroma.scale([theme.palette.primary.main, theme.palette.secondary.main])
                      .gamma(0.4)
                      .colors(coinsToDisplay)[index]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
    </>
  )
}

export default VolumeBarChart
