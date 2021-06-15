import React from 'react';
import { AccountBalanceRounded, DataUsageRounded, People, TrendingUpRounded } from '@material-ui/icons';
import { BrowserRouter } from 'react-router-dom';
import PageLayout from '../components/templates/PageLayout';
import Overview from './analytics/Overview';
import Exchanges from './analytics/Exchanges';
import Trends from './analytics/Trends';
import Events from './explore/Events';
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
        },
        {
          label: 'Exchanges',
          path: '/exchanges',
          icon: <AccountBalanceRounded />,
          page: <Exchanges />,
          index: 2
        }
      ]
    },
    {
      moduleName: 'Explore',
      pages: [
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