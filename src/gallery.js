import { getAlbumPhotos } from "./flickr-api.js";

console.log("***** FFSFBA GALLERY WITH LIGHTBOX *****");


// --------------------------------------------------
// Read gallery information from the URL
// --------------------------------------------------

const params = new URLSearchParams(window.location.search);

const albumID = params.get("album");

const galleryTitle =
    params.get("title") || "Travel Gallery";


// --------------------------------------------------
// Page elements
// --------------------------------------------------

const gallery =
    document.getElementById("gallery-grid");

const titleElement =
    document.getElementById("gallery-title");

titleElement.textContent = galleryTitle;


// --------------------------------------------------
// Lightbox state
// --------------------------------------------------

let photos = [];

let currentPhoto = 0;


// --------------------------------------------------
// Create the lightbox
// --------------------------------------------------

const lightbox =
    document.createElement("div");

lightbox.id = "lightbox";

lightbox.innerHTML = `

    <button
        id="lightbox-close"
        class="lightbox-button"
        aria-label="Close">
        ×
    </button>

    <button
        id="lightbox-prev"
        class="lightbox-button lightbox-nav"
        aria-label="Previous photo">
        ‹
    </button>

    <div id="lightbox-content">

        <img
            id="lightbox-image"
            src=""
            alt="">

        <div id="lightbox-caption">

            <div id="lightbox-title"></div>

            <div id="lightbox-description"></div>

        </div>

    </div>

    <button
        id="lightbox-next"
        class="lightbox-button lightbox-nav"
        aria-label="Next photo">
        ›
    </button>

`;

document.body.appendChild(lightbox);


// --------------------------------------------------
// Lightbox elements
// --------------------------------------------------

const lightboxImage =
    document.getElementById("lightbox-image");

const lightboxTitle =
    document.getElementById("lightbox-title");

const lightboxDescription =
    document.getElementById("lightbox-description");

const closeButton =
    document.getElementById("lightbox-close");

const previousButton =
    document.getElementById("lightbox-prev");

const nextButton =
    document.getElementById("lightbox-next");


// --------------------------------------------------
// Display a photo in the lightbox
// --------------------------------------------------

function showPhoto(index) {

    if (!photos.length) {
        return;
    }

    currentPhoto =
        (index + photos.length) % photos.length;

    const photo =
        photos[currentPhoto];

    const image =
        photo.url_o ||
        photo.url_l ||
        photo.url_c;

    const title =
        photo.title || "";

    const description =
        photo.description?._content || "";

    lightboxImage.src = image;

    lightboxImage.alt = title;

    lightboxTitle.textContent = title;

    lightboxDescription.textContent =
        description;

    previousButton.style.display =
        photos.length > 1 ? "block" : "none";

    nextButton.style.display =
        photos.length > 1 ? "block" : "none";
}


// --------------------------------------------------
// Open lightbox
// --------------------------------------------------

async function openLightbox(index) {

    showPhoto(index);

    lightbox.classList.add("active");

    document.body.classList.add("lightbox-open");

    // Request browser fullscreen when supported.
    // If fullscreen isn't available, the lightbox
    // still fills the gallery area.

    try {

        /*
        if (lightbox.requestFullscreen) {

            await lightbox.requestFullscreen();

        }

        else if (lightbox.webkitRequestFullscreen) {

            lightbox.webkitRequestFullscreen();

        }
        */
        

    }

    catch (error) {

        console.log(
            "Browser fullscreen unavailable."
        );

    }

}


// --------------------------------------------------
// Close lightbox
// --------------------------------------------------

async function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.classList.remove("lightbox-open");

    try {

        if (document.fullscreenElement) {

            await document.exitFullscreen();

        }

        else if (document.webkitFullscreenElement) {

            document.webkitExitFullscreen();

        }

    }

    catch (error) {

        console.log(
            "Could not exit fullscreen."
        );

    }

}


// --------------------------------------------------
// Navigation
// --------------------------------------------------

function showPrevious() {

    showPhoto(currentPhoto - 1);

}


function showNext() {

    showPhoto(currentPhoto + 1);

}


// --------------------------------------------------
// Button events
// --------------------------------------------------

closeButton.addEventListener(
    "click",
    closeLightbox
);

previousButton.addEventListener(
    "click",
    showPrevious
);

nextButton.addEventListener(
    "click",
    showNext
);


// Clicking the dark area closes the lightbox.

lightbox.addEventListener(
    "click",
    function(event) {

        if (event.target === lightbox) {

            closeLightbox();

        }

    }
);


// --------------------------------------------------
// Keyboard navigation
// --------------------------------------------------

document.addEventListener(
    "keydown",
    function(event) {

        if (!lightbox.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {

            closeLightbox();

        }

        else if (event.key === "ArrowLeft") {

            showPrevious();

        }

        else if (event.key === "ArrowRight") {

            showNext();

        }

    }
);


// --------------------------------------------------
// Touch / swipe navigation
// --------------------------------------------------

let touchStartX = 0;

let touchEndX = 0;


lightbox.addEventListener(
    "touchstart",
    function(event) {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    { passive: true }
);


lightbox.addEventListener(
    "touchend",
    function(event) {

        touchEndX =
            event.changedTouches[0].screenX;

        const distance =
            touchEndX - touchStartX;

        if (Math.abs(distance) < 50) {
            return;
        }

        if (distance > 0) {

            showPrevious();

        }

        else {

            showNext();

        }

    },
    { passive: true }
);


// --------------------------------------------------
// Load Flickr photos
// --------------------------------------------------

async function loadGallery() {

    gallery.innerHTML =
        "<div class='loading'>Loading Flickr photos...</div>";

    if (!albumID) {

        gallery.innerHTML =
            "<div class='loading'>No album specified.</div>";

        return;

    }

    try {

        photos =
            await getAlbumPhotos(albumID);

        gallery.innerHTML = "";

        photos.forEach(
            function(photo, index) {

                const image =
                    photo.url_l ||
                    photo.url_c ||
                    photo.url_o;

                const title =
                    photo.title || "";

                const caption =
                    photo.description?._content || "";

                const card =
                    document.createElement("div");

                card.className = "photo";

                card.innerHTML = `

                    <img
                        src="${image}"
                        alt="${title}"
                        loading="lazy">

                    <div class="caption">

                        <h3>${title}</h3>

                        <p>${caption}</p>

                    </div>

                `;

                card.addEventListener(
                    "click",
                    function() {

                        openLightbox(index);

                    }
                );

                gallery.appendChild(card);

            }
        );

        console.log(
            `Loaded ${photos.length} Flickr photos.`
        );

    }

    catch (error) {

        console.error(error);

        gallery.innerHTML =
            `<div class="loading">
                Unable to load Flickr gallery.
             </div>`;

    }

}


loadGallery();

