import { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import { Videos } from "./";
import { Spinner } from "../design";
import { fetchFromAPI } from "../../utils";
import { useBreakpoints } from "../../hooks";

import type { Video } from "../../types";

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

    const [videoDetail, setVideoDetail] = useState<Video>(initialState);
    const [videos, setVideos] = useState<Video[] | null>(null);

    useEffect(() => {
        fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then(
            (data) => setVideoDetail(data.items[0])
        );
        fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
            (data) => setVideos(data.items)
        );
    }, [id]);

    const videosOnly: Video[] = useMemo(() =>
        videos?.filter((video: Video) => !video?.id?.kind?.includes('playlist')) as Video[],
        [videos]
    );

    if (!videoDetail?.snippet) return <Spinner />;

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
    } = videoDetail;

    return (
        <Box minHeight="95vh">
            <Stack direction={{ xs: "column", md: "row" }}>
                <Box flex={1}>
                    <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
                        <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
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
                                <Stack direction="row" spacing={1}>
                                    <VisibilityIcon />
                                    <Typography variant="body1" sx={{ opacity: 0.7 }}>
                                        {parseInt(viewCount as string).toLocaleString()}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <ThumbUpIcon />
                                    <Typography variant="body1" sx={{ opacity: 0.7 }}>
                                        {parseInt(likeCount as string).toLocaleString()}
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
