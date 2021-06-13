import React, { useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { CardHeader, Tooltip } from '@material-ui/core';
import { Skeleton, ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import CardLayout from '../molecules/CardLayout';
import MarketCapDonutChart from '../atoms/MarketCapDonutChart';
import { useAppSelector } from '../../../app/hooks';
import { selectGlobalCoinData } from '../../../features/globalCoinDataSlice';
import { shortenNumber } from '../../../common/helpers/shortenNumber';
import { DashboardRounded, DonutLargeRounded } from '@material-ui/icons';
import MarketCapTreemap from '../atoms/MarketCapTreemap';

const useStyles = makeStyles((theme: Theme) => ({
  chartWrapper: {
    height: 'calc(100% - 84px + 20px)',
    width: '100%',
    marginTop: -20
  },
  chartToggleButtons: {
    margin: '12px 12px 0 0'
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
            <Skeleton animation="wave" height={32} width={50} />
        }
        subheaderTypographyProps={{ variant: 'h6', color: 'textPrimary' }}
        action={
          <ToggleButtonGroup
            size="small"
            className={classes.chartToggleButtons}
            value={chartType}
            exclusive
            onChange={
              (event: React.MouseEvent<HTMLElement>, newChart: 'donut' | 'treemap'): void =>
                setChartType(newChart)
            }
          >
            <ToggleButton value="donut">
              <Tooltip title="Donut Chart" placement="top">
                <DonutLargeRounded />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="treemap">
              <Tooltip title="Treemap" placement="top">
                <DashboardRounded />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        }
      />
      <div className={classes.chartWrapper}>
        {chartType === 'donut' ? <MarketCapDonutChart /> : <MarketCapTreemap />}
      </div>
    </CardLayout>
  )
}

export default MarketCapCard