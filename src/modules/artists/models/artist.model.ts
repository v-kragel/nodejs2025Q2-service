import { Prisma, Artist as ArtistPrisma } from '@prisma/client';

export type Artist = ArtistPrisma;

export type CreateArtistInput = Prisma.ArtistCreateInput;
