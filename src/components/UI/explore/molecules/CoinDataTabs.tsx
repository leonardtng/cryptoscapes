import React, { useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Tab, Tabs } from '@material-ui/core';
import TabPanel from '../atoms/TabPanel';
import CoinDetailsChart from '../atoms/CoinDetailsChart';

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

export type TabValues = 'charts' | 'marketData' | 'social' | 'sentiment';

const CoinDataTabs: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = useState<TabValues>('charts');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: TabValues) => {
    setValue(newValue);
  };

  return (
    <>
      <Box padding={3}>
        <AppBar className={classes.tabBar} position="static" color="transparent">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Charts" />
            <Tab label="Market Data" />
            <Tab label="Social" />
            <Tab label="Sentiment" />
          </Tabs>
        </AppBar>
      </Box>
      <TabPanel value={value} index="charts">
        <CoinDetailsChart />
      </TabPanel>
      <TabPanel value={value} index="marketData">
        Market Data
      </TabPanel>
      <TabPanel value={value} index="social">
        Social
      </TabPanel>
      <TabPanel value={value} index="sentiment">
        Sentiment
      </TabPanel>
    </>
  )
}

export default CoinDataTabs
