window.addEventListener("load", main);

ul = document.getElementById("my-ul");

async function main() {
  const years = [2020, 2021, 2022, 2023, 2024];
  const allDays = await getDaysLastFiveYears(years);
  const midSummerDays = await filterMidsummerDays(allDays);

  midSummerDays.forEach((element) => {
    appendLi(element);
  });
}

async function getDaysLastFiveYears(years) {
  const allDays = [];

  if (Array.isArray(years)) {
    for (const year of years) {
      let apiLink = `https://sholiday.faboul.se/dagar/v2.1/${year}`;
      const response = await fetch(apiLink);
      const data = await response.json();
      allDays.push(...data.dagar);
    }
  }
  return allDays;
}

async function filterMidsummerDays(days) {
  const midSummerDays = [];
  days.forEach((element) => {
    if (element["helgdag"] === "Midsommarafton") {
      midSummerDays.push(element);
    }
  });
  return midSummerDays;
}

function appendLi(day) {
  li = document.createElement("li");
  li.innerHTML = `${day["datum"]} - ${day["veckodag"]} - ${day["helgdag"]}`;
  ul.appendChild(li);
}
