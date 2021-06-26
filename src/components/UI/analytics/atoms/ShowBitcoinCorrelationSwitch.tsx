import React from 'react';
import { Theme, makeStyles, withStyles } from '@material-ui/core/styles';
import { Switch, Tooltip } from '@material-ui/core'
import { useAppDispatch } from '../../../../app/hooks';
import { bitcoinOrange } from '../../../../common/helpers/fixedColors';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

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
  track: {}
})(Switch);

interface Props {
  currentState: boolean;
  toggleFunction: ActionCreatorWithPayload<boolean, string>;
}

const ShowBitcoinCorrelationSwitch: React.FC<Props> = ({ currentState, toggleFunction }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  return (
    <Tooltip title={`${currentState ? 'Hide' : 'Show'} Bitcoin Price`}>
      <CustomSwitch
        className={classes.bitcoinCorrelationSwitch}
        checked={currentState}
        onChange={() => dispatch(toggleFunction(!currentState))}
      />
    </Tooltip>

  )
}

export default ShowBitcoinCorrelationSwitch
