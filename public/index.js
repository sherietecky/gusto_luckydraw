document.addEventListener('DOMContentLoaded', () => {
    const drawButton = document.getElementById('draw-button');
    const drawResult = document.getElementById('draw-result');
    const prizesList = document.getElementById('prizes-list');

    drawButton.addEventListener('click', async () => {
        // Perform an API request to initiate the lucky draw
        try {
            const response = await fetch('/lucky-draw/draw', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error starting the draw.');
            }

            const result = await response.json();

            // Display the draw result
            drawResult.innerText = result.message;
        } catch (error) {
            console.error(error);
            drawResult.innerText = 'An error occurred.';
        }
    });

    // Function to fetch and display user's prizes
    async function fetchPrizes() {
        try {
            const response = await fetch('/lucky-draw/redeem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error fetching prizes.');
            }

            const prizes = await response.json();

            // Display user's prizes in the list
            prizesList.innerHTML = prizes.map(prize => `<li>${prize.name}</li>`).join('');
        } catch (error) {
            console.error(error);
            prizesList.innerHTML = 'An error occurred.';
        }
    }

    // Fetch and display user's prizes on page load
    fetchPrizes();
});