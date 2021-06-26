import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectGasOracle, setGasLimit } from '../../../../features/gasOracleSlice';

const useStyles = makeStyles((theme: Theme) => ({
  gasLimitField: {
    width: 100,
    margin: '12px 12px 0 0',
    '& .MuiOutlinedInput-input': {
      padding: '10px 12px'
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(10px, 12px) scale(1)'
    },
    '& .MuiInputLabel-shrink': {
      transform: 'translate(14px, -6px) scale(0.75)'
    },
    '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      display: 'none',
    }
  }
}));

const GasLimitTextField: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const gasOracle = useAppSelector(selectGasOracle);

  return (
    <TextField
      className={classes.gasLimitField}
      label="Gas Limit"
      variant="outlined"
      defaultValue={gasOracle.gasLimit}
      onChange={(e) => dispatch(setGasLimit(Number(e.target.value)))}
      type="number"
    />
  )
}

export default GasLimitTextField
