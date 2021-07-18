import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, Tooltip, Typography } from '@material-ui/core';
import { LanguageRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  customTooltip: {
    backgroundColor: theme.palette.card.paper,
    borderRadius: 8,
    padding: 8
  },
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
    <Tooltip title="Prices are displayed in US dollars" classes={{ tooltip: classes.customTooltip }}>
      <Box width="50%" display="flex" alignItems="center" justifyContent="center" className={classes.contentWrapper}>
        <LanguageRounded className={classes.currencyIcon} />
        <Typography variant="body1">USD</Typography>
      </Box>
    </Tooltip>
  )
}

export default CurrencyIndicator
