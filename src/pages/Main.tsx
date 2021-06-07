import React from 'react';
import { AccountBalanceRounded, DataUsageRounded, People, TrendingUpRounded } from '@material-ui/icons';
import { BrowserRouter } from 'react-router-dom';
import PageLayout from '../components/templates/PageLayout';
import { NavItem } from '../components/UI/atoms/NavListItem';
import Coins from './analytics/Coins';
import Exchanges from './analytics/Exchanges';
import Trends from './analytics/Trends';
import Events from './information/Events';

const Main: React.FC = () => {
  const pages: NavItem[] = [
    {
      label: 'Coins',
      path: '/',
      icon: <DataUsageRounded />,
      page: <Coins />,
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
    },
    {
      label: 'Events',
      path: '/events',
      icon: <People />,
      page: <Events />,
      index: 2
    }
  ];

  return (
    <BrowserRouter>
      <PageLayout navItems={pages} />
    </BrowserRouter>
  );
}

export default Main;