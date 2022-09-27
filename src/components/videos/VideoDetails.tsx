import { useEffect, useState, useMemo, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, IconButton } from "@mui/material";
import {
    CheckCircle as CheckCircleIcon,
    Visibility as VisibilityIcon,
    ThumbUp as ThumbUpIcon,
    Download as DownloadIcon
} from "@mui/icons-material";

import { Videos } from "./";
import { Spinner } from "../design";
import { useConvertMutation } from "../../apis/convertApi";
import { useRelatedVideosQuery, useVideoDetailsQuery } from "../../apis/youtubeApi";
import { useBreakpoints } from "../../hooks";
import { formatCount } from "../../helpers";

import { Video, VideoDownload } from "../../types";

const initialState: Video = {
    id: {
        videoId: '',
    },
    snippet: {
        title: '',
        channelId: '',
        channelTitle: '',
    },
    statistics: {
        viewCount: '',
        likeCount: '',
    },
};

export const VideoDetails = () => {
    const { id } = useParams();
    const sm: boolean = useBreakpoints('sm', 'on');

    // TODO : Implement video download dialog
    // eslint-disable-next-line
    const [downloadVideo, setDownloadVideo] = useState<VideoDownload>();
    // eslint-disable-next-line
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const [videoDetails, setVideoDetails] = useState<Video>(initialState);
    const [videos, setVideos] = useState<Video[] | null>(null);

    const {
        data: videoDetailResults,
        isLoading: videoDetailIsLoading,
        isFetching: videoDetailsIsFetching
    } = useVideoDetailsQuery(id as string, {
        refetchOnReconnect: true
    });

    const videoDetailsLoading: boolean = useMemo<boolean>(
        () => videoDetailIsLoading || videoDetailsIsFetching,
        [videoDetailIsLoading, videoDetailsIsFetching]
    );

    const handleVideoDetails = useCallback<() => void>(() => {
        if (!videoDetailsLoading && videoDetailResults) {
            setVideoDetails(initialState);
            console.log('video details results', videoDetailResults);
            setVideoDetails(videoDetailResults?.items[0]);
        }
    }, [videoDetailResults, videoDetailsLoading]);

    const {
        data: relatedVideoResults,
        isLoading: relatedVideosIsLoading,
        isFetching: relatedVideosIsFetching
    } = useRelatedVideosQuery(id as string, {
        refetchOnReconnect: true
    });

    const relatedVideosLoading: boolean = useMemo<boolean>(
        () => relatedVideosIsLoading || relatedVideosIsFetching,
        [relatedVideosIsLoading, relatedVideosIsFetching]
    );

    const handleRelatedVideos = useCallback<() => void>(() => {
        if (!relatedVideosLoading && relatedVideoResults) {
            setVideos(null);
            console.log('related videos results', relatedVideoResults);
            setVideos(relatedVideoResults?.items);
        }
    }, [relatedVideoResults, relatedVideosLoading]);

    const isLoading: boolean = useMemo<boolean>(
        () => videoDetailsLoading || relatedVideosLoading,
        [videoDetailsLoading, relatedVideosLoading]
    );

    useEffect(() => {
        handleVideoDetails();
        handleRelatedVideos();
    }, [id, handleVideoDetails, handleRelatedVideos]);

    const videosOnly: Video[] = useMemo<Video[]>(
        () => videos?.filter((video: Video) => video?.id?.kind?.includes('video'))!,
        [videos]
    );

    const [download, result] = useConvertMutation();

    const handleDownload = (url: string) => async () => {
        if (url) {
            try {
                const obj = await download(url).unwrap();
                console.log(result);
                setDownloadVideo(obj);
                setDialogOpen(true);
            } catch (error) {
                console.log(result);
                console.error(error);
            }
        }
    };

    const videoLink: string = useMemo<string>(
        () => `https://www.youtube.com/watch?v=${id}`,
        [id]
    );

    if (!videoDetails?.snippet || isLoading) return <Spinner />;

    const {
        snippet: {
            title,
            channelId,
            channelTitle
        },
        statistics: {
            viewCount,
            likeCount
        }
    } = videoDetails;

    return (
        <Box minHeight="95vh">
            <Stack direction={{ xs: "column", md: "row" }}>
                <Box flex={1}>
                    <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
                        <ReactPlayer
                            className="react-player"
                            url={videoLink}
                            controls
                        />
                        <Typography color="white" variant="h5" fontWeight="bold" p={2}>
                            {title}
                        </Typography>
                        <Stack direction="row" justifyContent="space-between" sx={{ color: "white" }} py={1} px={2} >
                            <Link to={`/channel/${channelId}`}>
                                <Typography color="white" variant={`${!sm ? 'subtitle1' : 'h6'}`}>
                                    {channelTitle}
                                    <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                                </Typography>
                            </Link>
                            <Stack direction="row" gap="20px" alignItems="center">
                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                                    <IconButton sx={{ color: 'common.white' }} onClick={handleDownload(videoLink)}>
                                        <DownloadIcon />
                                    </IconButton>
                                    <Typography variant="body1" sx={{ textTransform: 'uppercase', color: '#aaa', fontWeight: 500 }}>
                                        Download
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <VisibilityIcon />
                                    <Typography variant="body1" sx={{ opacity: 0.7 }}>
                                        {formatCount(viewCount as string)}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <ThumbUpIcon />
                                    <Typography variant="body1" sx={{ opacity: 0.7 }}>
                                        {formatCount(likeCount as string)}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
                <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center">
                    <Videos videos={videosOnly} direction="column" />
                </Box>
            </Stack>
        </Box>
    );
};
