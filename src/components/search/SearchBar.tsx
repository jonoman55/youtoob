import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Theme, useTheme } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import { IconButton, searchStyles } from '../styled/Search.styled';

export const SearchBar = () => {
    const theme: Theme = useTheme();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleOnSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchTerm) {
            navigate(`/search/${searchTerm}`);
            setSearchTerm('');
        }
    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <Paper
            component='form'
            onSubmit={handleOnSubmit}
            sx={searchStyles(theme)}
        >
            <Box
                component='input'
                className='search-bar'
                placeholder='Search...'
                value={searchTerm}
                onChange={handleOnChange}
            />
            <IconButton type='submit' aria-label='search'>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};
