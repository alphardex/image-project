import "./style.css";

import Experience from "./Experience/Experience";

import img1 from "/textures/1.jpg";
import img2 from "/textures/2.jpg";
import img3 from "/textures/3.jpg";
import img4 from "/textures/4.jpg";
import img5 from "/textures/5.jpg";

document.querySelector("#app").innerHTML = `
<div id="sketch"></div>
<div class="loader-screen">
    <div class="loading-container">
        <div class="loading">
            <span style="--i: 0">L</span>
            <span style="--i: 1">O</span>
            <span style="--i: 2">A</span>
            <span style="--i: 3">D</span>
            <span style="--i: 4">I</span>
            <span style="--i: 5">N</span>
            <span style="--i: 6">G</span>
        </div>
    </div>
</div>
<div class="gallery">
    <img class="gallery-item" src="${img1}" crossorigin="anonymous" alt="" />
    <img class="gallery-item" src="${img2}" crossorigin="anonymous" alt="" />
    <img class="gallery-item" src="${img3}" crossorigin="anonymous" alt="" />
    <img class="gallery-item" src="${img4}" crossorigin="anonymous" alt="" />
    <img class="gallery-item" src="${img5}" crossorigin="anonymous" alt="" />
</div>
`;

new Experience("#sketch");
