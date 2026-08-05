/**
 * Represents a single photo in the gallery.
 */
export class GalleryPhoto {
    constructor({
        id,
        title,
        caption,
        thumbnail,
        large,
        width = null,
        height = null,
        photographer = "",
        dateTaken = "",
        tags = []
    }) {
        this.id = id;
        this.title = title;
        this.caption = caption;
        this.thumbnail = thumbnail;
        this.large = large;
        this.width = width;
        this.height = height;
        this.photographer = photographer;
        this.dateTaken = dateTaken;
        this.tags = tags;
    }
}

/**
 * Represents an album.
 */
export class GalleryAlbum {
    constructor({
        id,
        title,
        description = "",
        photos = []
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.photos = photos;
    }
}
