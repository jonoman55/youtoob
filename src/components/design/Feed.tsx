import { useEffect, useState, useMemo, useCallback } from "react";
import { Box, Stack, Typography, Theme } from "@mui/material";

import { Spinner } from "./Spinner";
import { Sidebar } from "../layout";
import { Videos } from "../videos";
import { appActions } from "../../reducers/appSlice";
import { useSearchVideosQuery } from "../../apis/youtubeApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import type { Video } from "../../types";

export const Feed = () => {
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
        <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
            <Box sx={{
                height: { sx: "auto", md: "92vh" },
                px: { sx: 0, md: 2 },
                borderRight: (theme: Theme) => `1px solid ${theme.custom.palette.darkGray}`
            }}>
                <Sidebar selectedCategory={selectedCategory} />
                <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: 'common.white' }}>
                    Copyright © {new Date().getFullYear()} JC Dev
                </Typography>
            </Box>
            <Box sx={{ p: 2, overflowY: "auto", height: "90vh", flex: 2 }}>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: 'common.white' }}>
                    {selectedCategory}
                    <Box component="span" sx={{ color: (theme: Theme) => theme.custom.palette.red }}>
                        {' '}Videos
                    </Box>
                </Typography>
                <Videos videos={videosOnly} />
            </Box>
        </Stack>
    );
};
