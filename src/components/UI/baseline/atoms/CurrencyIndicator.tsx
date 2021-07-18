import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { LanguageRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  currencyIcon: {
    marginRight: 8
  }
}));

const CurrencyIndicator: React.FC = () => {
  const classes = useStyles();

  return (
    <Box width="50%" display="flex" alignItems="center" justifyContent="center">
      <LanguageRounded className={classes.currencyIcon} />
      <Typography variant="body1">USD</Typography>
    </Box>
  )
}

export default CurrencyIndicator
