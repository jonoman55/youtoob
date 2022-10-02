import { lazy } from 'react';
import { HashRouter as Router, Routes as Switch, Route } from 'react-router-dom';

import { Container, Navbar } from '../components';
import type { Lazy } from '../types';

const Feed: Lazy = lazy(() => import('../pages/FeedPage'));
const VideoDetails: Lazy = lazy(() => import('../pages/VideoDetailsPage'));
const ChannelDetails: Lazy = lazy(() => import('../pages/ChannelDetailsPage'));
const SearchFeed: Lazy = lazy(() => import('../pages/SearchFeedPage'));

const Routes = () => (
    <Router>
        <Container>
            <Navbar />
            <Switch>
                <Route path='/' element={<Feed />} />
                <Route path='/video/:id' element={<VideoDetails />} />
                <Route path='/channel/:id' element={<ChannelDetails />} />
                <Route path='/search/:searchTerm' element={<SearchFeed />} />
            </Switch>
        </Container>
    </Router>
);

export default Routes;
