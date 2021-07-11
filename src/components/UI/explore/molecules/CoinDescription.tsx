import React, { useEffect, useRef, useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useAppSelector } from '../../../../app/hooks';
import { selectCoinDetails } from '../../../../features/coinDetailsSlice';
import { ExpandMoreRounded } from '@material-ui/icons';

const SECTION_HEIGHT = 150;

const useStyles = makeStyles((theme: Theme) => ({
  descriptionContainerLess: {
    position: 'relative',
    maxHeight: SECTION_HEIGHT,
    overflow: 'hidden',
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '100%',
      height: 100,
      background: `linear-gradient(180deg,rgba(255,255,255,0),${theme.palette.card.default})`
    }
  },
  descriptionContainer: {
    '& .MuiTypography-root': {
      color: `${theme.palette.text.primary}BB`
    },
    '& a': {
      textDecoration: 'none',
      color: theme.palette.secondary.main
    },
  },
  toggleReadMoreButton: {
    display: 'flex',
    marginTop: 8,
    cursor: 'pointer',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 4,
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  gutterBottom: {
    marginBottom: 6
  }
}));

const CoinDescription: React.FC = () => {
  const classes = useStyles();

  const coinDetails = useAppSelector(selectCoinDetails);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const [readMore, setReadMore] = useState<boolean>(false);
  const [heightThreshold, setHeightThreshold] = useState<boolean>(false);

  useEffect(() => {
    if (coinDetails.status === 'LOADING') {
      setReadMore(false);
      setHeightThreshold(false);
    } else {
      setHeightThreshold((descriptionRef.current?.offsetHeight || 0) >= SECTION_HEIGHT);
    };
  }, [coinDetails.status]);

  return (
    <>
      {coinDetails.value && coinDetails.status !== 'LOADING' ? (
        <>
          {coinDetails.value.description.en.length > 0 &&
            <Box marginBottom={5} paddingLeft={2} paddingRight={2}>
              <Typography variant="h6" gutterBottom>What is {coinDetails.value.name}?</Typography>
              <div
                ref={descriptionRef}
                className={
                  `${classes.descriptionContainer}
                       ${!readMore && heightThreshold ? classes.descriptionContainerLess : ''}`
                }
              >
                <Typography
                  paragraph
                  variant="body1"
                  dangerouslySetInnerHTML={{
                    __html: coinDetails.value.description.en.replaceAll(
                      '<a', '<a target="_blank" rel="noopener noreferrer"')
                  }}
                />
              </div>
              {heightThreshold &&
                <Typography
                  color="secondary"
                  onClick={() => setReadMore(!readMore)}
                  className={classes.toggleReadMoreButton}
                >
                  {readMore ? 'Read Less' : 'Read More'}
                  <ExpandMoreRounded className={`${classes.expand} ${readMore ? classes.expandOpen : ''}`} />
                </Typography>
              }
            </Box>
          }
        </>
      ) : (
        <Box height="191px">
          <Skeleton height={32} width={250} className={classes.gutterBottom} />
          <Skeleton height={24} width="90%" />
          <Skeleton height={24} width="100%" />
          <Skeleton height={24} width="60%" />
        </Box>
      )}
    </>
  )
}

export default CoinDescription
