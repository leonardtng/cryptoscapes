import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, Chip, IconButton, Menu, MenuItem } from '@material-ui/core';
import { FilterListRounded } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { StatusUpdateCategory, StatusUpdateCategoryMenuItem, StatusUpdateQueryParams } from '../../../../models';
import {
  fetchStatusUpdateList,
  selectStatusUpdateList,
  setStatusUpdateQueryParams
} from '../../../../features/statusUpdateListSlice';

const useStyles = makeStyles((theme: Theme) => ({
  customiseButton: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(1)
  },
  menuPaper: {
    maxHeight: 350,
  }
}));

const statusUpdateCategoryMenu: StatusUpdateCategoryMenuItem[] = [
  {
    categoryId: 'general',
    label: 'General (Default)'
  },
  {
    categoryId: 'milestone',
    label: 'Milestones'
  },
  {
    categoryId: 'partnership',
    label: 'Partnerships'
  },
  {
    categoryId: 'exchangeListing',
    label: 'Exchange Listings'
  },
  {
    categoryId: 'softwareRelease',
    label: 'Software Releases'
  },
  {
    categoryId: 'fundMovement',
    label: 'Fund Movements'
  },
  {
    categoryId: 'newListings',
    label: 'New Listings'
  },
  {
    categoryId: 'event',
    label: 'Events'
  }
];

const FilterStatusUpdateList: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const statusUpdateList = useAppSelector(selectStatusUpdateList);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleFilter = (categoryId: StatusUpdateCategory) => {
    const queryParams: StatusUpdateQueryParams = {
      ...statusUpdateList.statusUpdateQueryParams,
      page: 1,
      category: categoryId
    };

    dispatch(fetchStatusUpdateList({ statusUpdateQueryParams: queryParams, append: false }));
    dispatch(setStatusUpdateQueryParams(queryParams));
    setAnchorEl(null);
  };

  return (
    <>
      <Box display="flex" alignItems="center" marginTop="8px" marginRight="8px">
        {statusUpdateList.statusUpdateQueryParams.category !== 'general' &&
          <Chip
            label={
              statusUpdateCategoryMenu.find(
                (statusUpdateCategoryMenuItem: StatusUpdateCategoryMenuItem) =>
                  statusUpdateCategoryMenuItem.categoryId === statusUpdateList.statusUpdateQueryParams.category)?.label
            }
            clickable
            color="secondary"
            onDelete={() => handleFilter('general')}
          />
        }
        <IconButton
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}
          disabled={statusUpdateList.status === 'LOADING'}
        >
          <FilterListRounded />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          className={classes.menuPaper}
        >
          {statusUpdateCategoryMenu.map((statusUpdateCategoryMenuItem: StatusUpdateCategoryMenuItem, index: number) => {
            return <MenuItem
              key={index}
              onClick={() => handleFilter(statusUpdateCategoryMenuItem.categoryId)}
            >
              {statusUpdateCategoryMenuItem.label}
            </MenuItem>
          })}
        </Menu>
      </Box>
    </>
  )
}

export default FilterStatusUpdateList