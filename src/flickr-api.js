// =============================================
// Flickr API Module
// FFSFBA Gallery
// =============================================

import {config} from "./config.js";


const API_KEY = "bbd36ebd13c29c1a18367b1df66106f2";

const USER_ID = "44239813@N00";

export async function getAlbumPhotos(albumId){

    const url =
`https://www.flickr.com/services/rest/
?method=flickr.photosets.getPhotos
&api_key=${API_KEY}
&photoset_id=${albumId}
&user_id=${USER_ID}
&extras=url_l,url_o,url_c,description,date_taken,tags
&format=json
&nojsoncallback=1`
.replace(/\n/g,"");

    const response = await fetch(url);

    if(!response.ok){

        throw new Error("Unable to contact Flickr");

    }

    const json = await response.json();

    return json.photoset.photo;

}

