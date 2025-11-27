// Luodaan kalenteri
const calendar = document.getElementById("calendar");
const doorCount = 24;
const placedDoors = [];

// Kirjoitetaan jokaiselle päivälle oma sisältönsä
const doorContents = [
    "🎄 Tonttu", "🍪 Piparkakku", "☕ Glögi", "❄️ Lumiukko", "🕯️ Kynttilä",
    "🌲 Kuusi", "🦌 Poro", "🎁 Lahja", "⭐ Tähti", "🛷 Kelkkailu",
    "🍫 Suklaa", "🧦 Sukka", "🌟 Koriste", "❄️Lumisade", "🧸 Pehmolelu",
    "🍎 Omena", "🥧 Piirakka", "🕊️ Rauha", "🎶 Joululaulu", "⛄ Lumiukko",
    "🛍️ Lahjakauppa", "📝 Lahjalista", "🎨 Askartelu", "🎅 Joulupukki"
];

// Testipäivä:
const currentDay = 17;

//Käytä näin kun testaukselle ei ole enää tarvetta.
const today = new Date();
//const currentDay = today.getDate();
//

//Luodaan luukut 1-24
for (let day = 1; day <= doorCount; day++) {
    const door = document.createElement("div");
    door.className = "door";

    // Lukittu vai ei
    if (day > currentDay) {
        door.textContent = "🔒";
        door.classList.add("locked");
    } else {
        door.textContent = day;
    }


    // Klikkaustapahtumat äänillä
    const openChime = new Audio("chime.mp3");
    const closeChime = new Audio("chime2.mp3")

    // Jos lukossa, popup kurkkimisesta
    door.addEventListener("click", () => {
        if (door.classList.contains("locked")) {
            alert("Ei kurkita!");
            return;
        }

        //Vaihdetaan auki/kiinni
        door.classList.toggle("open");

        //Jos auki, soitetaan ääni ja näytetään sisältö
        if (door.classList.contains("open")) {
            openChime.currentTime = 0;
            openChime.play().catch()
            door.textContent = doorContents[day - 1];
        // Suljetaan, soitetaan ääni ja palautetaan päi
        } else {
            closeChime.currentTime = 0;
            closeChime.play().catch()
            door.textContent = day;
        }
    });

    // Lisää luukku kalenteriin
    calendar.appendChild(door);
}

// Joulumusiikkisoitin
const music = new Audio("joulumusiikki.mp3");
music.loop = true; // Musiikki toistuu jatkuvasti

const playBtn = document.getElementById("playMusic");

//Play/pause klikatessa
playBtn.addEventListener("click", () => {
    if (music.paused) {
        music.play().catch(() => {
            console.log("Selain estää automaattisen toiston. Klikkaa uudelleen.");
        });
        playBtn.textContent = "⏸"; // Vaihdetaan pause-symboli
    } else {
        music.pause();
        playBtn.textContent = "♫"; // Palautetaan play-symboli
    }
});

// Lukittujen luukkujen klikkaus popup
door.addEventListener("click", () => {
    if (door.classList.contains("locked")) {
        alert("Tämä luukku avautuu myöhemmin!");
        return;
    }
});

