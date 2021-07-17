import React, { useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, Button, Chip, IconButton, Menu, MenuItem } from '@material-ui/core';
import { FilterListRounded, TableChartRounded } from '@material-ui/icons';
import CustomiseTableDialog from '../atoms/CustomiseTableDialog';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectCoinCategories } from '../../../../features/coinCategoriesSlice';
import { CoinCategory, CoinQueryParams } from '../../../../models';
import { fetchCoinList, selectCoinList, setCoinQueryParams } from '../../../../features/coinListSlice';

const useStyles = makeStyles((theme: Theme) => ({
  customiseButton: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(1)
  },
  menuPaper: {
    maxHeight: 350,
  }
}));

const CustomiseTable: React.FC = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const coinList = useAppSelector(selectCoinList);
  const coinCategories = useAppSelector(selectCoinCategories);

  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleFilter = (categoryId: string) => {
    const queryParams: CoinQueryParams = {
      ...coinList.coinQueryParams,
      page: 1,
      category: categoryId
    };

    dispatch(fetchCoinList({ coinQueryParams: queryParams, append: false }));
    dispatch(setCoinQueryParams(queryParams));
    setAnchorEl(null);
  };

  return (
    <>
      <Box display="flex" alignItems="center" marginTop="8px" marginRight="8px">
        {coinList.coinQueryParams.category &&
          <Chip
            label={
              coinCategories.value.find(
                (coinCategory: CoinCategory) =>
                  coinCategory.categoryId === coinList.coinQueryParams.category)?.name
            }
            clickable
            color="secondary"
            onDelete={() => handleFilter('')}

          />
        }
        <Button
          variant="outlined"
          size="small"
          color="primary"
          className={classes.customiseButton}
          startIcon={<TableChartRounded />}
          onClick={() => setOpen(true)}
        >
          Customise
        </Button>
        <IconButton
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}
          disabled={coinCategories.status === 'LOADING'}
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
          <MenuItem onClick={() => handleFilter('')}>All</MenuItem>
          {coinCategories.value.map((coinCategory: CoinCategory, index: number) => {
            return <MenuItem
              key={index}
              onClick={() => handleFilter(coinCategory.categoryId)}
            >
              {coinCategory.name}
            </MenuItem>
          })}
        </Menu>
      </Box>
      <CustomiseTableDialog open={open} toggleClose={() => setOpen(false)} />
    </>
  )
}

export default CustomiseTable
