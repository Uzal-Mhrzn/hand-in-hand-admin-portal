import { useEventStore } from "@/stores/eventStore";
import { apiConstants } from "./ApiConstant";
import { Fetch, Post } from "./ApiService";
import type { PhotoAlbums } from "@/types/PhotoAlbums";
import { usePhotoAlbumStore } from "@/stores/photoAlbumStore";

export async function fetchPhotoAlbum(eventId: string): Promise<PhotoAlbums[]> {
    const photoAlbumState = usePhotoAlbumStore();
    const photoAlbumUrl = apiConstants.PHOTOALBUMS.replace("{id}", eventId);

    const photoAlbums = await Fetch(photoAlbumUrl);
    photoAlbumState.setPhotoAlbums(photoAlbums);
    return photoAlbums;
}

export async function addPhotoAlbum(eventId: string, body: PhotoAlbums) {
    const photoAlbumState = usePhotoAlbumStore();
    const photoAlbumUrl = apiConstants.PHOTOALBUMS.replace("{id}", eventId);

    const events = await Post(photoAlbumUrl, body, { "Content-Type": "application/json" });
    photoAlbumState.setPhotoAlbums(events);
    return events;
}
