import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, Typography, useTheme } from '@material-ui/core'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useAppSelector } from '../../../app/hooks';
import ChartSkeleton from '../atoms/ChartSkeleton';
import { convertTimestamp } from '../../../common/helpers/dateHandler';
import { selectBitcoinHashRate } from '../../../features/bitcoinHashRateSlice';
import { shortenNumber } from '../../../common/helpers/shortenNumber';
import { BitcoinHashRate } from '../../../models';
import { bitcoinOrange } from '../../../common/helpers/fixedColors';
import { roundDecimals } from '../../../common/helpers/roundDecimals';

const useStyles = makeStyles((theme: Theme) => ({
  responsiveContainer: {
    '& .recharts-surface': {
      cursor: 'pointer'
    }
  },
  customTooltip: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: `${theme.palette.background.default}dd`,
    '& #bitcoin-tooltip': {
      color: bitcoinOrange
    }
  }
}));

interface DataFormat {
  date: number;
  value: number;
  bitcoinPrice: number;
}

const HistoricFearGreedIndexChart: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const bitcoinHashRate = useAppSelector(selectBitcoinHashRate);

  const formatRawData = () => {
    const chartData: DataFormat[] = [];
    bitcoinHashRate.value.forEach((hashRateData: BitcoinHashRate) => {
      chartData.push({
        date: hashRateData.x,
        value: hashRateData.y,
        bitcoinPrice: hashRateData.bitcoinPrice
      })
    })
    return chartData
  };

  return (
    <>
      {bitcoinHashRate.value.length === 0 ? (
        <ChartSkeleton />
      ) : (
        <ResponsiveContainer height="100%" width="100%" className={classes.responsiveContainer}>
          <AreaChart
            data={formatRawData()}
            margin={{ top: 8, right: 4, left: 4, bottom: 8 }}
          >
            <defs>
              <linearGradient id="bitcoin-hash-rate-chart-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={theme.palette.secondary.main}
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor={theme.palette.secondary.main}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="bitcoin-chart-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={bitcoinOrange}
                  stopOpacity={0.2}
                />
                <stop
                  offset="80%"
                  stopColor={bitcoinOrange}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" hide />
            <YAxis
              yAxisId="bitcoin-hash-rate-chart"
              domain={[(dataMin: number) => dataMin * 0.95, (dataMax: number) => dataMax * 1.05]}
              hide
            />
            <YAxis
              yAxisId="bitcoin-chart"
              orientation="right"
              domain={[(dataMin: number) => dataMin * 0.95, (dataMax: number) => dataMax * 1.05]}
              hide
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return <Box className={classes.customTooltip}>
                    <Typography variant="body1">
                      {convertTimestamp(label * 1000, true)}
                    </Typography>
                    <Typography variant="body2" color="secondary">
                      Hash Rate: {shortenNumber(payload[0].payload.value)} TH/s
                    </Typography>
                    {bitcoinHashRate.showBitcoinCorrelation &&
                      <Typography variant="body2" id="bitcoin-tooltip">
                        Bitcoin Price: US${roundDecimals(payload[0].payload.bitcoinPrice, 0)}
                      </Typography>
                    }
                  </Box>
                } else {
                  return null
                }
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              yAxisId="bitcoin-hash-rate-chart"
              dot={false}
              animationDuration={3000}
              strokeWidth={2}
              stroke={theme.palette.secondary.main}
              fillOpacity={1}
              fill={`url(#bitcoin-hash-rate-chart-gradient)`}
            />
            {bitcoinHashRate.showBitcoinCorrelation &&
              <Area
                type="monotone"
                dataKey="bitcoinPrice"
                yAxisId="bitcoin-chart"
                dot={false}
                animationDuration={3000}
                strokeWidth={2}
                strokeOpacity={0.3}
                stroke={bitcoinOrange}
                fillOpacity={0.5}
                fill={`url(#bitcoin-chart-gradient)`}
              />
            }
          </AreaChart>
        </ResponsiveContainer>
      )}
    </>
  )
}

export default HistoricFearGreedIndexChart
