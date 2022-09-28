import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Theme, Typography, Box, useTheme } from '@mui/material';

import { Spinner } from '../design';
import { Videos } from '../videos';
import { SearchTerm, searchResultStyles, SearchResults } from '../styled/Search.styled';
import { useSearchVideosQuery } from '../../apis/youtubeApi';

import type { Video } from '../../types';

export const SearchFeed = () => {
    const theme: Theme = useTheme();
    const { searchTerm } = useParams();

    const [videos, setVideos] = useState<Video[] | null>(null);

    const { data: searchResults, isLoading, isFetching } = useSearchVideosQuery(searchTerm, {
        refetchOnReconnect: true
    });

    const loading: boolean = useMemo<boolean>(
        () => isLoading || isFetching,
        [isLoading, isFetching]
    );

    const handleSearchResults = useCallback<() => void>(() => {
        if (!loading && searchResults) {
            setVideos(null);
            // console.log('search feed results:', searchResults);
            setVideos(searchResults.items);
        }
    }, [searchResults, loading]);

    useEffect(
        () => handleSearchResults(),
        [searchTerm, handleSearchResults]
    );

    const videosOnly: Video[] = useMemo<Video[]>(
        () => videos?.filter((video: Video) => video?.id?.kind?.includes('video'))!,
        [videos]
    );

    return loading ? <Spinner /> : (
        <SearchResults>
            <Typography variant='h4' sx={searchResultStyles(theme)}>
                Search Results for{' '}
                <SearchTerm component='span'>
                    {searchTerm}
                </SearchTerm>
                {' '}videos
            </Typography>
            <Box display='flex'>
                <Box sx={{ mr: { sm: '100px' } }} />
                <Videos videos={videosOnly} />
            </Box>
        </SearchResults>
    );
};
