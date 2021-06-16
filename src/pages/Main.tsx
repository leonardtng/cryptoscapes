import React from 'react';
import { AccountBalanceRounded, DataUsageRounded, People, SelectAllRounded, TollRounded, TrendingUpRounded } from '@material-ui/icons';
import { BrowserRouter } from 'react-router-dom';
import PageLayout from '../components/templates/PageLayout';
import Overview from './analytics/Overview';
import Exchanges from './analytics/Exchanges';
import Trends from './analytics/Trends';
import Events from './explore/Events';
import Coins from './explore/Coins';
import DeFi from './explore/DeFi';
import { RootModule } from '../models';

const Main: React.FC = () => {
  const rootModule: RootModule[] = [
    {
      moduleName: 'Analytics',
      pages: [
        {
          label: 'Overview',
          path: '/',
          icon: <DataUsageRounded />,
          page: <Overview />,
          index: 0
        },
        {
          label: 'Trends',
          path: '/trends',
          icon: <TrendingUpRounded />,
          page: <Trends />,
          index: 1
        }
      ]
    },
    {
      moduleName: 'Explore',
      pages: [
        {
          label: 'Coins',
          path: '/coins',
          icon: <TollRounded />,
          page: <Coins />,
          index: 2
        },
        {
          label: 'Exchanges',
          path: '/exchanges',
          icon: <AccountBalanceRounded />,
          page: <Exchanges />,
          index: 2
        },
        {
          label: 'DeFi',
          path: '/defi',
          icon: <SelectAllRounded />,
          page: <DeFi />,
          index: 2
        },
        {
          label: 'Events',
          path: '/events',
          icon: <People />,
          page: <Events />,
          index: 2
        }
      ]
    }
  ];

  return (
    <BrowserRouter>
      <PageLayout rootModule={rootModule} />
    </BrowserRouter>
  );
}

export default Main;