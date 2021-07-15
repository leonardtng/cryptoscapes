import React, { useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Tab, Tabs } from '@material-ui/core';
import TabPanelLayout from '../../../templates/TabPanelLayout';
import CoinDetailsChart from '../molecules/CoinDetailsChart';
import CoinDescription from '../molecules/CoinDescription';
import CoinStatisticsWrapper from '../molecules/CoinStatisticsWrapper';
import CoinSocialStats from '../molecules/CoinSocialStats';
import DeveloperStats from '../molecules/DeveloperStats';
import { CoinDetailsTabValues } from '../../../../models';

const useStyles = makeStyles((theme: Theme) => ({
  tabBar: {
    boxShadow: 'none',
    borderBottom: `2px solid ${theme.palette.card.paper}`,
    '& .MuiTabs-indicator': {
      height: 4,
      borderRadius: 2,
    }
  },
}));

const CoinDataTabs: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = useState<CoinDetailsTabValues>('charts');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: CoinDetailsTabValues) => {
    setValue(newValue);
  };

  return (
    <>
      <Box padding={3}>
        <AppBar className={classes.tabBar} position="static" color="transparent">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Charts" value="charts" />
            <Tab label="Market Data" value="marketData" />
            <Tab label="Community" value="community" />
            <Tab label="Developer" value="developer" />
          </Tabs>
        </AppBar>
      </Box>
      <TabPanelLayout value={value} index="charts">
        <CoinDetailsChart />
      </TabPanelLayout>
      <TabPanelLayout value={value} index="marketData" {...{ paddingLeft: 3, paddingRight: 3, overflow: 'scroll' }}>
        <CoinDescription />
        <CoinStatisticsWrapper />
      </TabPanelLayout>
      <TabPanelLayout value={value} index="community" {...{ paddingLeft: 3, paddingRight: 3, overflow: 'scroll' }}>
        <CoinSocialStats />
      </TabPanelLayout>
      <TabPanelLayout value={value} index="developer" {...{ paddingLeft: 3, paddingRight: 3, overflow: 'scroll' }}>
        <DeveloperStats />
      </TabPanelLayout>
    </>
  )
}

export default CoinDataTabs
