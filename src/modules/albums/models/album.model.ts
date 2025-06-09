import { Album as AlbumPrisma, Prisma } from '@prisma/client';

export type Album = AlbumPrisma;

export type CreateAlbumInput = Prisma.AlbumCreateInput;
