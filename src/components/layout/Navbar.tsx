import { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { styled, Box, Stack as MuiStack, StackProps as MuiStackProps } from '@mui/material';

import { SearchBar } from '../search';
import { appActions } from '../../reducers/appSlice';
import { useAppDispatch } from '../../app/hooks';
import { logo } from '../../images';

const Stack = styled(MuiStack)<MuiStackProps>(({ theme }) => ({
    padding: theme.spacing(2),
    position: 'sticky',
    backgroundColor: theme.palette.common.black,
    top: 0,
    justifyContent: 'space-between',
    alignItems: 'center'
}));

export const Navbar = () => {
    const dispatch = useAppDispatch();

    const handleLastVisited = useCallback<() => void>(
        () => { dispatch(appActions.setLastVisited(Date.now())) },
        [dispatch]
    );

    useEffect(
        () => handleLastVisited(),
        [handleLastVisited]
    );

    return (
        <Stack direction='row'>
            <Link to='/' style={{ display: 'flex', alignItems: 'center' }}>
                <Box
                    component='img'
                    src={logo}
                    alt='logo'
                    height={45}
                />
            </Link>
            <SearchBar />
        </Stack>
    );
};
