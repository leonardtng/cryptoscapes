import React from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import ChartSkeleton from '../../../skeletons/ChartSkeleton';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CoinMarketChart } from '../../../../models';
import { useAppSelector } from '../../../../app/hooks';
import { selectCoinDetailsMarketChart } from '../../../../features/coinDetailsMarketChartSlice';
import ChartOptionToggleGroup from '../atoms/ChartOptionToggleGroup';
import { toggleButtonsHeight } from '../../../../common/shared/dimensions';
import { convertTimestamp, formatNumber, roundDecimals } from '../../../../common/helpers';

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
    '& .MuiTypography-root:nth-child(2)': {
      color: theme.palette.primary.main
    }
  }
}));

interface DataFormat {
  date: number;
  value: number;
}

const CoinDetailsChart: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const coinDetailsMarketChart = useAppSelector(selectCoinDetailsMarketChart);

  const getLabel = () => {
    switch (coinDetailsMarketChart.selectedDataType) {
      case ('marketCaps'):
        return 'Market Cap'
      case ('prices'):
        return 'Price'
      case ('totalVolumes'):
        return 'Total Volume'
    }
  }

  const formatRawData = (dataKey: keyof CoinMarketChart) => {
    const chartData: DataFormat[] = [];
    coinDetailsMarketChart.value[dataKey]
      .forEach((dataPair: [number, number]) => {
        chartData.push({ date: dataPair[0], value: dataPair[1] })
      });
    return chartData
  };

  return (
    <>
      <ChartOptionToggleGroup />
      <Box height="100%" width="100%">
        {coinDetailsMarketChart.status === 'LOADING' ? (
          <ChartSkeleton />
        ) : (
          <ResponsiveContainer height="100%" width="100%" className={classes.responsiveContainer}>
            <AreaChart
              data={formatRawData(coinDetailsMarketChart.selectedDataType)}
              margin={{ top: toggleButtonsHeight + theme.spacing(3), right: 0, left: 0, bottom: theme.spacing(3) }}
            >
              <defs>
                <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tickFormatter={tick => convertTimestamp(tick)} hide />
              <YAxis domain={[(dataMin: number) => dataMin * 0.99, (dataMax: number) => dataMax * 1.01]} hide />
              <Tooltip
                cursor={{ stroke: theme.palette.text.secondary }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return <Box className={classes.customTooltip}>
                      <Typography variant="body1">
                        {convertTimestamp(label, true)}
                      </Typography>
                      <Typography variant="body2">
                        {`${getLabel()}: US${formatNumber(roundDecimals(payload[0].payload.value) ||
                          roundDecimals(payload[0].payload.value, 9))}`}

                      </Typography>
                    </Box>
                  } else {
                    return null
                  }
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                dot={false}
                animationDuration={3000}
                strokeWidth={2}
                stroke={theme.palette.primary.main}
                fillOpacity={1}
                fill={`url(#chart-gradient)`}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Box>
    </>
  )
}

export default CoinDetailsChart
