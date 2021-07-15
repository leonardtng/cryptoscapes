import React from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { FearGreedIndex } from '../../../../models';
import { useAppSelector } from '../../../../app/hooks';
import { selectFearGreedIndex } from '../../../../features/fearGreedIndexSlice';
import ChartSkeleton from '../../../skeletons/ChartSkeleton';
import { convertTimestamp, roundDecimals } from '../../../../common/helpers';
import { bitcoinOrange } from '../../../../common/shared/colors';

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
  classification: string;
  bitcoinPrice: number;
}

const HistoricFearGreedIndexChart: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const fearGreedIndex = useAppSelector(selectFearGreedIndex);

  const formatRawData = () => {
    const chartData: DataFormat[] = [];
    fearGreedIndex.value.forEach((indexData: FearGreedIndex) => {
      chartData.push({
        date: Number(indexData.timestamp),
        value: Number(indexData.value),
        classification: indexData.valueClassification,
        bitcoinPrice: indexData.bitcoinPrice
      })
    })
    return chartData
  };

  return (
    <>
      {fearGreedIndex.value.length === 0 ? (
        <ChartSkeleton />
      ) : (
        <ResponsiveContainer height="100%" width="100%" className={classes.responsiveContainer}>
          <AreaChart
            data={formatRawData()}
            margin={{ top: 8, right: 0, left: 0, bottom: 8 }}
          >
            <defs>
              <linearGradient id="fear-greed-chart-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={theme.palette.primary.main}
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor={theme.palette.primary.main}
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
              yAxisId="fear-greed-chart"
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
              cursor={{ stroke: theme.palette.text.secondary }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return <Box className={classes.customTooltip}>
                    <Typography variant="body1">
                      {convertTimestamp(label * 1000, true)}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      {payload[0].payload.classification} ({payload[0].payload.value}%)
                    </Typography>
                    {fearGreedIndex.showBitcoinCorrelation &&
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
              yAxisId="fear-greed-chart"
              dot={false}
              animationDuration={3000}
              strokeWidth={2}
              stroke={theme.palette.primary.main}
              fillOpacity={1}
              fill={`url(#fear-greed-chart-gradient)`}
            />
            {fearGreedIndex.showBitcoinCorrelation &&
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
