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

function extractGenres(query) {
    const genres = query.match(/multiplayer|rts|strategy|shooter|rpg|action|adventure|RTS|open world|rpg|war|historical/gi);
    return genres ? genres.join(',') : '';
}

function extractTags(query) {
    const tags = query.match(/free|co-op|online|pvp|singleplayer|multiplayer/gi);
    return tags ? tags.join(',') : '';
}

async function getGameRecommendations(query) {
    const genres = extractGenres(query);
    const tags = extractTags(query);
    const apiUrl = `https://api.rawg.io/api/games?key=c0b700cbe6164396b15010d979d211f1&genres=${genres}&tags=${tags}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const games = data.results;

        if (games.length === 0) {
            return 'No games found matching your criteria.';
        }

        let gameList = 'Here are some games matching your criteria:\n';
        games.forEach((game) => {
            gameList += `\n- ${game.name}`;
        });

        return gameList;
    } catch (error) {
        console.error('Error fetching game data:', error);
        return 'Sorry, something went wrong while fetching game data.';
    }
}
