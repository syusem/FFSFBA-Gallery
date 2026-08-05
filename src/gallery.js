async function loadGallery() {

    const gallery = document.getElementById("gallery-grid");

    gallery.innerHTML = "<div class='loading'>Loading photos...</div>";

    const response = await fetch("data/calgary.json");

    const photos = await response.json();

    gallery.innerHTML = "";

    for (const p of photos) {

        const card = document.createElement("div");
        card.className = "photo";

        card.innerHTML = `
            <img src="${p.thumbnail}" alt="${p.title}">
            <div class="caption">
                <h3>${p.title}</h3>
                <p>${p.caption}</p>
            </div>
        `;

        gallery.appendChild(card);
    }

    console.log(`Loaded ${photos.length} photos`);
}

loadGallery();



