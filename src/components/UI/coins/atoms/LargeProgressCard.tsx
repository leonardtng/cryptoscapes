import React from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import { roundDecimals } from '../../../../common/helpers';
import { useAppSelector } from '../../../../app/hooks';
import { selectCoinDetails } from '../../../../features/coinDetailsSlice';

const useStyles = makeStyles((theme: Theme) => ({
  progressCircle: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

interface Props {
  title: string;
  value: number;
}

const LargeProgressCard: React.FC<Props> = ({ title, value }) => {
  const classes = useStyles();
  const theme = useTheme();

  const coinDetails = useAppSelector(selectCoinDetails);
  const correctedValue = value > 100 ? 100 : value;

  const getColor = () => {
    if (value < 30) return theme.palette.error.main
    if (value < 65) return theme.palette.warning.main
    return theme.palette.success.main
  }

  return (
    <Box height="100%" display="flex" flexDirection="column" padding={2}>
      <Typography variant="h5" align="center">{title}</Typography>
      <Box
        position="relative"
        display="inline-flex"
        flex="1"
        alignItems="center"
        justifyContent="center"
        marginTop="12px"
      >
        <CircularProgress
          className={classes.progressCircle}
          variant="determinate"
          value={coinDetails.status === 'LOADING' ? 0 : correctedValue}
          size={200}
          thickness={5}
          style={{ color: getColor() }}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h5" component="div" color="textSecondary">
            {coinDetails.status === 'LOADING' || correctedValue === 0 ? '-' : `${roundDecimals(correctedValue)}%`}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default LargeProgressCard
