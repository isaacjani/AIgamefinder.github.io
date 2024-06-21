const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');

async function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    addMessageToChatBox(message, 'user');
    userInput.value = '';

    const response = await getGameRecommendations(message);
    addMessageToChatBox(response, 'bot');
}

function addMessageToChatBox(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getGameRecommendations(query) {
    const apiUrl = `https://api.rawg.io/api/games?key=c0b700cbe6164396b15010d979d211f1&tags=multiplayer,rts,free`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const games = data.results;

        if (games.length === 0) {
            return 'No games found.';
        }

        let gameList = 'Here are some free games:\n';
        games.forEach((game) => {
            gameList += `\n- ${game.name}`;
        });

        return gameList;
    } catch (error) {
        console.error('Error fetching game data:', error);
        return 'Sorry, something went wrong while fetching game data.';
    }
}