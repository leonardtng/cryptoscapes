import React, { useEffect, useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, Typography, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  textEllipsis: {
    width: 218,
    marginLeft: 20,
    '&:after': {
      overflow: 'hidden',
      display: 'inline-block',
      verticalAlign: 'bottom',
      animation: '$ellipsis-animation steps(4,end) 900ms infinite',
      content: '"..."',
      width: 0
    }
  },
  '@keyframes ellipsis-animation': {
    'to': {
      width: '1.25em'
    }
  }
}));

const HeatmapLoadingProgress: React.FC = () => {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress => prevProgress < 100 ? prevProgress + 1 : prevProgress);
    }, 225); // Based on Axios request throttle speed
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <Box position="relative" display="inline-flex" marginBottom={1}>
        <CircularProgress variant="determinate" value={progress} />
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
          <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
            progress,
          )}%`}</Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="h6" color="textSecondary" className={classes.textEllipsis}>
          {progress === 100 ? 'Chart Almost Ready' : progress <= 60 ? 'Calculating Values' : 'Generating Heatmap'}
        </Typography>
      </Box>
    </>
  )
}

export default HeatmapLoadingProgress
