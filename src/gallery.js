console.log("***** GALLERY VERSION 2 *****");
console.log(import.meta.url);

import { getAlbumPhotos } from "./flickr-api.js";

// Read URL parameters

const params = new URLSearchParams(window.location.search);

const albumID =
    params.get("album");

const galleryTitle =
    params.get("title") || "Travel Gallery";

document.getElementById("gallery-title").textContent =
    decodeURIComponent(galleryTitle);



async function loadGallery() {
    const gallery = document.getElementById("gallery-grid");

    gallery.innerHTML =
        "<div class='loading'>Loading Flickr photos...</div>";

    try {

        const photos = await getAlbumPhotos(albumID);

        gallery.innerHTML = "";

        for (const p of photos) {

            const image =
                p.url_l || p.url_c || p.url_o;

            const title =
                p.title || "";

            const caption =
                p.description?._content || "";

            const card = document.createElement("div");

            card.className = "photo";

            card.innerHTML = `
                <img src="${image}" alt="${title}">
                <div class="caption">
                    <h3>${title}</h3>
                    <p>${caption}</p>
                </div>
            `;

            gallery.appendChild(card);

        }

        console.log(`Loaded ${photos.length} Flickr photos.`);

    }

    catch(err){

        console.error(err);

        gallery.innerHTML =
            `<div class="loading">
                Unable to load Flickr gallery.
             </div>`;

    }

}

loadGallery();


