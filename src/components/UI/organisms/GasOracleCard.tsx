import React, { useEffect, useState } from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, CardContent, CardHeader, Grid, TextField } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import CardLayout from '../molecules/CardLayout';
import { fetchGasOracle, selectGasOracle } from '../../../features/gasOracleSlice';
import { FastForwardRounded, HourglassEmptyRounded, LocalGasStationRounded, ScheduleRounded } from '@material-ui/icons';
import GasIndicator from '../atoms/GasIndicator';
import { selectCoins } from '../../../features/coinsSlice';
import { Coin } from '../../../models';

const useStyles = makeStyles((theme: Theme) => ({
  avatarColor: {
    marginRight: 6,
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.card.paper,
    borderRadius: 8
  },
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
  },
  conditionalButtonChild: {
    '& .MuiButton-outlined': {
      height: 88,
      border: `2px solid ${theme.palette.secondary.main}`
    }
  }
}));

const GasOracleCard: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const coins = useAppSelector(selectCoins);
  const gasOracle = useAppSelector(selectGasOracle);

  const ethereum: Coin | undefined = coins.value.find((coin: Coin) => {
    return coin.id === 'ethereum'
  })

  const [selectedGasFee, setSelectedGasFee] = useState<string | null>(null);
  const [gasLimit, setGasLimit] = useState<number>(21000);

  useEffect(() => {
    if (gasOracle.value.lastBlock.length === 0 && gasOracle.status === 'IDLE') {
      dispatch(fetchGasOracle());
    }
  }, [dispatch, gasOracle.value, gasOracle.status]);

  useEffect(() => {
    if (gasOracle.value.proposeGasPrice) {
      setSelectedGasFee(gasOracle.value.proposeGasPrice);
    }
  }, [gasOracle.value.proposeGasPrice]);

  return (
    <CardLayout>
      <CardHeader
        title="ETH Gas Station"
        titleTypographyProps={{ variant: 'caption', color: 'textSecondary' }}
        subheader={
          ethereum && selectedGasFee ?
            `Fee: US$${Math.round(
              0.000000001 * ethereum.currentPrice * gasLimit * Number(selectedGasFee) * 100
            ) / 100}` :
            <Skeleton animation="wave" height={24} width={150} />
        }
        subheaderTypographyProps={{ variant: 'body1', color: 'textPrimary' }}
        avatar={
          <Avatar variant="rounded" className={classes.avatarColor}>
            <LocalGasStationRounded />
          </Avatar>
        }
        action={
          <TextField
            className={classes.gasLimitField}
            label="Gas Limit"
            variant="outlined"
            defaultValue={gasLimit}
            onChange={(e) => setGasLimit(Number(e.target.value))}
            type="number"
          />
        }
      />
      <CardContent>
        <Grid container spacing={2} className={classes.conditionalButtonChild}>
          <Grid item xs={4}>
            <GasIndicator
              header="Slow"
              price={gasOracle.value.safeGasPrice}
              time="< 30mins"
              icon={<HourglassEmptyRounded />}
              color={theme.palette.error.main}
              selected={selectedGasFee === gasOracle.value.safeGasPrice}
              onClick={() => setSelectedGasFee(gasOracle.value.safeGasPrice)}
            />
          </Grid>
          <Grid item xs={4}>
            <GasIndicator
              header="Normal"
              price={gasOracle.value.proposeGasPrice}
              time="< 5mins"
              icon={<ScheduleRounded />}
              color={theme.palette.warning.main}
              selected={selectedGasFee === gasOracle.value.proposeGasPrice}
              onClick={() => setSelectedGasFee(gasOracle.value.proposeGasPrice)}
            />
          </Grid>
          <Grid item xs={4}>
            <GasIndicator
              header="Fast"
              price={gasOracle.value.fastGasPrice}
              time="< 1min"
              icon={<FastForwardRounded />}
              color={theme.palette.success.main}
              selected={selectedGasFee === gasOracle.value.fastGasPrice}
              onClick={() => setSelectedGasFee(gasOracle.value.fastGasPrice)}
            />
          </Grid>
        </Grid>
      </CardContent>
    </CardLayout>
  )
}

export default GasOracleCard
