import React, { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { CircularProgress, Typography } from '@material-ui/core';
import { useStore } from 'react-redux';
import { RootState } from '../../../../app/store';

const GlobalLoadingProgress: React.FC = () => {
  const theme = useTheme();
  const store = useStore();

  const [allStates, setAllStates] = useState<RootState>(store.getState() as RootState);
  const [globalLoading, setGlobalLoading] = useState<boolean>(false);

  store.subscribe(() => {
    setAllStates(store.getState());
  });

  useEffect(() => {
    setGlobalLoading(!!Object.values(allStates).find((item: any) => item.status === 'LOADING'));
  }, [allStates]);

  if (globalLoading) {
    return (
      <>
        <Typography variant="caption" color="textSecondary">Fetching Data...</Typography>
        <CircularProgress size={theme.spacing(3)} />
      </>
    )
  } else {
    return null
  }
}

export default GlobalLoadingProgress;
