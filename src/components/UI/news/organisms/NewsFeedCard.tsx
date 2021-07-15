import React from 'react';
// import { Theme, makeStyles } from '@material-ui/core/styles';
import { CardHeader, Divider } from '@material-ui/core';
import { getTodayDate } from '../../../../common/helpers';
// import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import CardLayout from '../../../templates/CardLayout';

// const useStyles = makeStyles((theme: Theme) => ({
//   chartWrapper: {
//     flex: 1,
//     width: '100%'
//   }
// }));

const NewsFeedCard: React.FC = () => {
  // const classes = useStyles();
  // const dispatch = useAppDispatch();

  return (
    <CardLayout>
      <CardHeader
        title="Latest Crpytocurrency News"
        subheader={`Last Updated: ${getTodayDate()}`}
        titleTypographyProps={{ variant: 'h6' }}
        subheaderTypographyProps={{ variant: 'caption' }}
      />
      <Divider />

    </CardLayout>
  )
}

export default NewsFeedCard