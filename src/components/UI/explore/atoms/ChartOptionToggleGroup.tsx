import React from 'react';
import { Theme, makeStyles, withStyles } from '@material-ui/core/styles';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { AvailableDayRanges, CoinMarketChart } from '../../../../models';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectCoinDetailsMarketChart, setSelectedDataType, setSelectedDayRange } from '../../../../features/coinDetailsMarketChartSlice';
import { toggleButtonsHeight } from '../../../../common/shared/dimensions';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  toggleButtonGroup: {
    // '& #data-type .MuiToggleButton-root.Mui-selected': {
    //   backgroundColor: `${theme.palette.primary.main}25`,
    //   color: theme.palette.primary.main
    // },
    // '& #date-range .MuiToggleButton-root.Mui-selected': {
    //   backgroundColor: `${theme.palette.secondary.main}25`,
    //   color: theme.palette.secondary.main
    // }
  }
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

const ChartOptionToggleGroup: React.FC = () => {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const coinDetailsMarketChart = useAppSelector(selectCoinDetailsMarketChart);

  return (
    <Box
      position="absolute"
      display="flex"
      justifyContent="space-between"
      width="100%"
      height={toggleButtonsHeight}
      paddingLeft={3}
      paddingRight={3}
      zIndex={1}
      className={classes.toggleButtonGroup}
    >
      <StyledToggleButtonGroup
        id="data-type"
        value={coinDetailsMarketChart.selectedDataType}
        exclusive
        onChange={
          (event: React.MouseEvent<HTMLElement>, newDataType: keyof CoinMarketChart | null): void => {
            if (newDataType !== null) {
              dispatch(setSelectedDataType(newDataType));
            };
          }}
      >
        <ToggleButton value="prices">
          Price
        </ToggleButton>
        <ToggleButton value="marketCaps">
          Market Cap
        </ToggleButton>
        <ToggleButton value="totalVolumes">
          Volume
        </ToggleButton>
      </StyledToggleButtonGroup>
      <StyledToggleButtonGroup
        id="date-range"
        value={coinDetailsMarketChart.selectedDayRange}
        exclusive
        onChange={
          (event: React.MouseEvent<HTMLElement>, newDayRange: AvailableDayRanges | null): void => {
            if (newDayRange !== null) {
              dispatch(setSelectedDayRange(newDayRange));
            };
          }}
      >
        <ToggleButton value={1}>
          1D
        </ToggleButton>
        <ToggleButton value={7}>
          7D
        </ToggleButton>
        <ToggleButton value={30}>
          1M
        </ToggleButton>
        <ToggleButton value={90}>
          3M
        </ToggleButton>
        <ToggleButton value={365}>
          1Y
        </ToggleButton>
        <ToggleButton value={730}>
          2Y
        </ToggleButton>
        <ToggleButton value="max">
          Max
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Box>
  )
}

export default ChartOptionToggleGroup
