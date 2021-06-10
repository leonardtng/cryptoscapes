import React, { useEffect } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Avatar, CardContent, CardHeader } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import CardLayout from '../molecules/CardLayout';
import { fetchGasOracle, selectGasOracle } from '../../../features/gasOracleSlice';
import { LocalGasStationRounded } from '@material-ui/icons';
import { selectCoins } from '../../../features/coinsSlice';
import { Coin } from '../../../models';
import GasLimitTextField from '../atoms/GasLimitTextField';
import GasIndicatorGroup from '../molecules/GasIndicatorGroup';
import { roundDecimals } from '../../../common/helpers/roundDecimals';

const useStyles = makeStyles((theme: Theme) => ({
  avatarColor: {
    marginRight: 6,
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.card.paper,
    borderRadius: 8
  }
}));

const GasOracleCard: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const coins = useAppSelector(selectCoins);
  const gasOracle = useAppSelector(selectGasOracle);

  const ethereum: Coin | undefined = coins.value.find((coin: Coin) => {
    return coin.id === 'ethereum'
  });

  const calculateTransactionFee = (ethereum: Coin) => {
    return 0.000000001 * ethereum.currentPrice * gasOracle.gasLimit * Number(gasOracle.selectedGasFee)
  };

  useEffect(() => {
    if (!gasOracle.value.lastBlock && gasOracle.status === 'IDLE') {
      dispatch(fetchGasOracle());
    }
  }, [dispatch, gasOracle.value, gasOracle.status]);

  return (
    <CardLayout>
      <CardHeader
        title="ETH Gas Station"
        titleTypographyProps={{ variant: 'caption', color: 'textSecondary' }}
        subheader={
          ethereum && gasOracle.selectedGasFee ?
            `Fee: US$${roundDecimals(calculateTransactionFee(ethereum))}` :
            <Skeleton animation="wave" height={24} width={150} />
        }
        subheaderTypographyProps={{ variant: 'body1', color: 'textPrimary' }}
        avatar={
          <Avatar variant="rounded" className={classes.avatarColor}>
            <LocalGasStationRounded />
          </Avatar>
        }
        action={<GasLimitTextField />}
      />
      <CardContent>
        <GasIndicatorGroup />
      </CardContent>
    </CardLayout>
  )
}

export default GasOracleCard
