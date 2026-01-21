// --- Карта ---
const map = L.map("map", { zoomControl: true });

// OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

// --- UI елементи ---
const placeTitle = document.getElementById("placeTitle");
const placeText = document.getElementById("placeText");
const placeImg = document.getElementById("placeImg");
const placeCoords = document.getElementById("placeCoords");
const panelContent = document.getElementById("panelContent"); // за анимацията

// --- Твоите места ---
const places = [
    {
        title: "Първи sleepover 💕",
        text: "Първият ни sleepover, който никога няма да забравя.",
        lat: 43.85590616926791,
        lng: 25.967124919781302,
        img: "img/първи sleepover.jpg"
    },
    {
        title: "У Вас 💗",
        text: "У Вас – вторият ми дом.",
        lat: 43.8512314584379,
        lng: 25.974651897908114,
        img: "img/в вас втория ми дом.jpg"
    },
    {
        title: "Първи дейт ❄️",
        text: "Първия ни дейт на ледената пързалка.",
        lat: 43.848216261648474,
        lng: 25.955795984265972,
        img: "img/първия ни дейт на ледената пързалка.jpg"
    },
    {
        title: "Нова година 🎆",
        text: "Първата ни нова година заедно.",
        lat: 43.848018429875516,
        lng: 25.954144497120737,
        img: "img/нова година.jpg"
    },
    {
        title: "Кафе ☕",
        text: "На кафе заедно – просто ние.",
        lat: 43.843859620726505,
        lng: 25.948365169153107,
        img: "img/на кафе заедно.jpg"
    },
    {
        title: "Virgo 🕺",
        text: "Една от най-незабравимите ми дискотеки.",
        lat: 43.85609973114616,
        lng: 25.98132996166169,
        // ако го преименуваш без интервала, промени и тук
        img: "img/на вирго една от най не забравимите ми дискотеки .jpg"
    },
    {
        title: "Чила 😅",
        text: "Тук сме на чила с онази досадна тиква.",
        lat: 43.85538484711334,
        lng: 25.969572216857962,
        img: "img/тук сме на чила с онази досадна тиква.jpg"
    },
    {
        title: "Само ние двамата 💑",
        text: "Първата ни среща само двамата.",
        lat: 43.855417667145,
        lng: 25.96910497116199,
        img: "img/тук за първи път излязохме на среща само двамата.jpg"
    },
    {
        title: "Сняг ❄️",
        text: "Един много забавен ден в снега.",
        lat: 43.800834558888,
        lng: 25.916077906068395,
        img: "img/един много забавен ден в снега.jpg"
    },
    {
        title: "Не много яка вечер 🙃",
        text: "Не беше много яка вечер, но снимката ме кефи.",
        lat: 43.85042511295755,
        lng: 25.95833872837168,
        img: "img/това не беше много яка вечер но снимката ме кефи.jpg"
    },
    {
        title: "Първата целувка 💋",
        text: "Тук ни беше първата целувка – незабравима и уникална.",
        lat: 43.84810794301901,
        lng: 25.948153241409045,
        img: "img/тук ни беше първата целувка която беше незабравима и уникална.png"
    }
];

// ✅ showPlace с плавна анимация (fade out -> update -> fade in)
function showPlace(p) {
    // ако нямаш panelContent (ако не си сменил HTML), просто показва без анимация
    if (!panelContent) {
        placeTitle.textContent = p.title;
        placeText.textContent = p.text;
        placeCoords.textContent = `${p.lat.toFixed(6)}, ${p.lng.toFixed(6)}`;

        if (p.img) {
            placeImg.src = encodeURI(p.img);
            placeImg.alt = p.title;
            placeImg.hidden = false;
        } else {
            placeImg.hidden = true;
            placeImg.removeAttribute("src");
        }
        return;
    }

    // 1) fade out
    panelContent.classList.remove("fadeIn");
    panelContent.classList.add("fadeOut");

    // 2) след малко сменяме съдържанието и fade in
    setTimeout(() => {
        placeTitle.textContent = p.title;
        placeText.textContent = p.text;
        placeCoords.textContent = `${p.lat.toFixed(6)}, ${p.lng.toFixed(6)}`;

        if (p.img) {
            placeImg.src = encodeURI(p.img);
            placeImg.alt = p.title;
            placeImg.hidden = false;
        } else {
            placeImg.hidden = true;
            placeImg.removeAttribute("src");
        }

        panelContent.classList.remove("fadeOut");
        panelContent.classList.add("fadeIn");
    }, 180);
}

// --- Маркери + bounds ---
const group = L.featureGroup();

places.forEach(p => {
    const marker = L.marker([p.lat, p.lng]).addTo(map);
    marker.on("click", () => showPlace(p));
    group.addLayer(marker);
});

// Центриране/зуум според всички точки
map.fitBounds(group.getBounds().pad(0.2));

// Показваме първото място (по желание)
showPlace(places[0]);
