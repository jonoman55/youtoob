import { Link } from "react-router-dom"; 
import { Typography, Card, CardContent, CardMedia, Theme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../../constants";

import type { Video } from "../../types";

const imageUrl = (url: string | undefined): string => {
    return url ? url : demoThumbnailUrl;
};

export const VideoCard = ({ video }: { video: Video }) => (
    <Card sx={{ width: { xs: '100%', sm: '358px', md: "320px", }, boxShadow: "none", borderRadius: 0 }}>
        <Link to={video?.id?.videoId ? `/video/${video?.id?.videoId}` : `/video/cV2gBU6hKfY`}>
            <CardMedia
                component="img"
                src={imageUrl(video?.snippet?.thumbnails?.high?.url)}
                alt={video?.snippet?.title}
                sx={{ width: { xs: '100%', sm: '358px' }, height: 180 }}
            />
        </Link>
        <CardContent sx={{ backgroundColor: (theme: Theme) => theme.custom.palette.ytBlack, height: '106px' }}>
            <Link to={video?.id?.videoId ? `/video/${video?.id?.videoId}` : demoVideoUrl} >
                <Typography variant="subtitle1" fontWeight="bold" color="white">
                    {video?.snippet?.title?.slice(0, 60) || demoVideoTitle.slice(0, 60)}
                </Typography>
            </Link>
            <Link to={video?.snippet?.channelId ? `/channel/${video?.snippet?.channelId}` : demoChannelUrl} >
                <Typography variant="subtitle2" color="gray">
                    {video?.snippet?.channelTitle || demoChannelTitle}
                    <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </Typography>
            </Link>
        </CardContent>
    </Card>
);