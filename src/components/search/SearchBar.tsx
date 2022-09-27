import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Paper, IconButton, Theme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = () => {
    const navigate = useNavigate();
    
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleOnSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchTerm) {
            navigate(`/search/${searchTerm}`);
            setSearchTerm('');
        }
    };

    return (
        <Paper
            component="form"
            onSubmit={handleOnSubmit}
            sx={(theme: Theme) => ({
                backgroundColor: theme.custom.palette.ytBlack,
                backgroundImage: 'none',
                borderRadius: 20,
                border: `1px solid ${theme.custom.palette.lightGray}`,
                pl: 2,
                boxShadow: 'none',
                mr: { sm: 5 },
            })}
        >
            <Box
                component="input"
                className='search-bar'
                placeholder='Search...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IconButton type='submit' aria-label='search' sx={(theme: Theme) =>
                ({ p: '10px', color: theme.custom.palette.red })}
            >
                <SearchIcon />
            </IconButton>
        </Paper>
    );
};
