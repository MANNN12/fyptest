document.addEventListener("DOMContentLoaded", function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPrayerTimes, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function getPrayerTimes(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    // Gunakan API Reverse Geolocation untuk mendapatkan bandar dan negeri
    let locationAPI = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`;

    fetch(locationAPI)
        .then(response => response.json())
        .then(data => {
            let city = data.address.city || data.address.town || data.address.village || "Unknown City";
            let state = data.address.state || "Unknown State";
            document.getElementById("user-location").innerText = `📍 ${city}, ${state}`;
        })
        .catch(error => console.log("Error fetching location:", error));

    // API untuk waktu solat
    let prayerAPI = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`;

    fetch(prayerAPI)
        .then(response => response.json())
        .then(data => {
            let timings = data.data.timings;
            document.getElementById("fajr").innerText = timings.Fajr;
            document.getElementById("dhuhr").innerText = timings.Dhuhr;
            document.getElementById("asr").innerText = timings.Asr;
            document.getElementById("maghrib").innerText = timings.Maghrib;
            document.getElementById("isha").innerText = timings.Isha;
        })
        .catch(error => console.log("Error fetching prayer times:", error));
}

function showError(error) {
    alert("Location access denied! Please allow location access.");
}
