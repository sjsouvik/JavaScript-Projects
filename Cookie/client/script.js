function setPreferences(e) {
  e.preventDefault();

  const preferences = document.getElementById("preferences").value;
  setCookie("userPreferences", preferences, 1); // Cookie expires in 1 hour

  displayRecommendations(preferences);

  // Hide preferences form and show recommendations container
  document.getElementById("preferences-container").style.display = "none";
  document.getElementById("recommendations-container").style.display = "block";
}

function displayRecommendationsOnLoad() {
  const preferences = getCookieValue("userPreferences");

  if (preferences) {
    // Display personalized recommendations based on stored preferences in the cookie
    displayRecommendations(preferences);

    // Hide preferences form and show recommendations container
    document.getElementById("preferences-container").style.display = "none";
    document.getElementById("recommendations-container").style.display =
      "block";
  }
}

function displayRecommendations(preferences) {
  const recommendations = getRecommendations(preferences);
  document.getElementById("recommendations").textContent = recommendations;
}

function getRecommendations(preferences) {
  switch (preferences) {
    case "movies":
      return "Check out the latest movies in theaters!";
    case "books":
      return "Explore these must-read books!";
    case "music":
      return "Listen to these trending music albums!";
    default:
      return "No recommendations available.";
  }
}

function getCookieValue(name) {
  const cookies = document.cookie.replaceAll(" ", "").split(";");

  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");

    if (key === name) {
      return value;
    }
  }

  return null;
}

function setCookie(name, value, hours) {
  let expiryTime = "";

  if (hours) {
    const date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    expiryTime = date.toUTCString();
  }

  document.cookie = `${name}=${value}; expires=${expiryTime}; path=/`;
}

async function logoutUser() {
  // this is how we can clear any cookie at the client side
  eraseCookie("userPreferences");

  // a better way to clear data from all the web storages at once from the server side
  // await fetch("http://localhost:3000/logout");

  // Show preferences form and hide recommendations container
  document.getElementById("preferences-container").style.display = "block";
  document.getElementById("recommendations-container").style.display = "none";
}

function eraseCookie(name) {
  document.cookie = `${name}=; Max-Age=-99999999;`;
}

window.addEventListener("load", displayRecommendationsOnLoad);

const logOutBtn = document.querySelector("#logout-btn");
const setPreferenceBtn = document.getElementById("set-preference-btn");
const preferencesForm = document.getElementById("preferences-form");

logOutBtn.addEventListener("click", logoutUser);
preferencesForm.addEventListener("submit", setPreferences);
