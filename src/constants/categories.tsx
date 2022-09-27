import {
  Home as HomeIcon,
  Code as CodeIcon,
  LiveTv as LiveTvIcon,
  School as SchoolIcon,
  Checkroom as CheckroomIcon,
  GraphicEq as GraphicEqIcon,
  MusicNote as MusicNoteIcon,
  OndemandVideo as OndemandVideoIcon,
  SportsEsports as SportsEsportsIcon,
  TheaterComedy as TheaterComedyIcon,
  FitnessCenter as FitnessCenterIcon,
  DeveloperMode as DeveloperModeIcon,
  FaceRetouchingNatural as FaceRetouchingNaturalIcon
} from '@mui/icons-material';

import type { Category } from '../types';

export const categories: Category[] = [
  { name: 'New', icon: <HomeIcon />, },
  { name: 'JS Mastery', icon: <CodeIcon />, },
  { name: 'Coding', icon: <CodeIcon />, },
  { name: 'ReactJS', icon: <CodeIcon />, },
  { name: 'NextJS', icon: <CodeIcon />, },
  { name: 'Music', icon: <MusicNoteIcon /> },
  { name: 'Education', icon: <SchoolIcon />, },
  { name: 'Podcast', icon: <GraphicEqIcon />, },
  { name: 'Movie', icon: <OndemandVideoIcon />, },
  { name: 'Gaming', icon: <SportsEsportsIcon />, },
  { name: 'Live', icon: <LiveTvIcon />, },
  { name: 'Sport', icon: <FitnessCenterIcon />, },
  { name: 'Fashion', icon: <CheckroomIcon />, },
  { name: 'Beauty', icon: <FaceRetouchingNaturalIcon />, },
  { name: 'Comedy', icon: <TheaterComedyIcon />, },
  { name: 'Gym', icon: <FitnessCenterIcon />, },
  { name: 'Crypto', icon: <DeveloperModeIcon />, },
];
