function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

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

// Check if the page was opened via the QR code
window.addEventListener("load", () => {
  const source = getQueryParam("source");
  if (source === "qr") {
    triggerWebhook(); // Trigger the webhook only if source=qr
  } else {
    console.log("Page was not opened via QR code. Webhook not triggered.");
  }
});
