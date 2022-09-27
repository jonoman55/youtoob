import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import {
    CardContent,
    CardMedia,
    SubscriberCount,
    VerifiedIcon,
    channelCardStyles
} from '../styled/Channel.styled';
import { formatSubscriberCount } from '../../helpers';
import { demoProfilePicture } from '../../constants';

import type { Video } from '../../types';

interface ChannelCardProps {
    channelDetails: Video;
    marginTop?: string;
};

// const checkImage = (url: string): boolean => {
//     let result: boolean = false;
//     const request = new XMLHttpRequest();
//     request.open("GET", url, true);
//     request.send();
//     request.onload = () => {
//         // status = request.status;
//         if (request.status === 200) {
//             console.log("image exists");
//             result = true;
//         } else {
//             console.log("image doesn't exist");
//             result = false;
//         }
//     }
//     return result;
// };

// CHECK IF IMAGE EXISTS
// const checkIfImageExists = (url: string, callback: CallableFunction) => {
//     const img = new Image();
//     img.src = url;
//     if (img.complete) {
//         callback(true);
//     } else {
//         img.onload = () => {
//             callback(true);
//         };
//         img.onerror = () => {
//             callback(false);
//         };
//     }
// };
  
// USAGE
// checkIfImageExists('http://website/images/img.png', (exists: boolean) => {
//     if (exists) {
//         console.log('Image exists. ')
//     } else {
//         console.error('Image does not exists.')
//     }
// });

const getImageUrl = (channelDetails: Video): string => {
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
    <Box sx={channelCardStyles(marginTop)}>
        <Link to={`/channel/${channelDetails?.id?.channelId}`}>
            <CardContent>
                <CardMedia
                    component='img'
                    src={getImageUrl(channelDetails)}
                    alt={`${channelDetails?.snippet?.title}`}
                />
                <Typography variant='h6'>
                    {channelDetails?.snippet?.title}{' '}
                    <VerifiedIcon />
                </Typography>
                {channelDetails?.statistics?.subscriberCount && (
                    <SubscriberCount>
                        {formatSubscriberCount(channelDetails?.statistics?.subscriberCount!)}{' '}Subscribers
                    </SubscriberCount>
                )}
            </CardContent>
        </Link>
    </Box>
);
