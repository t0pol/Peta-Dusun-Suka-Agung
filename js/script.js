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
setInterval(getCuaca, 300000); // Auto-update 5 menit

// --- 2. LIGHTBOX ZOOM (PETA & GALERI) ---
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

// Pilih Peta DAN Galeri agar bisa dizoom
var images = document.querySelectorAll(".peta-image, .gallery-img");

images.forEach(function(img) {
    img.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    }
});

// Tombol Close
var span = document.getElementsByClassName("close")[0];
if(span) {
    span.onclick = function() { 
      modal.style.display = "none";
    }
}

// Klik area hitam = tutup
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}