window.addEventListener("load", main);

const ul = document.getElementById("my-ul");

async function main() {
  const days = await getDaysForOneYear();
  days.dagar.forEach((element) => {
    if (element["röd dag"] === "Ja") {
      appendLi(element);
    }
  });
}

async function getDaysThisYear() {
  const response = await fetch("http://sholiday.faboul.se/dagar/v2.1/2024");
  const data = await response.json();
  return data;
}

function appendLi(day) {
  li = document.createElement("li");
  li.innerHTML = `${day["datum"]} - ${day["veckodag"]} - ${
    day["helgdag"] ?? "Helg"
  }`;
  ul.appendChild(li);
}
