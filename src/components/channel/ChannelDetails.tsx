import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { ChannelCard } from "./";
import { Videos } from "../videos";
import { fetchFromAPI } from "../../utils";

import type { Video } from "../../types";

const initialSate: Video = {
    id: {
        channelId: '',
    },
    statistics: {
        subscriberCount: '',
    },
    snippet: {
        title: '',
        thumbnails: {
            high: {
                url: '',
            },
        },
    },
};

export const ChannelDetails = () => {
    const { id } = useParams();

    const [channelDetails, setChannelDetails] = useState<Video>(initialSate);
    const [videos, setVideos] = useState<Video[] | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
            const data = await fetchFromAPI(`channels?part=snippet&id=${id}`);
            setChannelDetails(data?.items[0]);
            const videosData = await fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`);
            setVideos(videosData?.items);
        };
        fetchResults();
    }, [id]);

    const videosOnly: Video[] = useMemo(() =>
        videos?.filter((video: Video) => !video?.id?.kind?.includes('playlist')) as Video[],
        [videos]
    );

    return (
        <Box minHeight="95vh">
            <Box>
                <Box component="div" sx={{
                    height: '300px',
                    background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)',
                    zIndex: 10,
                }} />
                <ChannelCard channelDetails={channelDetails} marginTop="-93px" />
            </Box>
            <Box p={2} display="flex">
                <Box sx={{ mr: { sm: '100px' } }} />
                <Videos videos={videosOnly} />
            </Box>
        </Box>
    );
};
