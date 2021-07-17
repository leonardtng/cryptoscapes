import React, { useEffect } from 'react';
// import { Theme, makeStyles } from '@material-ui/core/styles';
import { CardHeader, Divider } from '@material-ui/core';
import { getTodayDate } from '../../../../common/helpers';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import CardLayout from '../../../templates/CardLayout';
import { fetchStatusUpdateList, selectStatusUpdateList } from '../../../../features/statusUpdateListSlice';

// const useStyles = makeStyles((theme: Theme) => ({
//   chartWrapper: {
//     flex: 1,
//     width: '100%'
//   }
// }));

const StatusUpdateListCard: React.FC = () => {
  // const classes = useStyles();
  const dispatch = useAppDispatch();
  const statusUpdateList = useAppSelector(selectStatusUpdateList);

  useEffect(() => {
    if (statusUpdateList.value.length === 0 && statusUpdateList.status === 'IDLE') {
      dispatch(
        fetchStatusUpdateList({ statusUpdateQueryParams: statusUpdateList.statusUpdateQueryParams, append: false })
      );
    }
  }, [dispatch, statusUpdateList.value, statusUpdateList.status, statusUpdateList.statusUpdateQueryParams]);


  return (
    <CardLayout>
      <CardHeader
        title="Latest Cryptocurrency Updates"
        subheader={`Last Updated: ${getTodayDate()}`}
        titleTypographyProps={{ variant: 'h6' }}
        subheaderTypographyProps={{ variant: 'caption' }}
      />
      <Divider />

    </CardLayout>
  )
}

export default StatusUpdateListCard