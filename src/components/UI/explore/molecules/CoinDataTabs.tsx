import React, { useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Tab, Tabs } from '@material-ui/core';
import TabPanel from '../atoms/TabPanel';
import CoinDetailsChart from './CoinDetailsChart';
import CoinMarketDataSection from './CoinMarketDataSection';
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
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Charts" value="charts" />
            <Tab label="Market Data" value="marketData" />
            <Tab label="Social" value="social" />
            <Tab label="Sentiment" value="sentiment" />
          </Tabs>
        </AppBar>
      </Box>
      <TabPanel value={value} index="charts">
        <CoinDetailsChart />
      </TabPanel>
      <TabPanel value={value} index="marketData" {...{ paddingLeft: 3, paddingRight: 3, overflow: 'scroll' }}>
        <CoinMarketDataSection />
      </TabPanel>
      <TabPanel value={value} index="social" {...{ paddingLeft: 3, paddingRight: 3 }}>
        Social
      </TabPanel>
      <TabPanel value={value} index="sentiment" {...{ paddingLeft: 3, paddingRight: 3 }}>
        Sentiment
      </TabPanel>
    </>
  )
}

export default CoinDataTabs
