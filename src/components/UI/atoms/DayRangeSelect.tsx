import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCoinMarketChartList, setSelectedDayRange } from '../../../features/coinMarketChartListSlice';
import { AvailableDayRanges } from '../../../models/api/CoinMarketChart';

const useStyles = makeStyles((theme: Theme) => ({
  dayRangeSelect: {
    width: 120,
    margin: '12px 12px 0 0',
    borderRadius: 12,
    '& .MuiOutlinedInput-root': {
      borderRadius: 12,
      backgroundColor: theme.palette.background.paper,
      '& .MuiOutlinedInput-input': {
        padding: '12px 26px'
      },
      '& .MuiSelect-select:focus': {
        borderRadius: 12
      }
    }
  },
  menuPaper: {
    borderRadius: 12,
  }
}));

const DayRangeSelect: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const coinMarketChartList = useAppSelector(selectCoinMarketChartList);

  return (
    <FormControl variant="outlined" className={classes.dayRangeSelect}>
      <Select
        value={coinMarketChartList.selectedDayRange}
        onChange={(event: React.ChangeEvent<{ name?: string; value: unknown }>) =>
          dispatch(setSelectedDayRange(event.target.value as AvailableDayRanges))}
        MenuProps={{
          classes: { paper: classes.menuPaper },
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'left'
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left'
          },
          getContentAnchorEl: null
        }}
      >
        <MenuItem value={1}>1 Day</MenuItem>
        <MenuItem value={14}>14 Days</MenuItem>
        <MenuItem value={30}>30 Days</MenuItem>
        <MenuItem value="max">Max</MenuItem>
      </Select>
    </FormControl>
  )
}

export default DayRangeSelect