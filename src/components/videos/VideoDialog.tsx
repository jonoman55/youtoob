import { useMemo } from 'react';
import { Box, DialogActions, DialogContentText, Stack, Typography, Link } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';

import { Dialog, DialogContent, DialogTitle, SaveButton, Transition } from '../styled/Dialog.styled';
import { appActions } from '../../reducers/appSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { formatQuality } from '../../helpers';

import type { VideoDownload, Url } from '../../types';

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
                                Video Quality:{' '}{videoQuality}
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
                        <SaveButton autoFocus startIcon={<DownloadIcon />}>
                            Save
                        </SaveButton>
                    </Link>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
