import React, { Fragment, useEffect } from 'react';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';
import { CardHeader, Divider, List } from '@material-ui/core';
import { getTodayDate } from '../../../../common/helpers';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import CardLayout from '../../../templates/CardLayout';
import {
  fetchStatusUpdateList,
  selectStatusUpdateList,
  setStatusUpdateQueryParams
} from '../../../../features/statusUpdateListSlice';
import FilterStatusUpdateList from '../atoms/FilterStatusUpdateList';
import ListItemSkeleton from '../../../skeletons/ListItemSkeleton';
import { StatusUpdate } from '../../../../models';
import StatusUpdateItem from '../molecules/StatusUpdateItem';
import { useInfiniteScrollingObserver } from '../../../../common/hooks/useInfiniteScrollingObserver';
import { useScrollToTop } from '../../../../common/hooks/useScrollToTop';

const useStyles = makeStyles((theme: Theme) => ({
  statusUpdateList: {
    flex: 1,
    overflow: 'scroll',
    paddingBottom: 8
  }
}));

const StatusUpdateListCard: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const statusUpdateList = useAppSelector(selectStatusUpdateList);

  useEffect(() => {
    if (statusUpdateList.value.length === 0 && statusUpdateList.status === 'IDLE') {
      dispatch(
        fetchStatusUpdateList({ statusUpdateQueryParams: statusUpdateList.statusUpdateQueryParams, append: false })
      );
    }
  }, [dispatch, statusUpdateList.value, statusUpdateList.status, statusUpdateList.statusUpdateQueryParams]);

  const [lastRef] = useInfiniteScrollingObserver(
    statusUpdateList.status,
    setStatusUpdateQueryParams({
      ...statusUpdateList.statusUpdateQueryParams,
      page: statusUpdateList.statusUpdateQueryParams.page + 1
    }),
    fetchStatusUpdateList({
      statusUpdateQueryParams: {
        ...statusUpdateList.statusUpdateQueryParams,
        page: statusUpdateList.statusUpdateQueryParams.page + 1
      },
      append: true
    }),
    statusUpdateList.hasMore
  );

  const { FloatingButton, target, top } = useScrollToTop();

  return (
    <CardLayout>
      <CardHeader
        title="Latest Cryptocurrency Updates"
        subheader={`Last Updated: ${getTodayDate()}`}
        titleTypographyProps={{ variant: 'h6' }}
        subheaderTypographyProps={{ variant: 'caption' }}
        action={<FilterStatusUpdateList />}
      />
      <Divider />
      <List dense disablePadding className={classes.statusUpdateList} ref={target}>
        {statusUpdateList.value.length === 0 || statusUpdateList.status === 'LOADING' ? (
          <ListItemSkeleton
            count={statusUpdateList.statusUpdateQueryParams.perPage}
            height={60}
            iconDimensions={theme.spacing(3)}
          />
        ) : (
          <>
            {statusUpdateList.value.map((statusUpdate: StatusUpdate, index: number) => {
              return <Fragment key={index}>
                <StatusUpdateItem statusUpdate={statusUpdate} />
                <Divider ref={index === 0 ? top : statusUpdateList.value.length === index + 1 ? lastRef : null} />
              </Fragment>
            })}
            {statusUpdateList.hasMore && statusUpdateList.value.length !== 0 &&
              <ListItemSkeleton
                count={1}
                height={60}
                iconDimensions={theme.spacing(3)}
              />
            }
          </>
        )}
      </List>
      <FloatingButton size="medium" color="secondary" />
    </CardLayout >
  )
}

export default StatusUpdateListCard