import React from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) => ({
  skeletonContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.card.default,
    border: `1px solid ${theme.palette.background.default}`,
    borderRadius: 12,
  },
  skeletonContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '32px !important'
  }
}));

const CardSkeleton: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.skeletonContainer}>
      <CardHeader
        disableTypography
        title={<Skeleton height={32} width="60%" />}
        subheader={<Skeleton height={21} width="40%" />}
        avatar={<Skeleton variant="circle" height={theme.spacing(4)} width={theme.spacing(4)} />}
      />
      <CardContent className={classes.skeletonContent}>
        <Skeleton height={32} width="20%" />
        <Skeleton height={20} width="40%" />
      </CardContent>
    </Card>
  )
}

export default CardSkeleton
