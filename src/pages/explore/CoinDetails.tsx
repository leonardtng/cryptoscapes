import React from 'react';
import { useParams } from 'react-router';

const CoinDetails: React.FC = () => {
  const { coinId }: { coinId: string } = useParams();

  return (
    <div>
      {coinId}
    </div>
  )
}

export default CoinDetails
