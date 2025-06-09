import { Artist, Album, Track } from '@prisma/client';

export type Favorites = {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
};
