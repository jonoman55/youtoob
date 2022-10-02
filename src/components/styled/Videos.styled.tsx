import React from 'react';
import { Box as MuiBox, BoxProps as MuiBoxProps, CardContent as MuiCardContent,  Stack as MuiStack, Typography as MuiTypography } from '@mui/material';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { CheckCircle as MuiCheckCircle } from '@mui/icons-material';

import { formatCount } from '../../helpers';

export const Stack = styled(MuiStack)(({ theme }) => ({
    flexWrap: 'wrap',
    justifyContent: 'start',
    alignItems: 'start',
    gap: theme.spacing(2)
}));

export const VideosBox = styled(MuiBox)<MuiBoxProps>(({ theme }) => ({
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    justifyContent: 'center',
    alignItems: 'center',
}));

export const VideoIcon = (props: {
    count: string, 
    icon: React.ReactNode
}): JSX.Element => (
    <MuiStack direction='row' spacing={1}>
        {props.icon}
        <MuiTypography variant='body1' sx={{ opacity: 0.7 }}>
            {formatCount(props.count)}
        </MuiTypography>
    </MuiStack>
);

export const VideoTitle = styled(MuiTypography)<{
    component?: React.ReactNode;
}>(({ theme }) => ({
    color: theme.palette.common.white,
    fontWeight: 'bold',
    padding: theme.spacing(2)
}));

export const VerifiedIcon = styled(MuiCheckCircle)(({ theme }) => ({
    marginLeft: '5px',
    fontSize: '12px',
    color: theme.custom.palette.ytGray
}));

export const CardContent = styled(MuiCardContent)(({ theme }) => ({
    backgroundColor: theme.custom.palette.ytBlack,
    height: '106px' 
}));

export const VideoCardTitle = styled(MuiTypography)<{
    component?: React.ReactNode;
}>(({ theme }) => ({
    color: theme.palette.common.white,
    fontWeight: 500,
    maxHeight: '4.4rem',
    overflow: 'hidden',
    WebkitLineClamp: 2,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal'
}));

export const VideoCardSubtitle = styled(MuiTypography)<{
    component?: React.ReactNode;
}>(({ theme }) => ({
    color: theme.custom.palette.ytGray,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block',
    marginRight: '-0.1em',
    paddingRight: '0.1em',
    whiteSpace: 'pre'
}));

export const VideoDetailsStack = styled(MuiStack)(({ theme }) => ({
    justifyContent: 'space-between',
    padding: theme.spacing(1, 2),
    color: theme.palette.common.white,
}));

export const DownloadText = styled(MuiTypography)<{
    component?: React.ReactNode;
}>(({ theme }) => ({
    fontWeight: 500,
    textTransform: 'uppercase',
    color: theme.custom.palette.ytGray,
}));

// TODO : Finish loading styles
export const DownloadButton = styled(LoadingButton)<LoadingButtonProps>(({ theme }) => ({
    marginLeft: theme.spacing(2),
    '&.MuiButton-text': {
        color: theme.custom.palette.ytGray,
    },
    '& .MuiButton-startIcon': {
        color: theme.palette.common.white,
    },
}));
