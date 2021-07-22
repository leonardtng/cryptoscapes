import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import { useAppSelector } from '../../../../app/hooks';
import { selectCoinDetails } from '../../../../features/coinDetailsSlice';
import LargeProgressCard from '../atoms/LargeProgressCard';
import SocialCard from '../atoms/SocialCard';
import StatsNumberSection from '../atoms/StatsNumberSection';
import { Facebook, Reddit, Twitter } from '@material-ui/icons';
import { formatNumber } from '../../../../common/helpers';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    height: '100%',
    minHeight: 400,
    '& > .MuiGrid-item': {
      height: '100%'
    }
  },
  innerWrapper: {
    height: '100%',
    '& > .MuiGrid-item:not(:last-child)': {
      marginBottom: theme.spacing(3)
    }
  }
}));

const CoinSocialStats: React.FC = () => {
  const classes = useStyles();

  const coinDetails = useAppSelector(selectCoinDetails);

  return (
    <Grid container spacing={3} className={classes.container}>
      <Grid item xs={4}>
        <LargeProgressCard title="Community Score" value={coinDetails.value?.communityScore || 0} />
      </Grid>
      <Grid item xs={4}>
        <SocialCard
          rows={2}
          title="Reddit"
          icon={<Reddit />}
          iconColor="#FF4500"
          link={coinDetails.value?.links.subredditUrl || null}
        >
          <Box flex="1">
            <Box height="50%" display="flex" justifyContent="space-evenly" alignItems="center">
              <StatsNumberSection
                title="Total Subscribers"
                value={coinDetails.value?.communityData.redditSubscribers}
              />
              <StatsNumberSection
                title="Average Posts"
                value={coinDetails.value?.communityData.redditAveragePosts48H}
              />
            </Box>
            <Box height="50%" display="flex" justifyContent="space-evenly" alignItems="center">
              <StatsNumberSection
                title="Active Accounts"
                value={coinDetails.value?.communityData.redditAccountsActive48H}
              />
              <StatsNumberSection
                title="Average Comments"
                value={coinDetails.value?.communityData.redditAverageComments48H}
              />
            </Box>
          </Box>
        </SocialCard>
      </Grid>
      <Grid item xs={4}>
        <Grid container className={classes.innerWrapper} spacing={0}>
          <Grid item xs={12}>
            <SocialCard
              title="Facebook"
              icon={<Facebook />}
              iconColor="#3b5998"
              link={coinDetails.value?.links.facebookUsername ?
                `https://www.facebook.com/${coinDetails.value.links.facebookUsername}` : null}
            >
              <Box flex="1" display="flex" alignItems="center" justifyContent="center" textAlign="center">
                <Box>
                  <Typography variant="h4">
                    {coinDetails.value?.communityData.facebookLikes ?
                      formatNumber(coinDetails.value.communityData.facebookLikes) : '-'}
                  </Typography>
                  <Typography variant="h6" color="textSecondary">Likes</Typography>
                </Box>
              </Box>
            </SocialCard>
          </Grid>
          <Grid item xs={12}>
            <SocialCard
              title="Twitter"
              icon={<Twitter />}
              iconColor="#00acee"
              link={coinDetails.value?.links.twitterScreenName ?
                `https://twitter.com/${coinDetails.value.links.twitterScreenName}` : null}
            >
              <Box flex="1" display="flex" alignItems="center" justifyContent="center" textAlign="center">
                <Box>
                  <Typography variant="h4">
                    {coinDetails.value?.communityData.twitterFollowers ?
                      formatNumber(coinDetails.value.communityData.twitterFollowers) : '-'}
                  </Typography>
                  <Typography variant="h6" color="textSecondary">Followers</Typography>
                </Box>
              </Box>
            </SocialCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CoinSocialStats
