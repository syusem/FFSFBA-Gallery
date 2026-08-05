const gallery=document.getElementById("gallery");

const photos=[

{
title:"Photo One",
caption:"Our first photo",
image:"https://picsum.photos/600/400?1"
},

{
title:"Photo Two",
caption:"Another image",
image:"https://picsum.photos/600/400?2"
},

{
title:"Photo Three",
caption:"Beautiful scenery",
image:"https://picsum.photos/600/400?3"
},

{
title:"Photo Four",
caption:"Travel memories",
image:"https://picsum.photos/600/400?4"
},

{
title:"Photo Five",
caption:"Wonderful trip",
image:"https://picsum.photos/600/400?5"
},

{
title:"Photo Six",
caption:"Friends together",
image:"https://picsum.photos/600/400?6"
}

];

for(const p of photos){

const card=document.createElement("div");

card.className="photo";

card.innerHTML=`

<img src="${p.image}" alt="${p.title}">

<div class="caption">

<strong>${p.title}</strong><br>

${p.caption}

</div>

`;

gallery.appendChild(card);

}



