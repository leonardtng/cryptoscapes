import React, { useEffect, useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { fetchSupportedCoins, selectSupportedCoins } from '../../../../features/supportedCoinsSlice';
import { Coin, SupportedCoin } from '../../../../models';
import { SearchRounded, TuneRounded } from '@material-ui/icons';
import { selectCoins } from '../../../../features/coinsSlice';
import SearchOptionsDialog from '../atoms/SearchOptionsDialog';

const useStyles = makeStyles((theme: Theme) => ({
  searchField: {
    paddingLeft: 32,
    '& .MuiTextField-root': {
      height: 46,
      margin: '8px 0',
      '& .MuiOutlinedInput-root': {
        height: '100%',
        borderRadius: 12,
        padding: '6px 16px',
        '& .MuiOutlinedInput-notchedOutline': {
          borderWidth: 2
        }
      }
    }
  },
  searchOptionsIcon: {
    height: 38,
    width: 38,
    marginLeft: theme.spacing(3),
    borderRadius: 8,
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.primary.main
    }
  }
}));

const SearchField: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();

  const coins = useAppSelector(selectCoins);
  const supportedCoins = useAppSelector(selectSupportedCoins);

  const [value, setValue] = useState<Coin | SupportedCoin | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [onlySearchTop, setOnlySearchTop] = useState<boolean>(true);

  const handleOnChange = (event: React.ChangeEvent<{}>, coinItem: any) => {
    if (coinItem) history.push(coinItem.id && `/coins/${coinItem.id}`);
    setValue(null); // This makes it possible to reselect the same value again if the input field is not cleared
  };

  useEffect(() => {
    if (supportedCoins.value.length === 0 && supportedCoins.status === 'IDLE' && !onlySearchTop) {
      dispatch(fetchSupportedCoins());
    }
  }, [dispatch, onlySearchTop, supportedCoins.status, supportedCoins.value.length]);

  return (
    <Box display="flex" alignItems="center">
      <Box width="400px">
        <Autocomplete
          freeSolo
          clearOnBlur
          clearOnEscape
          value={value}
          className={classes.searchField}
          options={onlySearchTop ? coins.value : supportedCoins.value}
          getOptionLabel={(coinItem: SupportedCoin | Coin) => coinItem.name || ''}
          onChange={handleOnChange}
          filterOptions={(coinList: SupportedCoin[] | Coin[], state) => coinList.filter(
            (coinItem: SupportedCoin | Coin) =>
              coinItem.symbol.includes(state.inputValue.toLowerCase()) ||
              coinItem.name.toLowerCase().includes(state.inputValue.toLowerCase()) ||
              coinItem.id.includes(state.inputValue.toLowerCase())
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              placeholder="Search Coin"
              margin="normal"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                startAdornment:
                  <InputAdornment position="start">
                    <SearchRounded />
                  </InputAdornment>
              }}
            />
          )}
        />
      </Box>
      <IconButton className={classes.searchOptionsIcon} color="primary" onClick={() => setOpen(true)}>
        <TuneRounded />
      </IconButton>
      <SearchOptionsDialog
        open={open}
        toggleClose={() => setOpen(false)}
        checked={onlySearchTop}
        toggleChange={() => setOnlySearchTop(!onlySearchTop)}
      />
    </Box>
  )
}

export default SearchField;
