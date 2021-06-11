import React from 'react';
import { useTheme } from '@material-ui/core';
import { Area, AreaChart, YAxis } from 'recharts';
import { Coin, CoinMarketChart } from '../../../models';
import { useAppSelector } from '../../../app/hooks';
import { selectCoinMarketChartList } from '../../../features/coinMarketChartList';

interface ChartDataFormat {
  date: number;
  value: number;
}

interface Props {
  coin: Coin;
  dataKey: keyof CoinMarketChart;
}

const SmallCoinChart: React.FC<Props> = ({ coin, dataKey }) => {
  const theme = useTheme();
  const coinMarketChartList = useAppSelector(selectCoinMarketChartList);
  const gain = coin.priceChangePercentage24H > 0;

  const formatRawData = (coinId: string, dataKey: keyof CoinMarketChart) => {
    const chartData: ChartDataFormat[] = [];
    coinMarketChartList.value[coinId][dataKey]
    .forEach((dataPair: [number, number]) => {
      chartData.push({ date: dataPair[0], value: dataPair[1] })
    });
    return chartData
  }

  return (
    <>
      {coinMarketChartList.value[coin.id] && 
        <AreaChart
          height={60}
          width={100}
          data={formatRawData(coin.id, dataKey)}
          margin={{ top: 0, right: 8, left: 8, bottom: 0 }}
        >
          <defs>
            <linearGradient id={gain ? 'gain' : 'loss'} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={gain ? theme.palette.success.main : theme.palette.error.main}
                stopOpacity={0.5}
              />
              <stop
                offset="60%"
                stopColor={gain ? theme.palette.success.main : theme.palette.error.main}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <YAxis domain={[(dataMin: number) => dataMin * 0.95, (dataMax: number) => dataMax * 1.05]} hide />
          <Area
            type="monotone"
            dataKey="value"
            dot={false}
            animationDuration={3000}
            stroke={gain ? theme.palette.success.main : theme.palette.error.main}
            fillOpacity={1}
            fill={`url(#${gain ? 'gain' : 'loss'})`}
          />
        </AreaChart>
      }
    </>
  )
}

export default SmallCoinChart
