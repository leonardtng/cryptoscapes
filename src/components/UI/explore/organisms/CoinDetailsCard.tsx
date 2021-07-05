import React, { useEffect } from 'react';
import { CardHeader } from '@material-ui/core';
import { useAppDispatch } from '../../../../app/hooks';
import CardLayout from '../../../templates/CardLayout';
import { fetchCoinDetails } from '../../../../features/coinDetailsSlice';
import CoinDetailsHeader from '../molecules/CoinDetailsHeader';

interface Props {
  coinId: string;
}

const CoinDetailsCard: React.FC<Props> = ({ coinId }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCoinDetails(coinId));
  }, [dispatch, coinId]);

  return (
    <CardLayout>
      <CardHeader
        title={<CoinDetailsHeader />}
      />
    </CardLayout>
  )
}

export default CoinDetailsCard
