import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Area, AreaChart, ResponsiveContainer, YAxis } from 'recharts';

interface DataFormat {
  index: number;
  value: number;
}

interface Props {
  gain: boolean;
  data: number[];
}

const CoinSparkline: React.FC<Props> = ({ gain, data }) => {
  const theme = useTheme();

  const formatRawData = () => {
    const chartData: DataFormat[] = [];
    data.forEach((value: number, index: number) => {
      chartData.push({ index: index, value: value })
    });
    return chartData
  };

  return (
    <ResponsiveContainer height="100%" width="100%">
      <AreaChart
        data={formatRawData()}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
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
          strokeWidth={2}
          stroke={gain ? theme.palette.success.main : theme.palette.error.main}
          fillOpacity={1}
          fill={`url(#${gain ? 'gain' : 'loss'})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default CoinSparkline
