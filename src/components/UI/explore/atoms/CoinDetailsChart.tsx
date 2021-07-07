import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, useTheme } from '@material-ui/core';
import ChartSkeleton from '../../../skeletons/ChartSkeleton';
import { Area, AreaChart, ResponsiveContainer, YAxis } from 'recharts';
import { CoinMarketChart } from '../../../../models';
import { useAppSelector } from '../../../../app/hooks';
import { selectCoinDetailsMarketChart } from '../../../../features/coinDetailsMarketChartSlice';

const useStyles = makeStyles((theme: Theme) => ({
  responsiveContainer: {
    '& .recharts-surface': {
      cursor: 'pointer'
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

  const formatRawData = (dataKey: keyof CoinMarketChart) => {
    const chartData: DataFormat[] = [];
    coinDetailsMarketChart.value[dataKey]
      .forEach((dataPair: [number, number]) => {
        chartData.push({ date: dataPair[0], value: dataPair[1] })
      });
    return chartData
  };

  return (
    <Box height="100%" width="100%">
      {coinDetailsMarketChart.status === 'LOADING' ? (
        <ChartSkeleton />
      ) : (
        <ResponsiveContainer height="100%" width="100%" className={classes.responsiveContainer}>
          <AreaChart
            data={formatRawData(coinDetailsMarketChart.selectedDataType)}
            margin={{ top: 0, right: -24, left: -24, bottom: 0 }}
          >
            <defs>
              <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.2} />
                <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
              </linearGradient>
            </defs>
            <YAxis domain={[(dataMin: number) => dataMin * 0.95, (dataMax: number) => dataMax * 1.05]} hide />
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
  )
}

export default CoinDetailsChart
