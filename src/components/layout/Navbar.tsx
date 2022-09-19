import { Link } from "react-router-dom";
import { Stack } from "@mui/material";

import { SearchBar } from "../search";
import { logo } from "../../images";

export const Navbar = () => (
    <Stack direction="row" alignItems="center" p={2} sx={{ position: "sticky", bgcolor: "common.black", top: 0, justifyContent: "space-between" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <img src={logo} alt="logo" height={45} />
        </Link>
        <SearchBar />
    </Stack>
);
