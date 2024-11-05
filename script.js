const city = "6 of October";
const country = "EG";
const state = "Giza";
const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${country}&state=${state}&method=5`;

let time;

function logTime() {
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;
  time = formattedTime;
}
setInterval(logTime, 60000);
logTime();

async function getPrayerTimes() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const prayTimes = data.data.timings;

    // Update the HTML with the fetched prayer times
    document.getElementById("fajr").textContent = prayTimes.Fajr;
    document.getElementById("dhuhr").textContent = prayTimes.Dhuhr;
    document.getElementById("asr").textContent = prayTimes.Asr;
    document.getElementById("maghrib").textContent = prayTimes.Maghrib;
    document.getElementById("isha").textContent = prayTimes.Isha;

    console.log("Prayer Times:", prayTimes);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

getPrayerTimes();
