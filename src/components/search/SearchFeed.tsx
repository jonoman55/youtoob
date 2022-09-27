import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Theme, Typography, Box } from "@mui/material";

import { Spinner } from "../design";
import { Videos } from "../videos";
import { useSearchVideosQuery } from "../../apis/youtubeApi";

import type { Video } from "../../types";

export const SearchFeed = () => {
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
            console.log('search feed results:', searchResults);
            setVideos(searchResults.items);
        }
    }, [searchResults, loading]);

    useEffect(
        () => handleSearchResults(),
        [searchTerm, handleSearchResults]
    );

    const videosOnly: Video[] = useMemo<Video[]>(
        () => videos?.filter((video: Video) => !video?.id?.kind?.includes('playlist'))!,
        [videos]
    );

    return loading ? <Spinner /> : (
        <Box p={2} minHeight="95vh">
            <Typography variant="h4" fontWeight={900} color="white" mb={3} ml={{ sm: "100px" }}>
                Search Results for{' '}
                <Box component="span" sx={{ color: (theme: Theme) => theme.custom.palette.red }}>
                    {searchTerm}
                </Box>
                {' '}videos
            </Typography>
            <Box display="flex">
                <Box sx={{ mr: { sm: '100px' } }} />
                <Videos videos={videosOnly} />
            </Box>
        </Box>
    );
};
