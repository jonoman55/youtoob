import { Box } from '@mui/material';

import { VideoCard } from './VideoCard';
import { Spinner } from '../design';
import { ChannelCard } from '../channel';
import { Stack } from '../styled/Videos.styled';

import type { Video } from '../../types';

interface VideosProps {
    videos: Video[] | null;
    direction?: 'column' | 'row';
};

export const Videos = ({ videos, direction }: VideosProps) => (
    !videos?.length ? <Spinner /> : (
        <Stack direction={direction || 'row'}>
            {videos?.map((video: Video, idx: number) => (
                <Box key={idx}
                    //sx={(theme) => ({ width: !theme.breakpoints.only('xs') ? '-webkit-fill-available' : 'auto' })}
                >
                    {video?.id?.videoId && <VideoCard video={video} />}
                    {video?.id?.channelId && <ChannelCard channelDetails={video} />}
                </Box>
            ))}
        </Stack>
    )
);
