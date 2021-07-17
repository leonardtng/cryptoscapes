import React, { useEffect } from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from '@material-ui/core';
import { CloseRounded } from '@material-ui/icons';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { fetchExchangeVolumeChart, selectExchangeVolumeChart } from '../../../../features/exchangeVolumeChartSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { toggleButtonsHeight } from '../../../../common/shared/dimensions';
import { convertTimestamp, formatNumber, roundDecimals } from '../../../../common/helpers';
import ExchangeVolumeChartToggle from './ExchangeVolumeChartToggle';
import ChartSkeleton from '../../../skeletons/ChartSkeleton';
import { Exchange } from '../../../../models';

const useStyles = makeStyles((theme: Theme) => ({
  dialogPaper: {
    borderRadius: 12
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  chartWrapper: {
    padding: '16px 0 24px',
    height: 300,
    width: 500
  },
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

interface Props {
  open: boolean;
  toggleClose: () => void;
  exchange: Exchange;
}

const ExchangeVolumeDialog: React.FC<Props> = ({ open, toggleClose, exchange }) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const exchangeVolumeChart = useAppSelector(selectExchangeVolumeChart);

  const formatRawData = () => {
    const chartData: DataFormat[] = [];
    exchangeVolumeChart.value.forEach((dataPair: [number, string]) => {
      chartData.push({ date: dataPair[0], value: Number(dataPair[1]) });
    });
    return chartData
  };

  useEffect(() => {
    if (open) {
      dispatch(fetchExchangeVolumeChart({ exchangeId: exchange.id, dayRange: exchangeVolumeChart.selectedDayRange }));
    }
  }, [dispatch, exchange.id, exchangeVolumeChart.selectedDayRange, open]);

  return (
    <Dialog classes={{ paper: classes.dialogPaper }} open={open} onBackdropClick={toggleClose}>
      <DialogTitle disableTypography>
        <Typography variant="h6">{exchange.name} Trading Volume</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={toggleClose}>
          <CloseRounded />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.chartWrapper}>
        <ExchangeVolumeChartToggle />
        {exchangeVolumeChart.status === 'LOADING' ? (
          <ChartSkeleton />
        ) : (
          <>
            {exchangeVolumeChart.status === 'FAILED' ? (
              <Box height="100%" width="100%" display="flex" alignItems="center" justifyContent="center">
                <Typography variant="body2" color="textSecondary">No Data Available</Typography>
              </Box>
            ) : (
              <ResponsiveContainer height="100%" width="100%" className={classes.responsiveContainer}>
                <AreaChart
                  data={formatRawData()}
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
                            {`Total Volume: US${formatNumber(roundDecimals(payload[0].payload.value))}`}
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
          </>

        )}
      </DialogContent>
    </Dialog>
  )
}

export default ExchangeVolumeDialog
