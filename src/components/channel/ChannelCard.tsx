import { Link } from 'react-router-dom';
import { Box, CardContent, CardMedia, Typography, Theme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { demoProfilePicture } from '../../constants';

import type { Video } from '../../types';

interface ChannelCardProps {
    channelDetails: Video;
    marginTop?: string;
};

const imageUrl = (channelDetails: Video): string => {
    if (channelDetails?.snippet?.title?.includes('JS Mastery'))
        return channelDetails?.snippet?.thumbnails?.high?.url as string;
    if (channelDetails?.snippet?.thumbnails?.default?.url)
        return channelDetails?.snippet?.thumbnails?.default?.url as string;
    if (channelDetails?.snippet?.thumbnails?.medium?.url)
        return channelDetails?.snippet?.thumbnails?.medium?.url as string;
    if (channelDetails?.snippet?.thumbnails?.high?.url)
        return channelDetails?.snippet?.thumbnails?.high?.url as string;
    return demoProfilePicture;
};

export const ChannelCard = ({ channelDetails, marginTop }: ChannelCardProps) => (
    <Box
        sx={{
            boxShadow: 'none',
            borderRadius: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: { xs: '356px', md: '320px' },
            height: '326px',
            margin: 'auto',
            marginTop,
        }}
    >
        <Link to={`/channel/${channelDetails?.id?.channelId}`}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', color: 'white' }}>
                <CardMedia
                    component="img"
                    src={imageUrl(channelDetails)}
                    alt={`${channelDetails?.snippet?.title}`}
                    sx={(theme: Theme) => ({
                        mb: 2,
                        borderRadius: '50%',
                        height: '180px',
                        width: '180px',
                        border: `1px solid ${theme.custom.palette.lightGray}`
                    })}
                />
                <Typography variant="h6">
                    {channelDetails?.snippet?.title}{' '}
                    <CheckCircleIcon sx={{ fontSize: '14px', color: 'gray', ml: '5px' }} />
                </Typography>
                {channelDetails?.statistics?.subscriberCount && (
                    <Typography sx={{ fontSize: '15px', fontWeight: 500, color: 'gray' }}>
                        {parseInt(channelDetails?.statistics?.subscriberCount).toLocaleString('en-US')} Subscribers
                    </Typography>
                )}
            </CardContent>
        </Link>
    </Box>
);
