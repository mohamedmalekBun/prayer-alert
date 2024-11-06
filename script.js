const city = "6 of October";
const country = "EG";
const state = "Giza";
const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
  city
)}&country=${country}&state=${state}&method=5`;
let prayTimes = [];
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
    prayTimes = {
      Fajr: data.data.timings.Fajr,
      Dhuhr: data.data.timings.Dhuhr,
      Asr: data.data.timings.Asr,
      Maghrib: data.data.timings.Maghrib,
      Isha: data.data.timings.Isha,
    };
    document.getElementById("fajr").textContent = prayTimes.Fajr;
    document.getElementById("dhuhr").textContent = prayTimes.Dhuhr;
    document.getElementById("asr").textContent = prayTimes.Asr;
    document.getElementById("maghrib").textContent = prayTimes.Maghrib;
    document.getElementById("isha").textContent = prayTimes.Isha;
    alertForPrayTimes();
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

const alertForPrayTimes = () => {
  let timesArray = Object.values(prayTimes);
  for (let i = 0; i < timesArray.length; i++) {
    if (timesArray[i].replace(":", "") - time.replace(":", "") < 30) {
      alert(`الصلاة القادمة بعد نصف ساعة`);
    }
  }
};
getPrayerTimes();
setInterval(alertForPrayTimes, 60000);
setInterval(getPrayerTimes, 600000);
