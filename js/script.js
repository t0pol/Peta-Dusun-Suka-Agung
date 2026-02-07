// --- 1. CUACA REAL-TIME ---
async function getCuaca() {
    const lat = -5.571917;
    const lon = 105.229417;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m&timezone=auto`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        document.getElementById('suhu').innerText = `${data.current.temperature_2m}°C`;
        document.getElementById('kelembaban').innerText = `Kelembaban: ${data.current.relative_humidity_2m}%`;
    } catch (error) {
        console.error("Gagal ambil cuaca:", error);
    }
}
getCuaca();
setInterval(getCuaca, 300000); 

// --- 2. LOGIKA LIGHTBOX & SLIDESHOW ---
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
var prevBtn = document.querySelector(".prev");
var nextBtn = document.querySelector(".next");

var galleryImages = document.querySelectorAll(".gallery-img");
var currentIndex = 0;

galleryImages.forEach(function(img, index) {
    img.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
        currentIndex = index;
        prevBtn.classList.remove("hide-nav");
        nextBtn.classList.remove("hide-nav");
    }
});

var petaImg = document.querySelector(".peta-image");
if(petaImg) {
    petaImg.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
        prevBtn.classList.add("hide-nav");
        nextBtn.classList.add("hide-nav");
    }
}

function gantiSlide(n) {
    currentIndex += n;
    if (currentIndex >= galleryImages.length) currentIndex = 0;
    else if (currentIndex < 0) currentIndex = galleryImages.length - 1;

    var nextImg = galleryImages[currentIndex];
    modalImg.src = nextImg.src;
    captionText.innerHTML = nextImg.alt;
    
    modalImg.style.opacity = 0;
    setTimeout(function(){ modalImg.style.opacity = 1; }, 100);
}

var span = document.getElementsByClassName("close")[0];
span.onclick = function() { modal.style.display = "none"; }

window.onclick = function(event) {
    if (event.target == modal) modal.style.display = "none";
}

document.addEventListener('keydown', function(event) {
    if (modal.style.display === "block") {
        if (event.key === "ArrowLeft" && !prevBtn.classList.contains("hide-nav")) gantiSlide(-1);
        else if (event.key === "ArrowRight" && !nextBtn.classList.contains("hide-nav")) gantiSlide(1);
        else if (event.key === "Escape") modal.style.display = "none";
    }
});
