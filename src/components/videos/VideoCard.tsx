import { Link } from 'react-router-dom';
import { Card, CardMedia } from '@mui/material';

import { CardContent, VerifiedIcon, VideoCardSubtitle, VideoCardTitle } from '../styled/Videos.styled';
import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from '../../constants';

import type { Video } from '../../types';

export const VideoCard = ({ video }: { video: Video }) => (
    <Card sx={{ width: { xs: '100%', sm: '358px', md: '320px', }, boxShadow: 'none', borderRadius: 0 }}>
        <Link to={video?.id?.videoId ? `/video/${video?.id?.videoId}` : `/video/cV2gBU6hKfY`}>
            <CardMedia
                component='img'
                src={video?.snippet?.thumbnails?.high?.url || demoThumbnailUrl}
                alt={video?.snippet?.title}
                sx={{ width: { xs: '100%', sm: '358px' }, height: 180 }}
            />
        </Link>
        <CardContent>
            <Link to={video?.id?.videoId ? `/video/${video?.id?.videoId}` : demoVideoUrl} >
                <VideoCardTitle variant='subtitle1'>
                    {video?.snippet?.title! || demoVideoTitle.slice(0, 60)}
                </VideoCardTitle>
            </Link>
            <Link to={video?.snippet?.channelId ? `/channel/${video?.snippet?.channelId}` : demoChannelUrl} >
                <VideoCardSubtitle variant='subtitle2'>
                    {video?.snippet?.channelTitle || demoChannelTitle}
                    <VerifiedIcon />
                </VideoCardSubtitle>
            </Link>
        </CardContent>
    </Card>
);