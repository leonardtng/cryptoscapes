import React from 'react';
import { Theme, makeStyles, withStyles } from '@material-ui/core/styles';
import { Switch, Tooltip } from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectFearGreedIndex, setShowBitcoinCorrelation } from '../../../features/fearGreedIndexSlice';
import { bitcoinOrange } from '../molecules/HistoricFearGreedIndexChart';

const useStyles = makeStyles((theme: Theme) => ({
  bitcoinCorrelationSwitch: {
    margin: '12px 12px 0 0'
  }
}));

const CustomSwitch = withStyles({
  switchBase: {
    '&$checked': {
      color: bitcoinOrange,
    },
    '&$checked + $track': {
      backgroundColor: bitcoinOrange,
    },
  },
  checked: {},
  track: {},
})(Switch);

const ShowBitcoinCorrelationSwitch: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const fearGreedIndex = useAppSelector(selectFearGreedIndex);

  return (
    <Tooltip title={`${fearGreedIndex.showBitcoinCorrelation ? 'Hide' : 'Show'} Bitcoin Price`}>
      <CustomSwitch
        className={classes.bitcoinCorrelationSwitch}
        checked={fearGreedIndex.showBitcoinCorrelation}
        onChange={() => dispatch(setShowBitcoinCorrelation(!fearGreedIndex.showBitcoinCorrelation))}
      />
    </Tooltip>

  )
}

export default ShowBitcoinCorrelationSwitch
