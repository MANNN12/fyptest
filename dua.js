// Fungsi Carian Doa
function searchDua() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let cards = document.getElementsByClassName("dua-card");

    for (let card of cards) {
        let text = card.innerText.toLowerCase();
        card.style.display = text.includes(input) ? "block" : "none";
    }
}

// Fungsi Salin Doa
function copyDua(button) {
    let text = button.getAttribute("data-text");
    navigator.clipboard.writeText(text).then(() => {
        alert("Doa telah disalin!");
    });
}

// Fungsi Kongsi Doa ke WhatsApp
function shareDua(button) {
    let text = button.getAttribute("data-text");
    let whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
}
