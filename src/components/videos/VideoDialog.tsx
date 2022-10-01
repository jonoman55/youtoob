import React, { useMemo, forwardRef } from 'react';
import { Box, Button, Stack, Slide, IconButton, Typography, Link } from '@mui/material';
import { Dialog as MuiDialog, DialogActions, DialogContent as MuiDialogContent, DialogContentText, DialogTitle as MuiDialogTitle } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Close as CloseIcon, Download as DownloadIcon } from '@mui/icons-material';
import { styled, Theme } from '@mui/material/styles';

import { appActions } from '../../reducers/appSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type { VideoDownload, Url } from '../../types';;

// TODO : Move styled components to Video.styled.tsx
const Dialog = styled(MuiDialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const DialogContent = styled(MuiDialogContent)(({
    display: 'flex',
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
}));

interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
};

const DialogTitle = ({ children, onClose, ...other }: DialogTitleProps) => (
    <MuiDialogTitle sx={{ minWidth: '250px', m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
            <IconButton
                aria-label='close'
                onClick={onClose}
                sx={(theme: Theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.common.white,
                    '&:hover': {
                        color: theme.custom.palette.red
                    }
                })}
            >
                <CloseIcon />
            </IconButton>
        ) : null}
    </MuiDialogTitle>
);

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction='up' ref={ref} {...props} />;
});

interface VideoDownloadDialogProps {
    videoDownload: VideoDownload;
};

export const VideoDownloadDialog = ({ videoDownload }: VideoDownloadDialogProps) => {
    const dispatch = useAppDispatch();

    const dialogOpen: boolean = useAppSelector((state) => state.app.dialogOpen);

    const downloadUrl: Url = useMemo<Url>(
        () => videoDownload.url.filter(({ downloadable }: Url) => downloadable).shift()!,
        [videoDownload]
    );

    const handleClose = () => {
        dispatch(appActions.setDialogOpen(false));
        dispatch(appActions.setVideoDownload(null));
    };

    const formatQuality = (duration: string): string => {
        if (duration.includes(':')) {
            const split = duration.split(':');
            return split[1];
        }
        return duration;
    };

    const videoQuality: string = useMemo<string>(
        () => formatQuality(downloadUrl.attr.title),
        [downloadUrl]
    );

    return (
        <Box component='div'>
            <Dialog
                open={dialogOpen}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby='video-download-dialog'
            >
                <DialogTitle onClose={handleClose} id='video-download-dialog'>
                    <Typography sx={{ color: 'primary.contrastText', fontSize: 18 }}>Download Video</Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText id='video-download-dialog' textAlign='center' color='text.secondary' paragraph gutterBottom>
                        {videoDownload.meta.title}
                    </DialogContentText>
                    <Box
                        component='img'
                        src={videoDownload.thumb}
                        alt={videoDownload.meta.title}
                        height={150}
                        width={225}
                    />
                    <Box component='div' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <Stack direction='row' alignItems='center'>
                            <Typography sx={{ my: 2, textTransform: 'capitalize' }}>
                                Video Quality: {videoQuality}
                            </Typography>
                            <Typography>p</Typography>
                        </Stack>
                        <Typography gutterBottom>
                            Duration:{' '}{videoDownload.meta.duration}
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Link href={`${downloadUrl.url}`} target='_blank' rel='noopener noreferrer' sx={{ textDecoration: 'none' }}>
                        <Button
                            autoFocus
                            sx={{ color: 'common.white', mr: 2, '&:hover': { color: (theme: Theme) => theme.custom.palette.red } }}
                            startIcon={<DownloadIcon />}
                        >
                            Save
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
