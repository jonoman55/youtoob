import { Typography } from "@mui/material";

export const Copyright = () => (
    <Typography className='copyright' variant='body2' sx={{ mt: 1.5, color: 'common.white' }}>
        Copyright © {new Date().getFullYear()} JC Dev
    </Typography>
);
