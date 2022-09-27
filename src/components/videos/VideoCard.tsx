import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia, Theme } from "@mui/material";
import { CheckCircle as CheckCircleIcon } from "@mui/icons-material";

import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../../constants";

import type { Video } from "../../types";

export const VideoCard = ({ video }: { video: Video }) => (
    <Card sx={{ width: { xs: '100%', sm: '358px', md: "320px", }, boxShadow: "none", borderRadius: 0 }}>
        <Link to={video?.id?.videoId ? `/video/${video?.id?.videoId}` : `/video/cV2gBU6hKfY`}>
            <CardMedia
                component="img"
                src={video?.snippet?.thumbnails?.high?.url || demoThumbnailUrl}
                alt={video?.snippet?.title}
                sx={{ width: { xs: '100%', sm: '358px' }, height: 180 }}
            />
        </Link>
        <CardContent sx={{ backgroundColor: (theme: Theme) => theme.custom.palette.ytBlack, height: '106px' }}>
            <Link to={video?.id?.videoId ? `/video/${video?.id?.videoId}` : demoVideoUrl} >
                <Typography
                    variant="subtitle1"
                    sx={{
                        color: 'common.white',
                        fontWeight: 500,
                        maxHeight: '4.4rem',
                        overflow: 'hidden',
                        WebkitLineClamp: 2,
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'normal'
                    }}
                >
                    {video?.snippet?.title! || demoVideoTitle.slice(0, 60)}
                </Typography>
            </Link>
            <Link to={video?.snippet?.channelId ? `/channel/${video?.snippet?.channelId}` : demoChannelUrl} >
                <Typography
                    variant="subtitle2"
                    sx={{
                        color: (theme: Theme) => theme.custom.palette.ytGray,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: 'block',
                        marginRight: '-0.1em',
                        paddingRight: '0.1em',
                        whiteSpace: 'pre'
                    }}
                >
                    {video?.snippet?.channelTitle || demoChannelTitle}
                    <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </Typography>
            </Link>
        </CardContent>
    </Card>
);