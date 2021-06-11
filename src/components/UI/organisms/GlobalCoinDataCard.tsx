import React from 'react';
import { CardHeader } from '@material-ui/core';
import CardLayout from '../molecules/CardLayout';
import { useAppSelector } from '../../../app/hooks';
import { selectGlobalCoinData } from '../../../features/globalCoinDataSlice';

interface Props {
  type: 'marketcap' | 'volume'
}

const GlobalCoinDataCard: React.FC<Props> = ({ type }) => {
  const globalCoinData = useAppSelector(selectGlobalCoinData);
  console.log(globalCoinData)
  return (
    <CardLayout>
      <CardHeader
        title={type === 'marketcap' ? 'Market Cap' : 'Volume'}
        titleTypographyProps={{ variant: 'h6' }}
      />
    </CardLayout>
  )
}

export default GlobalCoinDataCard