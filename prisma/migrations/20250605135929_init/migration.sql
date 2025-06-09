/*
  Warnings:

  - You are about to drop the `Favorites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Favorites_Albums` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Favorites_Artists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Favorites_Tracks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Favorites_Albums" DROP CONSTRAINT "_Favorites_Albums_A_fkey";

-- DropForeignKey
ALTER TABLE "_Favorites_Albums" DROP CONSTRAINT "_Favorites_Albums_B_fkey";

-- DropForeignKey
ALTER TABLE "_Favorites_Artists" DROP CONSTRAINT "_Favorites_Artists_A_fkey";

-- DropForeignKey
ALTER TABLE "_Favorites_Artists" DROP CONSTRAINT "_Favorites_Artists_B_fkey";

-- DropForeignKey
ALTER TABLE "_Favorites_Tracks" DROP CONSTRAINT "_Favorites_Tracks_A_fkey";

-- DropForeignKey
ALTER TABLE "_Favorites_Tracks" DROP CONSTRAINT "_Favorites_Tracks_B_fkey";

-- DropTable
DROP TABLE "Favorites";

-- DropTable
DROP TABLE "_Favorites_Albums";

-- DropTable
DROP TABLE "_Favorites_Artists";

-- DropTable
DROP TABLE "_Favorites_Tracks";

-- CreateTable
CREATE TABLE "FavoriteArtist" (
    "id" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,

    CONSTRAINT "FavoriteArtist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteAlbum" (
    "id" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,

    CONSTRAINT "FavoriteAlbum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteTrack" (
    "id" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,

    CONSTRAINT "FavoriteTrack_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteArtist_artistId_key" ON "FavoriteArtist"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteAlbum_albumId_key" ON "FavoriteAlbum"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteTrack_trackId_key" ON "FavoriteTrack"("trackId");

-- AddForeignKey
ALTER TABLE "FavoriteArtist" ADD CONSTRAINT "FavoriteArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteAlbum" ADD CONSTRAINT "FavoriteAlbum_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteTrack" ADD CONSTRAINT "FavoriteTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
