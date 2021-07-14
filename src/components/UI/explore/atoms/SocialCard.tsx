import React, { Fragment } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Card, CardContent, CardHeader, Link, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useAppSelector } from '../../../../app/hooks';
import { selectCoinDetails } from '../../../../features/coinDetailsSlice';
import { OpenInNewRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  statsCard: {
    height: '100%',
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column'
  },
  link: {
    marginRight: 6,
    '& a': {
      color: theme.palette.text.primary
    }
  },
  avatarColor: {
    backgroundColor: 'transparent',
    borderRadius: 8
  },
  gutterBottom: {
    marginBottom: 6
  }
}));

interface Props {
  rows?: number;
  title: string;
  icon: JSX.Element;
  iconColor: string;
  link: string | null;
}

const SocialCard: React.FC<Props> = ({ rows = 1, title, icon, iconColor, link, children }) => {
  const classes = useStyles();

  const coinDetails = useAppSelector(selectCoinDetails);

  return (
    <>
      {coinDetails.value && coinDetails.status !== 'LOADING' ? (
        <Card className={classes.statsCard}>
          <CardHeader
            disableTypography
            title={
              <Box display="flex" alignItems="center">
                {link ? (
                  <>
                    <Typography variant="h6" className={classes.link}>
                      <Link
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {title}
                      </Link>
                    </Typography>
                    <OpenInNewRounded fontSize="small" />
                  </>
                ) : <Typography variant="h6">{title}</Typography>}
              </Box>
            }
            avatar={
              <Avatar variant="rounded" className={classes.avatarColor} style={{ color: iconColor }}>
                {icon}
              </Avatar>
            }
          />
          {children}
        </Card>
      ) : (
        <Card className={classes.statsCard}>
          <CardContent>
            <Skeleton height={32} width={250} className={classes.gutterBottom} />
            {Array.from(Array(rows).keys()).map((index: number) =>
              <Fragment key={index}>
                <Skeleton height={24} width="90%" />
                <Skeleton height={24} width="100%" />
                <Skeleton height={24} width="60%" className={classes.gutterBottom} />
              </Fragment>
            )}
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default SocialCard
