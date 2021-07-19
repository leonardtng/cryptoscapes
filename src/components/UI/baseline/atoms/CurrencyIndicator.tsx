import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { LanguageRounded } from '@material-ui/icons';
import TooltipBasicLayout from '../../../templates/TooltipBasicLayout';

const useStyles = makeStyles((theme: Theme) => ({
  contentWrapper: {
    cursor: 'pointer'
  },
  currencyIcon: {
    marginRight: 8
  }
}));

const CurrencyIndicator: React.FC = () => {
  const classes = useStyles();

  return (
    <TooltipBasicLayout title="Prices are displayed in US dollars">
      <Box width="50%" display="flex" alignItems="center" justifyContent="center" className={classes.contentWrapper}>
        <LanguageRounded className={classes.currencyIcon} />
        <Typography variant="body1">USD</Typography>
      </Box>
    </TooltipBasicLayout>
  )
}

export default CurrencyIndicator
