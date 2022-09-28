import { useEffect, useState, useMemo, useCallback } from 'react';
import { Box, Stack, Theme, useTheme } from '@mui/material';

import { Spinner } from './Spinner';
import { Copyright } from './Copyright';
import { Sidebar } from '../layout';
import { Videos } from '../videos';
import { CategoryName, CategorySection, SelectedCategory, sidebarStyles } from '../styled/Feed.styled';
import { appActions } from '../../reducers/appSlice';
import { useSearchVideosQuery } from '../../apis/youtubeApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import type { Video } from '../../types';

export const Feed = () => {
    const theme: Theme = useTheme();
    const dispatch = useAppDispatch();

    const [videos, setVideos] = useState<Video[] | null>(null);

    const lastVisited: number = useAppSelector((state) => state.app.lastVisited);

    const handleLastVisited = useCallback<() => void>(() => {
        if (lastVisited < Date.now()) {
            dispatch(appActions.setSelectedCategory('New'));
        }
    }, [dispatch, lastVisited]);

    useEffect(
        () => handleLastVisited(),
        [handleLastVisited]
    );

    const selectedCategory: string = useAppSelector((state) => state.app.selectedCategory);

    const { data: searchResults, isLoading, isFetching } = useSearchVideosQuery(selectedCategory, {
        refetchOnReconnect: true
    });

    const loading: boolean = useMemo<boolean>(
        () => isLoading || isFetching,
        [isLoading, isFetching]
    );

    const handleSearchResults = useCallback<() => void>(() => {
        if (!loading && searchResults) {
            setVideos(null);
            // console.log('home feed results', searchResults);
            setVideos(searchResults.items);
        }
    }, [searchResults, loading]);

    useEffect(
        () => handleSearchResults(),
        [selectedCategory, handleSearchResults]
    );

    const videosOnly: Video[] = useMemo<Video[]>(
        () => videos?.filter((video: Video) => video?.id?.kind?.includes('video'))!,
        [videos]
    );

    return loading ? <Spinner /> : (
        <Stack sx={{ flexDirection: { sx: 'column', md: 'row' } }}>
            <Box sx={sidebarStyles(theme)}>
                <Sidebar selectedCategory={selectedCategory} />
                <Copyright />
            </Box>
            <CategorySection>
                <SelectedCategory variant='h4'>
                    {selectedCategory}
                    <CategoryName component='span'>
                        {' '}Videos
                    </CategoryName>
                </SelectedCategory>
                <Videos videos={videosOnly} />
            </CategorySection>
        </Stack>
    );
};
