import { useEffect, useState, useMemo, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Theme, Typography, Box, Stack, IconButton } from '@mui/material';
import { Visibility as VisibilityIcon, ThumbUp as ThumbUpIcon, Download as DownloadIcon } from '@mui/icons-material';

import { Videos } from './Videos';
import { Spinner } from '../design';
import { VerifiedIcon, VideoDetailsStack, VideoIcon, VideosBox, VideoTitle } from '../styled/Videos.styled';
import { useConvertMutation } from '../../apis/convertApi';
import { useRelatedVideosQuery, useVideoDetailsQuery } from '../../apis/youtubeApi';
import { useBreakpoints } from '../../hooks';

import { Video, VideoDownload } from '../../types';

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

    const handleDownload = (url: string) => async () => {
        if (url) {
            try {
                const obj = await download(url).unwrap();
                // console.log(result);
                if (result) {
                    setDownloadVideo(obj);
                    setDialogOpen(true);
                }
            } catch (error) {
                // console.log(result);
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
        <Box minHeight='95vh'>
            <Stack direction={{ xs: 'column', md: 'row' }}>
                <Box flex={1}>
                    <Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
                        <ReactPlayer className='react-player' url={videoLink} controls />
                        <VideoTitle variant='h5'>{title}</VideoTitle>
                        <VideoDetailsStack direction='row'>
                            <Link to={`/channel/${channelId}`}>
                                <Typography variant={`${!sm ? 'subtitle1' : 'h6'}`} sx={{ color: 'common.white' }}>
                                    {channelTitle}
                                    <VerifiedIcon />
                                </Typography>
                            </Link>
                            <Stack direction='row' gap='20px' alignItems='center'>
                                <Stack direction='row' spacing={1} alignItems='center' justifyContent='center'>
                                    <IconButton sx={{ color: 'common.white' }} onClick={handleDownload(videoLink)}>
                                        <DownloadIcon />
                                    </IconButton>
                                    <Typography variant='body1' sx={{
                                        fontWeight: 500, textTransform: 'uppercase', color: (theme: Theme) => theme.custom.palette.ytGray
                                    }}>
                                        Download
                                    </Typography>
                                </Stack>
                                <VideoIcon count={viewCount!} icon={<VisibilityIcon />} />
                                <VideoIcon count={likeCount!} icon={<ThumbUpIcon />} />
                            </Stack>
                        </VideoDetailsStack>
                    </Box>
                </Box>
                <VideosBox py={{ md: 1, xs: 5 }}>
                    <Videos videos={videosOnly} direction='column' />
                </VideosBox>
            </Stack>
        </Box>
    );
};
