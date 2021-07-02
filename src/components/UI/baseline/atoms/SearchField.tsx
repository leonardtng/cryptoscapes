import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Box, InputAdornment, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useHistory } from 'react-router';
import { useAppSelector } from '../../../../app/hooks';
import { selectSupportedCoins } from '../../../../features/supportedCoinsSlice';
import { SupportedCoin } from '../../../../models';
import { SearchRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => ({
  searchField: {
    paddingLeft: 32,
    '& .MuiTextField-root': {
      height: 50,
      margin: '8px 0',
      '& .MuiOutlinedInput-root': {
        height: '100%',
        borderRadius: 12,
        padding: '6px 16px'
      }
    }
  }
}));

const SearchField: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const supportedCoins = useAppSelector(selectSupportedCoins);

  const handleOnChange = (event: React.ChangeEvent<{}>, supportedCoin: any) => {
    if (supportedCoin) history.push(`/coins/${supportedCoin.id}`);
  }

  return (
    <Box width="400px">
      <Autocomplete
        freeSolo
        className={classes.searchField}
        options={supportedCoins.value}
        getOptionLabel={(supportedCoin: SupportedCoin) => supportedCoin.name}
        onChange={handleOnChange}
        filterOptions={(supportedCoins: SupportedCoin[], state) => supportedCoins.filter(
          (supportedCoin: SupportedCoin) =>
            supportedCoin.symbol === state.inputValue.toLowerCase() ||
            supportedCoin.name.toLowerCase() === state.inputValue.toLowerCase() ||
            supportedCoin.id.toLowerCase() === state.inputValue.toLowerCase()
          // (supportedCoin: SupportedCoin) => supportedCoin.symbol.includes(state.inputValue) || 
          // supportedCoin.name.includes(state.inputValue)
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
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchRounded />
                </InputAdornment>
              )
            }}
          />
        )}
      />
    </Box>

  )
}

export default SearchField;
