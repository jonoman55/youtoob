import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Theme, Typography, Box } from "@mui/material";

import { Videos } from "../videos";
import { fetchFromAPI } from "../../utils";

import type { Video } from "../../types";

export const SearchFeed = () => {
    const { searchTerm } = useParams();

    const [videos, setVideos] = useState<Video[] | null>(null);

    useEffect(() => {
        fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then(
            (data) => setVideos(data.items)
        );
    }, [searchTerm]);

    const videosOnly: Video[] = useMemo(() =>
        videos?.filter((video: Video) => !video?.id?.kind?.includes('playlist')) as Video[],
        [videos]
    );

    return (
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
