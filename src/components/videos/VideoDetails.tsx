import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Box, Stack } from '@mui/material';
import { Visibility as VisibilityIcon, ThumbUp as ThumbUpIcon, Download as DownloadIcon } from '@mui/icons-material';
import ReactPlayer from 'react-player';

import { Videos } from './Videos';
import { Spinner } from '../design';
import { VideoDownloadDialog as VideoDialog } from './VideoDialog';
import { DownloadButton, VerifiedIcon, VideoDetailsStack, VideoIcon, VideosBox, VideoTitle } from '../styled/Videos.styled';
import { appActions } from '../../reducers/appSlice';
import { useConvertMutation } from '../../apis/convertApi';
import { useRelatedVideosQuery, useVideoDetailsQuery } from '../../apis/youtubeApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useBreakpoints } from '../../hooks';

import type { Video, VideoDownload } from '../../types';

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
    const dispatch = useAppDispatch();

    const { videoDownload, dialogOpen } = useAppSelector((state) => state.app);

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
            // console.log('video details results', videoDetailResults);
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
            // console.log('related videos results', relatedVideoResults);
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

    const convertIsLoading: boolean = useMemo<boolean>(
        () => result.isLoading,
        [result.isLoading]
    );

    const handleDownloadClick = (url: string) => async () => {
        if (url) {
            try {
                const videoDownload: VideoDownload = await download(url).unwrap();
                if (result.isSuccess) {
                    dispatch(appActions.setVideoDownload(videoDownload));
                    dispatch(appActions.setDialogOpen(true));
                }
            } catch (error) {
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
        <React.Fragment>
            <Box minHeight='95vh'>
                <Stack direction={{ xs: 'column', md: 'row' }}>
                    <Box flex={1}>
                        <Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
                            <ReactPlayer
                                className='react-player'
                                url={videoLink}
                                controls
                            />
                            <VideoTitle variant='h5'>{title}</VideoTitle>
                            <VideoDetailsStack direction='row'>
                                <Link to={`/channel/${channelId}`}>
                                    <Typography variant={`${!sm ? 'subtitle1' : 'h6'}`} sx={{ color: 'common.white' }}>
                                        {channelTitle}
                                        <VerifiedIcon />
                                    </Typography>
                                </Link>
                                <Stack direction='row' gap='20px' alignItems='center'>
                                    <DownloadButton
                                        size='large'
                                        onClick={handleDownloadClick(videoLink)}
                                        startIcon={<DownloadIcon fontSize='large' />}
                                        loading={convertIsLoading}
                                    >
                                        Download
                                    </DownloadButton>
                                    <VideoIcon
                                        count={viewCount!}
                                        icon={<VisibilityIcon />}
                                    />
                                    <VideoIcon
                                        count={likeCount!}
                                        icon={<ThumbUpIcon />}
                                    />
                                </Stack>
                            </VideoDetailsStack>
                        </Box>
                    </Box>
                    <VideosBox py={{ md: 1, xs: 5 }}>
                        <Videos
                            videos={videosOnly}
                            direction='column'
                        />
                    </VideosBox>
                </Stack>
            </Box>
            {dialogOpen === true && videoDownload !== null && (
                <VideoDialog
                    videoDownload={videoDownload}
                />
            )}
        </React.Fragment>
    );
};
