import { Track as TrackPrisma, Prisma } from '@prisma/client';

export type Track = TrackPrisma;

export type CreateTrackInput = Prisma.TrackCreateInput;
