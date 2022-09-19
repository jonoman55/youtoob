import { useEffect, useState } from "react";
import { Box, Stack, Typography, Theme } from "@mui/material";

import { Sidebar } from "../layout";
import { Videos } from "../videos";
import { fetchFromAPI } from "../../utils";

import type { Video } from "../../types";

export const Feed = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("New");
    const [videos, setVideos] = useState<Video[] | null>(null);

    useEffect(() => {
        setVideos(null);
        fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
            .then((data) => setVideos(data.items));
    }, [selectedCategory]);

    return (
        <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
            <Box sx={{
                height: { sx: "auto", md: "92vh" },
                px: { sx: 0, md: 2 },
                borderRight: (theme: Theme) => `1px solid ${theme.custom.palette.darkGray}`
            }}>
                <Sidebar
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
                <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "common.white", }}>
                    Copyright © {new Date().getFullYear()} JC Dev
                </Typography>
            </Box>
            <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
                <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
                    {selectedCategory}
                    <Box component="span" sx={(theme: Theme) => ({ color: theme.custom.palette.red })}>
                        {' '}Videos
                    </Box>
                </Typography>
                <Videos videos={videos} />
            </Box>
        </Stack>
    );
};
