import React from 'react'
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import { ResponsiveContainer, Tooltip, Treemap } from 'recharts';
import { useAppSelector } from '../../../../app/hooks';
import { selectCoins } from '../../../../features/coinsSlice';
import { selectGlobalCoinData } from '../../../../features/globalCoinDataSlice';
import { Coin } from '../../../../models';
import { Box, Typography } from '@material-ui/core';
import { roundDecimals, shortenNumber } from '../../../../common/helpers';
import chroma from "chroma-js";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: '100%',
    width: '100%',
    padding: theme.spacing(3),
    '& .recharts-wrapper': {
      cursor: 'pointer !important',
      '& .recharts-surface': {
        borderRadius: 12,
        '& text': {
          border: 'none'
        }
      }
    }
  },
  chartSkeleton: {
    margin: '0 16px',
    transform: 'scale(1, 0.8)',
  },
  customTooltip: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: `${theme.palette.background.default}dd`,
  }
}));

interface DataGroup {
  coinName: string;
  coinSymbol: string;
  value: number;
}

interface DataFormat {
  name: string;
  children: DataGroup[]
}

interface Props {
  coinsToDisplay: number; //Ideally display 58 for color consistency
}

const MarketCapTreemap: React.FC<Props> = ({ coinsToDisplay }) => {
  const classes = useStyles();
  const theme = useTheme();

  const coins = useAppSelector(selectCoins);
  const globalCoinData = useAppSelector(selectGlobalCoinData);

  const formatRawData = (totalValue: number) => {
    const newData: DataFormat[] = [{
      name: 'Market Cap',
      children: []
    }];

    const topCoins = coins.value.slice(0, coinsToDisplay);

    topCoins.forEach((coin: Coin) => {
      newData[0].children.push({
        coinName: coin.name,
        coinSymbol: coin.symbol.toUpperCase(),
        value: coin.marketCap
      })
    });

    newData[0].children.push({
      coinName: 'Others',
      coinSymbol: 'NA',
      value:
        totalValue - topCoins.reduce((acc: number, coin: Coin) => acc + coin.marketCap, 0)
    });

    return newData
  };

  const CustomizedContent: React.FC<any> = ({ depth, x, y, width, height, index, colors, coinName, coinSymbol }) => {
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: colors[index % colors.length],
            stroke: theme.palette.card.default,
            strokeWidth: 2,
          }}
        />
        {(index < 2 || index === coinsToDisplay) &&
          <text
            x={index < 2 ? x + width / 2 - 12 : x + width / 2 - 25}
            y={y + height / 2 + 7}
            fill={theme.palette.text.primary}
            fontSize={16}
            fillOpacity={0.7}
          >
            {index < 2 ? coinSymbol : coinName}
          </text>
        }
      </g>
    )
  };

  return (
    <>
      {coins.value.length === 0 || coins.status === 'LOADING' || globalCoinData.value === null ? (
        <Skeleton height="100%" className={classes.chartSkeleton} />
      ) : (
        <Box className={classes.container}>
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={formatRawData(globalCoinData.value.totalMarketCap.usd)}
              dataKey="value"
              fill={theme.palette.primary.main}
              content={
                <CustomizedContent
                  colors={
                    chroma.scale([theme.palette.primary.main, theme.palette.secondary.main])
                      .gamma(0.35)
                      .colors(coinsToDisplay + 1)
                  }
                />
              }
            >
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length && globalCoinData.value !== null) {
                    return <Box className={classes.customTooltip}>
                      <Typography variant="body2">Coin Name: {payload[0].payload.coinName}</Typography>
                      <Typography variant="body2">Symbol: {payload[0].payload.coinSymbol}</Typography>
                      <Typography variant="body2">Market Cap: {shortenNumber(payload[0].payload.value)}</Typography>
                      <Typography variant="body2">
                        Dominance: {roundDecimals(
                          payload[0].payload.value / globalCoinData.value.totalMarketCap.usd * 100)
                        }%
                      </Typography>
                    </Box>
                  } else {
                    return null
                  }
                }}
              />
            </Treemap>
          </ResponsiveContainer>
        </Box>
      )}
    </>
  )

}

export default MarketCapTreemap
