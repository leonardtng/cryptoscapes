import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, Card, CardHeader } from '@material-ui/core';
import { Exchange } from '../../../../models';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.card.default,
    border: `1px solid ${theme.palette.background.default}`,
    borderRadius: 12
  },
}));

interface Props {
  exchange: Exchange;
}

const ExchangeCard: React.FC<Props> = ({ exchange }) => {
  const classes = useStyles();

  return (
    <Box height="200px" width="25%" padding={1}>
      <Card className={classes.card} elevation={0}>
        <CardHeader
          title={exchange.name}
          titleTypographyProps={{ variant: 'h6' }}
        />
      </Card>
    </Box>
  )
}

export default ExchangeCard
