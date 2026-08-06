// =============================================
// Flickr API Module
// FFSFBA Gallery
// =============================================


import { config } from "./config.js";

const API_KEY = config.apiKey;
const USER_ID = config.userId;

export async function getAlbumPhotos(albumId){

const url =
    "https://www.flickr.com/services/rest/" +
    "?method=flickr.photosets.getPhotos" +
    `&api_key=${API_KEY}` +
    `&photoset_id=${albumId}` +
    `&user_id=${USER_ID}` +
    "&extras=url_l,url_c,url_o,description,date_taken,tags" +
    "&format=json" +
    "&nojsoncallback=1";

    
    const response = await fetch(url);

    if(!response.ok){

        throw new Error("Unable to contact Flickr");

    }

    const json = await response.json();

    return json.photoset.photo;

}

