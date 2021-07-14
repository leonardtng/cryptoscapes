import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { ExchangeVolumeChartDayRanges } from '../../../../models';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectExchangeVolumeChart, setSelectedDayRange } from '../../../../features/exchangeVolumeChartSlice';
import { toggleButtonsHeight } from '../../../../common/shared/dimensions';
import { Box } from '@material-ui/core';

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

const ExchangeVolumeChartToggle: React.FC = () => {
  const dispatch = useAppDispatch();
  const exchangeVolumeChart = useAppSelector(selectExchangeVolumeChart);

  return (
    <Box
      position="absolute"
      display="flex"
      justifyContent="flex-end"
      width="100%"
      height={toggleButtonsHeight}
      paddingRight={2}
      zIndex={1}
    >
      <StyledToggleButtonGroup
        value={exchangeVolumeChart.selectedDayRange}
        exclusive
        onChange={
          (event: React.MouseEvent<HTMLElement>, newDayRange: ExchangeVolumeChartDayRanges | null): void => {
            if (newDayRange !== null) {
              dispatch(setSelectedDayRange(newDayRange));
            };
          }}
      >
        <ToggleButton value={1}>
          1D
        </ToggleButton>
        <ToggleButton value={14}>
          14D
        </ToggleButton>
        <ToggleButton value={30}>
          1M
        </ToggleButton>
      </StyledToggleButtonGroup>
    </Box>
  )
}

export default ExchangeVolumeChartToggle
