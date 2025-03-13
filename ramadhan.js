document.addEventListener("DOMContentLoaded", () => {
    const niatPuasa = document.getElementById("niatPuasa");
    const recipeList = document.getElementById("recipeList");

    // Niat Puasa
    niatPuasa.innerHTML = `
        <h3>Niat Puasa Ramadhan</h3>
        <p class="arabic">نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ رَمَضَانَ هَذَا السَّنَةِ لِلَّهِ تَعَالَى</p>
        <p class="translation">"Aku berniat puasa esok hari untuk menunaikan kewajiban bulan Ramadhan tahun ini kerana Allah Ta'ala."</p>
    `;

    // Senarai 30 Resipi
    const recipes = [
        "Nasi Briyani", "Ayam Percik", "Murtabak", "Bubur Lambuk", "Kurma Smoothie",
        "Ikan Bakar", "Sambal Udang", "Lemang", "Ketupat", "Serunding", "Kuih Lapis",
        "Kuih Cara", "Sup Kambing", "Roti John", "Teh Tarik", "Mee Goreng Mamak",
        "Puding Caramel", "Kari Daging", "Sayur Campur", "Nasi Minyak", "Sambal Sotong",
        "Kuih Talam", "Laksa Johor", "Pulut Mangga", "Air Bandung", "Agar-Agar Sirap",
        "Ayam Masak Merah", "Rendang Daging", "Tauhu Sumbat", "Char Kuey Teow"
    ];

    recipes.forEach(recipe => {
        let div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `<p>${recipe}</p>`;
        recipeList.appendChild(div);
    });
});
