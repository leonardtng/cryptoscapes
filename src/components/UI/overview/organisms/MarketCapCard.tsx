import React, { useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Avatar, CardHeader } from '@material-ui/core';
import { Skeleton, ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import CardLayout from '../../../templates/CardLayout';
import MarketCapDonutChart from '../molecules/MarketCapDonutChart';
import { useAppSelector } from '../../../../app/hooks';
import { selectGlobalCoinData } from '../../../../features/globalCoinDataSlice';
import { shortenNumber } from '../../../../common/helpers';
import { DashboardRounded, DonutLargeRounded, PieChartRounded } from '@material-ui/icons';
import MarketCapTreemap from '../molecules/MarketCapTreemap';
import TooltipBasicLayout from '../../../templates/TooltipBasicLayout';

const useStyles = makeStyles((theme: Theme) => ({
  chartWrapper: {
    flex: 1,
    width: '100%',
    marginTop: -20
  },
  chartToggleButtons: {
    margin: '12px 12px 0 0'
  },
  avatarColor: {
    marginRight: 6,
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.card.paper,
    borderRadius: 8
  }
}));

const MarketCapCard: React.FC = () => {
  const classes = useStyles(0);

  const globalCoinData = useAppSelector(selectGlobalCoinData);
  const [chartType, setChartType] = useState<'donut' | 'treemap'>('donut');

  return (
    <CardLayout>
      <CardHeader
        title="Market Cap"
        titleTypographyProps={{ variant: 'body2', color: 'textSecondary' }}
        subheader={
          globalCoinData.value !== null ?
            `US$${shortenNumber(globalCoinData.value.totalMarketCap.usd)}` :
            <Skeleton height={32} width={150} />
        }
        subheaderTypographyProps={{ variant: 'h6', color: 'textPrimary' }}
        avatar={
          <Avatar variant="rounded" className={classes.avatarColor}>
            <PieChartRounded />
          </Avatar>
        }
        action={
          <ToggleButtonGroup
            size="small"
            className={classes.chartToggleButtons}
            value={chartType}
            exclusive
            onChange={
              (event: React.MouseEvent<HTMLElement>, newChart: 'donut' | 'treemap' | null): void => {
                if (newChart !== null) {
                  setChartType(newChart);
                };
              }}
          >
            <ToggleButton value="donut">
              <TooltipBasicLayout title="Donut Chart" placement="top">
                <DonutLargeRounded />
              </TooltipBasicLayout>
            </ToggleButton>
            <ToggleButton value="treemap">
              <TooltipBasicLayout title="Coin Map" placement="top">
                <DashboardRounded />
              </TooltipBasicLayout>
            </ToggleButton>
          </ToggleButtonGroup>
        }
      />
      <div className={classes.chartWrapper}>
        {chartType === 'donut' ? <MarketCapDonutChart coinsToDisplay={5} /> : <MarketCapTreemap coinsToDisplay={58} />}
      </div>
    </CardLayout>
  )
}

export default MarketCapCard