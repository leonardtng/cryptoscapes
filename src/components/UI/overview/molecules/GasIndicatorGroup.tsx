import React from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectGasOracle, setSelectedGasFee } from '../../../../features/gasOracleSlice';
import { FastForwardRounded, HourglassEmptyRounded, ScheduleRounded } from '@material-ui/icons';
import GasIndicator from '../atoms/GasIndicator';

const useStyles = makeStyles((theme: Theme) => ({
  avatarColor: {
    marginRight: 6,
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.card.paper,
    borderRadius: 8
  },
  conditionalButtonChild: {
    '& .MuiButton-outlined': {
      border: `2px solid ${theme.palette.secondary.main}80`
    }
  }
}));

const GasIndicatorGroup: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const gasOracle = useAppSelector(selectGasOracle);

  const safeLow = gasOracle.value ? gasOracle.value.safeLow : 0;
  const standard = gasOracle.value ? gasOracle.value.average : 0;
  const fast = gasOracle.value ? gasOracle.value.fast : 0;

  return (
    <Grid container spacing={2} className={classes.conditionalButtonChild}>
      <Grid item xs={4}>
        <GasIndicator
          header="Slow"
          price={safeLow}
          time="< 30mins"
          icon={<HourglassEmptyRounded />}
          color={theme.palette.error.main}
          selected={gasOracle.selectedGasFee === safeLow}
          onClick={() => dispatch(setSelectedGasFee(safeLow))}
        />
      </Grid>
      <Grid item xs={4}>
        <GasIndicator
          header="Normal"
          price={standard}
          time="< 5mins"
          icon={<ScheduleRounded />}
          color={theme.palette.warning.main}
          selected={gasOracle.selectedGasFee === standard}
          onClick={() => dispatch(setSelectedGasFee(standard))}
        />
      </Grid>
      <Grid item xs={4}>
        <GasIndicator
          header="Fast"
          price={fast}
          time="< 1min"
          icon={<FastForwardRounded />}
          color={theme.palette.success.main}
          selected={gasOracle.selectedGasFee === fast}
          onClick={() => dispatch(setSelectedGasFee(fast))}
        />
      </Grid>
    </Grid>
  )
}

export default GasIndicatorGroup
