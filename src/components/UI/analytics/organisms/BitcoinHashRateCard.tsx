import React, { useEffect } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Avatar, CardContent, CardHeader, SvgIcon, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import CardLayout from '../../../templates/CardLayout';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { fetchBitcoinHashRate, selectBitcoinHashRate, setShowBitcoinCorrelation } from '../../../../features/bitcoinHashRateSlice';
import { ReactComponent as MiningIcon } from '../../../../assets/images/icons/mining-icon.svg';
import HelpIconHeader from '../atoms/HelpIconHeader';
import { shortenNumber } from '../../../../common/helpers';
import BitcoinHashRateChart from '../molecules/BitcoinHashRateChart';
import ShowBitcoinCorrelationSwitch from '../atoms/ShowBitcoinCorrelationSwitch';

const useStyles = makeStyles((theme: Theme) => ({
  avatarColor: {
    marginRight: 6,
    backgroundColor: theme.palette.card.paper,
    borderRadius: 8
  },
  contentWrapper: {
    flex: 1,
    padding: '16px 0 24px'
  }
}));

const BitcoinHashRateCard: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const bitcoinHashRate = useAppSelector(selectBitcoinHashRate)

  useEffect(() => {
    if (bitcoinHashRate.value.length === 0 && bitcoinHashRate.status === 'IDLE') {
      dispatch(fetchBitcoinHashRate());
    }
  }, [dispatch, bitcoinHashRate.value, bitcoinHashRate.status]);

  return (
    <CardLayout>
      <CardHeader
        title={
          <HelpIconHeader
            title="Bitcoin Hash Rate"
            tooltipContent={
              <Typography variant="subtitle2" color="textSecondary">
                The estimated number of terahashes per second the Bitcoin network is performing in the last 24 hours
              </Typography>
            }
          />
        }
        titleTypographyProps={{ variant: 'body2', color: 'textSecondary' }}
        subheader={
          bitcoinHashRate.today !== null ?
            `${shortenNumber(bitcoinHashRate.today.y)} TH/s` :
            <Skeleton height={32} width={150} />
        }
        subheaderTypographyProps={{ variant: 'h6', color: 'textPrimary' }}
        avatar={
          <Avatar variant="rounded" className={classes.avatarColor}>
            <SvgIcon color="secondary">
              <MiningIcon />
            </SvgIcon>
          </Avatar>
        }
        action={
          <ShowBitcoinCorrelationSwitch
            currentState={bitcoinHashRate.showBitcoinCorrelation}
            toggleFunction={setShowBitcoinCorrelation}
          />
        }
      />
      <CardContent className={classes.contentWrapper}>
        <BitcoinHashRateChart />
      </CardContent>
    </CardLayout>
  )
}

export default BitcoinHashRateCard
