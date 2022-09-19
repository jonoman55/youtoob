import { Stack, Box } from "@mui/material";

import { VideoCard } from "./VideoCard";
import { ChannelCard } from "../channel";
import { Spinner } from "../design";

import type { Video } from "../../types";

interface VideosProps {
    videos: Video[] | null;
    direction?: "column" | "row";
};

export const Videos = ({ videos, direction }: VideosProps) => (
    !videos?.length ? <Spinner /> : (
        <Stack direction={direction || "row"} flexWrap="wrap" justifyContent="start" alignItems="start" gap={2}>
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
