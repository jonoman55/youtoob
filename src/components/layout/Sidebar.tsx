import { useCallback } from 'react';
import { Stack, Box, Theme } from '@mui/material';

import { appActions } from '../../reducers/appSlice';
import { useAppDispatch } from '../../app/hooks';
import { categories } from '../../constants';
import type { Category } from '../../types';

interface SidebarProps  {
    selectedCategory: string;
};

export const Sidebar = ({ selectedCategory }: SidebarProps) => {
    const dispatch = useAppDispatch();

    const handleCategoryChange = useCallback<(category: string) => () => void>(
        (category: string) => () => {
            dispatch(appActions.setSelectedCategory(category));
        },
        [dispatch]
    );

    return (
        <Stack
            direction='row'
            sx={{
                overflowY: 'auto',
                height: { sx: 'auto', md: '95%' },
                flexDirection: { md: 'column' },
            }}
        >
            {categories.map((category: Category, index: number) => (
                <Box
                    component='button'
                    className='category-btn'
                    onClick={handleCategoryChange(category.name)}
                    sx={(theme: Theme) => ({
                        background: category.name === selectedCategory
                            ? theme.custom.palette.red
                            : 'none',
                        color: theme.palette.common.white,
                    })}
                    key={index}
                >
                    <Box
                        component='span'
                        sx={(theme: Theme) => ({
                            color: category.name === selectedCategory
                                ? theme.palette.common.white
                                : theme.custom.palette.red,
                            marginRight: '15px'
                        })}
                    >
                        {category.icon}
                    </Box>
                    <Box component='span' sx={{ opacity: category.name === selectedCategory ? '1' : '0.8' }}>
                        {category.name}
                    </Box>
                </Box>
            ))}
        </Stack>
    );
};