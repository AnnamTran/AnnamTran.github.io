function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Function to trigger webhook when QR code was scanned
function triggerWebhook() {
  const webhookUrl = "https://tnv-ha.de/api/webhook/-U7ODD4hYj4kTEN6QMzjcrSJn";

  fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to trigger webhook: " + response.statusText);
      }
      console.log("Webhook triggered successfully");
    })
    .catch(error => {
      console.error("Error triggering webhook:", error);
    });
}
//
// Show shared location message
function showMessage(msg) {
  const message = document.getElementById(msg);
  message.style.display = "block"; // Make the message visible
}

// Function to get the user's location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      sendPosition,
      handleError,
      { timeout: 10000 },
      showMessage("message2"),
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

// Function to send the position to the webhook
function sendPosition(position) {
  const base_url = "https://tnv-ha.de/api/webhook/-zQkqfQFT8tFovZqgjuCbigGy+lOc";
  const url = `${base_url}?value1=${position.coords.latitude}&value2=${position.coords.longitude}`;

  fetch(url, { method: "POST", mode: "no-cors" })
    .then(() => console.log("Location sent successfully."))
    .catch((err) => console.error("Failed to send location:", err));
}

// Function to handle geolocation errors
function handleError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    default:
      console.log("An unknown error occurred.");
      break;
  }
}

// Check if the page was opened via the QR code
window.addEventListener("load", () => {
  const source = getQueryParam("source");
  if (source === "qr") {
    triggerWebhook(); // Trigger the webhook only if source=qr
    var btn = document.getElementById("locbutton");
    btn.style.display = 'block';
    showMessage("message");
  } else {
    console.log("Page was not opened via QR code. Webhook not triggered.");
  }
});


window.addEventListener("load", () => {
  const source = getQueryParam("source");
  if (source === "qr") {
    triggerWebhook(); // Trigger the webhook only if source=qr
    var btn = document.getElementById("locbutton");
    btn.style.display = 'block';
    document.getElementById("message").style.display = "block";
  } else {
    console.log("Page was not opened via QR code. Webhook not triggered.");
  }
});


// Disable links to main page and other pages
document.addEventListener("DOMContentLoaded", () => {
  // Check the current page URL
  const currentPage = window.location.pathname;

  // Specify the page where elements should be hidden
  if (currentPage === "/lost/") { // Replace with your actual page path
    // Hide the navigation links
    const nav = document.querySelector("header.masthead nav");
    if (nav) {
      nav.style.display = "none";
    }

    // Hide the site avatar
    const siteAvatar = document.querySelector(".site-avatar");
    // Disable the site avatar link
    if (siteAvatar) {
      siteAvatar.style.pointerEvents = "none"; // Prevent clicks
    }

    // Hide the site name
    const siteName = document.querySelector(".site-name");
    if (siteName) {
      siteName.style.pointerEvents = "none"; // Prevent clicks
    }

    // Hide the site description
    const siteDesc = document.querySelector(".site-description");
    if (siteDesc) {
      siteDesc.style.display = "none";
    }
  }
});
