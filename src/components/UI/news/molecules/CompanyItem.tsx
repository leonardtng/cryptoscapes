import React from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, ListItem, ListItemText, Tooltip, Typography } from '@material-ui/core';
import { Company } from '../../../../models';
import { formatNumber, roundDecimals, shortenNumber } from '../../../../common/helpers';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  ranking: {
    width: 36,
    textAlign: 'center',
    marginRight: 16,
    borderRadius: 6,
    backgroundColor: theme.palette.card.paper
  },
  companyLabelText: {
    width: 90,
  },
  companyHoldings: {
    textAlign: 'right',
  },
  companyValue: {
    width: 'fit-content',
    float: 'right',
    cursor: 'pointer'
  },
  customTooltip: {
    backgroundColor: theme.palette.background.default,
    borderRadius: 8,
    margin: '4px 0 0'
  }
}));

interface Props {
  company: Company;
  index: number;
  coinSymbol: string;
}

const CompanyItem: React.FC<Props> = ({ company, index, coinSymbol }) => {
  const classes = useStyles();
  const theme = useTheme();

  const valueChange = (company.totalCurrentValueUsd - company.totalEntryValueUsd) / company.totalEntryValueUsd * 100;

  return (
    <ListItem >
      <Typography variant="body1" color="textSecondary" className={classes.ranking}>
        #{index + 1}
      </Typography>
      <ListItemText
        className={classes.companyLabelText}
        primary={company.name}
        secondary={company.symbol}
        primaryTypographyProps={{ variant: 'subtitle2', noWrap: true }}
        secondaryTypographyProps={{ variant: 'caption' }}
      />
      <ListItemText
        className={classes.companyHoldings}
        primary={`${formatNumber(roundDecimals(company.totalHoldings))} ${coinSymbol}`}
        secondary={
          <Tooltip
            title={
              <Box>
                <Typography variant="caption" color="textSecondary">Entry Value / Current Value</Typography>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="caption">
                    Value Change:
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    style={{ color: valueChange >= 0 ? theme.palette.success.main : theme.palette.error.main }}
                  >
                    {valueChange >= 0 ? '+' : ''}{valueChange === Infinity ? '∞' : roundDecimals(valueChange, 2)}%
                  </Typography>
                </Box>
              </Box>
            }
            placement="bottom"
            classes={{ tooltip: classes.customTooltip }}
            className={classes.companyValue}
          >
            <Typography variant="caption">
              {`US$${shortenNumber(company.totalEntryValueUsd)} / US$${shortenNumber(company.totalCurrentValueUsd)}`}
            </Typography>
          </Tooltip>
        }
        primaryTypographyProps={{ variant: 'subtitle2', noWrap: true }}
        secondaryTypographyProps={{ variant: 'caption' }}
      />
    </ListItem>
  )
}

export default CompanyItem