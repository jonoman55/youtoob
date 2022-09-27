import { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Box, Stack } from "@mui/material";

import { SearchBar } from "../search";
import { appActions } from "../../reducers/appSlice";
import { useAppDispatch } from "../../app/hooks";
import { logo } from "../../images";

export const Navbar = () => {
    const dispatch = useAppDispatch();

    const handleLastVisited = useCallback(
        () => { dispatch(appActions.setLastVisited(Date.now())); },
        [dispatch]
    );

    useEffect(
        () => handleLastVisited(),
        [handleLastVisited]
    );

    return (
        <Stack direction="row" alignItems="center" p={2} sx={{ position: "sticky", bgcolor: "common.black", top: 0, justifyContent: "space-between" }}>
            <Link to="/" style={{ display: "flex", alignItems: "center" }}>
                <Box component='img' src={logo} alt="logo" height={45} />
            </Link>
            <SearchBar />
        </Stack>
    );
};
