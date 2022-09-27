import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { ChannelCard } from "./ChannelCard";
import { Spinner } from "../design";
import { Videos } from "../videos";
import { useChannelDetailsQuery, useChannelVideosQuery } from "../../apis/youtubeApi";

import type { Video } from "../../types";

const initialState: Video = {
    brandingSettings: {
        image: {
            bannerExternalUrl: '',
        }
    },
    id: {
        channelId: '',
    },
    statistics: {
        subscriberCount: '',
    },
    snippet: {
        title: '',
        thumbnails: {
            default: {
                url: '',
            },
            high: {
                url: '',
            },
            medium: {
                url: '',
            },
        },
    },
};

// TODO : Add banner image
export const ChannelDetails = () => {
    const { id } = useParams();

    const [channelDetails, setChannelDetails] = useState<Video>(initialState);
    const [videos, setVideos] = useState<Video[] | null>(null);

    const {
        data: channelDetailResults,
        isLoading: channelDetailIsLoading,
        isFetching: channelDetailsIsFetching
    } = useChannelDetailsQuery(id as string, {
        refetchOnReconnect: true
    });

    const channelDetailsLoading: boolean = useMemo<boolean>(
        () => channelDetailIsLoading || channelDetailsIsFetching,
        [channelDetailIsLoading, channelDetailsIsFetching]
    );

    const handleChannelDetails = useCallback<() => void>(() => {
        if (!channelDetailsLoading && channelDetailResults) {
            setChannelDetails(initialState);
            console.log('channel details results', channelDetailResults);
            setChannelDetails(channelDetailResults?.items[0]);
        }
    }, [channelDetailResults, channelDetailsLoading]);

    const {
        data: channelVideoResults,
        isLoading: channelVideosIsLoading,
        isFetching: channelVideosIsFetching
    } = useChannelVideosQuery(id as string, {
        refetchOnReconnect: true
    });

    const channelVideosLoading: boolean = useMemo<boolean>(
        () => channelVideosIsLoading || channelVideosIsFetching,
        [channelVideosIsLoading, channelVideosIsFetching]
    );

    const handleChannelVideos = useCallback<() => void>(() => {
        if (!channelVideosLoading && channelVideoResults) {
            setVideos(null);
            console.log('channel videos results', channelVideoResults);
            setVideos(channelVideoResults?.items);
        }
    }, [channelVideoResults, channelVideosLoading]);

    const isLoading: boolean = useMemo<boolean>(
        () => channelDetailsLoading || channelVideosLoading,
        [channelDetailsLoading, channelVideosLoading]
    );

    useEffect(() => {
        handleChannelDetails();
        handleChannelVideos();
    }, [id, handleChannelDetails, handleChannelVideos]);

    const videosOnly: Video[] = useMemo<Video[]>(
        () => videos?.filter((video: Video) => video?.id?.kind?.includes('video'))!,
        [videos]
    );

    return isLoading ? <Spinner /> : (
        <Box minHeight="95vh">
            <Box>
                <Box
                    component="div"
                    sx={{
                        height: '300px',
                        background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)',
                        // backgroundImage: `url("${channelDetails.brandingSettings?.image?.bannerExternalUrl}")`,
                        zIndex: 10,
                    }}
                />
                <ChannelCard
                    channelDetails={channelDetails}
                    marginTop="-93px"
                />
            </Box>
            <Box p={2} display="flex">
                <Box sx={{ mr: { sm: '100px' } }} />
                <Videos videos={videosOnly} />
            </Box>
        </Box>
    );
};
