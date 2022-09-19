import { lazy } from "react";
import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import { Box } from "@mui/material";

import { Navbar } from "../components";

import type { Lazy } from "../types";

const Feed: Lazy = lazy(() => import("../pages/FeedPage"));
const VideoDetails: Lazy = lazy(() => import("../pages/VideoDetailsPage"));
const ChannelDetails: Lazy = lazy(() => import("../pages/ChannelDetailsPage"));
const SearchFeed: Lazy = lazy(() => import("../pages/SearchFeedPage"));

const Routes = () => (
    <Router>
        <Box sx={{ bgcolor: 'common.black' }}>
            <Navbar />
            <Switch>
                <Route path='/' element={<Feed />} />
                <Route path='/video/:id' element={<VideoDetails />} />
                <Route path='/channel/:id' element={<ChannelDetails />} />
                <Route path='/search/:searchTerm' element={<SearchFeed />} />
            </Switch>
        </Box>
    </Router>
);

export default Routes;
