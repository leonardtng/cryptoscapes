import React from 'react';
import { useTheme } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useSelector } from 'react-redux';
import { Coin, CoinMarketChart } from '../../../models';
import { shortenNumber } from '../../../common/helpers/shortenNumber';
import { convertTimestamp } from '../../../common/helpers/dateHandler';
import { selectDominanceChartList } from '../../../features/dominanceChartList';

interface DataFormat {
  date: number;
  top1: number;
  top2: number;
}

interface Props {
  coinList: Coin[];
  dataKey: keyof CoinMarketChart;
}

const CoinDominanceChart: React.FC<Props> = ({ coinList, dataKey }) => {
  const theme = useTheme();
  const dominanceChartList = useSelector(selectDominanceChartList);

  const top1 = coinList[0];
  const top2 = coinList[1];

  const formatRawData = (top1: string, top2: string, dataKey: keyof CoinMarketChart) => {
    const newData: DataFormat[] = [];
    dominanceChartList.value[top1][dataKey]
      .forEach((dataPair: [number, number], index: number) => {
        const correspondingDataPair = dominanceChartList.value[top2][dataKey][index];
        if (correspondingDataPair) {
          newData.push(
            {
              date: dataPair[0],
              top1: dataPair[1],
              top2: correspondingDataPair[1]
            })
        }
      });
    return newData
  }

  return (
    <>
      {!dominanceChartList.value[top1.id] || !dominanceChartList.value[top2.id] ? (
        <Skeleton animation="wave" height="100%" id="titleSkeleton" style={{ margin: '0 20px' }} />
      ) : (
        <ResponsiveContainer height="100%" width="100%">
          <AreaChart data={formatRawData(top1.id, top2.id, dataKey)}
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <defs>
              <linearGradient id="top1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.3} />
                <stop offset="55%" stopColor={theme.palette.primary.main} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="top2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme.palette.secondary.main} stopOpacity={0.3} />
                <stop offset="95%" stopColor={theme.palette.secondary.main} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tickFormatter={tick => convertTimestamp(tick)}
            />
            <YAxis
              tickFormatter={tick => shortenNumber(tick)}
            />
            <Tooltip
              formatter={(value: number, name: string) =>
                [shortenNumber(value), name === 'top1' ? top1.name : top2.name]}
            />
            <Area
              type="monotone"
              dataKey="top1"
              dot={false}
              animationDuration={3000}
              stroke={theme.palette.primary.main}
              fillOpacity={1}
              fill="url(#top1)"
            />
            <Area
              type="monotone"
              dataKey="top2"
              dot={false}
              animationDuration={3000}
              stroke={theme.palette.secondary.main}
              fillOpacity={1}
              fill="url(#top2)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </>
  )
}

export default CoinDominanceChart