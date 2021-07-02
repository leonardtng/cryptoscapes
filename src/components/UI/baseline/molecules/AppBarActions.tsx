import React from 'react';
import {  Box } from '@material-ui/core';
import MainLogo from '../atoms/MainLogo';
import SearchField from '../atoms/SearchField';

const AppBarActions: React.FC = () => {
  return (
    <Box display="flex">
      <MainLogo />
      <SearchField />
    </Box>
  )
}

export default AppBarActions;
