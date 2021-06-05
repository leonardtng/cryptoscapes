import { AccountBalanceRounded, DataUsageRounded, TrendingUpRounded } from '@material-ui/icons';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PageLayout from '../components/templates/PageLayout';
import { NavItem } from '../components/UI/atoms/NavListItem';
import Coins from './Coins';
import Exchanges from './Exchanges';
import Trends from './Trends';

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
    }
  ];

  return (
    <BrowserRouter>
      <PageLayout navItems={pages} />
    </BrowserRouter>
  );
}

export default Main;