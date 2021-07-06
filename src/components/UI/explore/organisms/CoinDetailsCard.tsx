import React, { useEffect } from 'react';
import { CardContent, CardHeader } from '@material-ui/core';
import { useAppDispatch } from '../../../../app/hooks';
import CardLayout from '../../../templates/CardLayout';
import { fetchCoinDetails } from '../../../../features/coinDetailsSlice';
import CoinDetailsHeader from '../molecules/CoinDetailsHeader';
import CoinDataCardGroup from '../molecules/CoinDataCardGroup';

interface Props {
  coinId: string;
}

const CoinDetailsCard: React.FC<Props> = ({ coinId }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCoinDetails(coinId));
  }, [dispatch, coinId]);

  // TABS: 'Chart' 'Info' 'Social' 'Sentiment'

  return (
    <CardLayout>
      <CardHeader title={<CoinDetailsHeader />} />
      <CardContent>
        <CoinDataCardGroup />
      </CardContent>
    </CardLayout>
  )
}

export default CoinDetailsCard
