import React from 'react';
import { Box } from '@material-ui/core';
import CoinPriceIndicator from '../atoms/CoinPriceIndicator';
import ThemeToggleSwitch from '../atoms/ThemeToggleSwitch';
import CurrencyIndicator from '../atoms/CurrencyIndicator';
import { useAppSelector } from '../../../../app/hooks';
import { selectCoins } from '../../../../features/coinsSlice';

const DrawerFooter: React.FC = () => {
  const coins = useAppSelector(selectCoins);
  const top2Coins = coins.value.slice(0, 2);

  return (
    <Box
      position="absolute"
      bottom={0}
      width="100%"
      padding="0 22px 12px"
    >
      <Box display="flex" alignItems="center" paddingBottom={2}>
        {top2Coins.length === 2 &&
          <>
            <CoinPriceIndicator coin={top2Coins[0]} />
            <CoinPriceIndicator coin={top2Coins[1]} />
          </>
        }
      </Box>
      <Box display="flex" alignItems="center">
        <ThemeToggleSwitch />
        <CurrencyIndicator />
      </Box>
    </Box>
  )
}

export default DrawerFooter;
