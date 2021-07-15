import React from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, Box, Card, CardContent, CardHeader, Grid, Link, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useAppSelector } from '../../../../app/hooks';
import { selectCoinDetails } from '../../../../features/coinDetailsSlice';
import { GitHub, OpenInNewRounded } from '@material-ui/icons';
import StatsNumberSection from './StatsNumberSection';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { convertTimestamp, shortenNumber } from '../../../../common/helpers';

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
      color: theme.palette.primary.main
    }
  },
  avatarColor: {
    color: '#ffffff',
    backgroundColor: 'transparent',
    borderRadius: 8
  },
  dataContainer: {
    height: '100%',
    '& .recharts-surface': {
      cursor: 'pointer',
      '& .recharts-tooltip-cursor': {
        fill: theme.palette.card.paper,
        stroke: `${theme.palette.card.paper} !important`
      }
    }
  },
  customTooltip: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: `${theme.palette.background.default}dd`
  },
  gutterBottom: {
    marginBottom: 6
  }
}));

interface DataFormat {
  date: number;
  value: number;
}

const RepositoryCard: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const coinDetails = useAppSelector(selectCoinDetails);

  const repoUrl = coinDetails.value?.links.reposUrl.github[0] || '';
  const repoName = /.com\/(.+)/.exec(repoUrl) === null ? repoUrl : /.com\/(.+)/.exec(repoUrl)![1];

  const formatRawData = (data: number[]) => {
    const chartData: DataFormat[] = [];

    const now = + new Date();
    const dataReverse = data.slice().reverse(); // Order most recent first

    dataReverse.forEach((value: number, index: number) => {
      chartData.push({ date: now - (index + 1) * 86400000, value: value })
    });
    chartData.reverse();

    return chartData
  };

  return (
    <>
      {coinDetails.value && coinDetails.status !== 'LOADING' ? (
        <Card className={classes.statsCard}>
          <CardHeader
            title="Main Repository"
            subheader={
              <Box display="flex" alignItems="center">
                {coinDetails.value.links.reposUrl.github.length > 0 ? (
                  <>
                    <Typography variant="h6" className={classes.link}>
                      <Link
                        href={repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {repoName}
                      </Link>
                    </Typography>
                    <OpenInNewRounded fontSize="small" />
                  </>
                ) : <Typography variant="h6">-</Typography>}
              </Box>
            }
            titleTypographyProps={{ variant: 'body2', color: 'textSecondary' }}
            avatar={
              <Avatar variant="rounded" className={classes.avatarColor}>
                <GitHub />
              </Avatar>
            }
          />
          <Grid container spacing={0} className={classes.dataContainer}>
            <Grid item xs={3}>
              <Box height="100%" display="flex" flexDirection="column" justifyContent="space-evenly">
                <StatsNumberSection
                  title="Stars"
                  value={coinDetails.value.developerData.stars}
                />
                <StatsNumberSection
                  title="Forks"
                  value={coinDetails.value.developerData.forks}
                />
                <StatsNumberSection
                  title="Merged Pull Requests"
                  value={coinDetails.value.developerData.pullRequestsMerged}
                />
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box height="100%" display="flex" flexDirection="column" justifyContent="space-evenly">
                <StatsNumberSection
                  title="Watchers"
                  value={coinDetails.value.developerData.subscribers}
                />
                <StatsNumberSection
                  title="Contributors"
                  value={coinDetails.value.developerData.pullRequestContributors}
                />
                <StatsNumberSection
                  title="Closed Issues / Total Issues"
                  value={
                    `${coinDetails.value.developerData.closedIssues || '-'} / 
                    ${coinDetails.value.developerData.totalIssues || '-'}`
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box height="100%" display="flex" flexDirection="column">
                <Box paddingLeft={3} paddingRight={3}>
                  <Typography variant="body2" color="textSecondary" align="center">
                    Commit Activity (4 Weeks)
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="Total Count" />
                      <ListItemText
                        primary={coinDetails.value.developerData.commitCount4Weeks || '-'}
                        primaryTypographyProps={{ align: 'right' }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Additions" />
                      <ListItemText
                        primary={coinDetails.value.developerData.codeAdditionsDeletions4Weeks.additions ?
                          `+${coinDetails.value.developerData.codeAdditionsDeletions4Weeks.additions}` : '-'}
                        primaryTypographyProps={{ align: 'right' }}
                        style={{ color: theme.palette.success.main }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Deletions" />
                      <ListItemText
                        primary={coinDetails.value.developerData.codeAdditionsDeletions4Weeks.deletions || '-'}
                        primaryTypographyProps={{ align: 'right' }}
                        style={{ color: theme.palette.error.main }}
                      />
                    </ListItem>
                  </List>
                </Box>
                {coinDetails.value.developerData.last4WeeksCommitActivitySeries.length > 0 ? (
                  <Box flex="1">
                    <ResponsiveContainer height="100%" width="100%">
                      <BarChart
                        data={formatRawData(coinDetails.value.developerData.last4WeeksCommitActivitySeries)}
                        margin={{ top: 30, right: 40, left: 10, bottom: 30 }}
                      >
                        <Tooltip
                          cursor={{ stroke: theme.palette.text.secondary }}
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return <Box className={classes.customTooltip}>
                                <Typography variant="body1">
                                  {convertTimestamp(label, true)}
                                </Typography>
                                <Typography variant="body2" color="secondary">
                                  {`Commits: ${shortenNumber(payload[0].payload.value)}`}
                                </Typography>
                              </Box>
                            } else {
                              return null
                            }
                          }}
                        />
                        <XAxis dataKey="date" tickFormatter={tick => convertTimestamp(tick)} />
                        <YAxis />
                        <Bar dataKey="value" fill={theme.palette.secondary.main} animationDuration={2000} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                ) : (
                  <Box flex="1" display="flex" justifyContent="center" alignItems="center">
                    <Typography variant="body2" color="textSecondary">No commit data available</Typography>
                  </Box>
                )}
              </Box>

            </Grid>
          </Grid>
        </Card>
      ) : (
        <Card className={classes.statsCard}>
          <CardContent>
            <Skeleton height={32} width={250} className={classes.gutterBottom} />
            <Skeleton height={24} width="90%" />
            <Skeleton height={24} width="100%" />
            <Skeleton height={24} width="60%" />
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default RepositoryCard