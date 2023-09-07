document.addEventListener("DOMContentLoaded", () => {
  const drawButton = document.getElementById("draw-button");
  const drawResult = document.getElementById("draw-result");
  const prizesList = document.getElementById("prizes-list");
  const mobileNumberInput = document.getElementById("mobile-number");

  // Function to hide the loading message and display an error message
  function showError(message) {
    drawResult.innerText = `Error: ${message}`;
  }

  // Event listener for the lucky draw button click
  drawButton.addEventListener("click", async () => {
    const mobileNumber = mobileNumberInput.value;
    // Perform an API request to initiate the lucky draw, including the mobileNumber in the request body
    try {
      const response = await fetch("/luckydraw/draw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobileNumber }),
      });

      if (!response.ok) {
        throw new Error("Error starting the draw.");
      }

      const result = await response.json();

      // Display the draw result
      drawResult.innerText = `Draw Result: ${result.message}`;
    } catch (error) {
      console.error(error);
      showError("An error occurred.");
    }
  });

  // Fetch and display user's redeemed prizes
  fetchPrizes();
});

// Function to fetch and display user's redeemed prizes
async function fetchPrizes() {
  try {
    const response = await fetch("/luckydraw/redeem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching prizes.");
    }

    const prizes = await response.json();

    // Display user's prizes in the list
    if (prizes.length === 0) {
      prizesList.innerHTML = "No prizes redeemed yet.";
    } else {
      prizesList.innerHTML = prizes
        .map((prize) => `<li>${prize.name}</li>`)
        .join("");
    }
  } catch (error) {
    console.error(error);
    showError("An error occurred.");
  }
}

// Fetch and display user's prizes on page load
fetchPrizes();
