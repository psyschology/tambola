document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('loginBtn');
    const loginDropdown = document.getElementById('loginDropdown');
    const adminLoginPopup = document.getElementById('adminLoginPopup');
    const adminLoginSubmit = document.getElementById('adminLoginSubmit');
    const adminPassword = document.getElementById('adminPassword');
    const startGame = document.getElementById('startGame');
    const stopGame = document.getElementById('stopGame');
    const bookTicket = document.getElementById('bookTicket');
    const ticketNumber = document.getElementById('ticketNumber');
    const ticketOwner = document.getElementById('ticketOwner');
    const dividendName = document.getElementById('dividendName');
    const addDividend = document.getElementById('addDividend');
    const ticketsContainer = document.getElementById('ticketsContainer');
    const housieBoard = document.getElementById('housieBoard');
    const dividends = document.getElementById('adminDividends');
    const running = document.getElementById('running');
    const notRunning = document.getElementById('notRunning');

    // Set initial state
    let isGameRunning = false;
    let tickets = [];
    let dividendsList = [];
    let announcedNumbers = new Set();
    let gameStartTime;
    let gameInterval;
    
    // Toggle login dropdown
    loginBtn.addEventListener('click', function() {
        loginDropdown.classList.toggle('hidden');
    });

    // Handle admin login
    adminLoginSubmit.addEventListener('click', function() {
        const password = adminPassword.value;
        if (password === 'jaybasotia') {
            adminLoginPopup.classList.add('hidden');
            window.location.href = 'admin.html';
        } else {
            alert('Invalid password');
        }
    });

    // Handle game start
    startGame.addEventListener('click', function() {
        if (isGameRunning) {
            alert('Game is already running');
            return;
        }
        isGameRunning = true;
        document.getElementById('notRunning').classList.add('hidden');
        document.getElementById('running').classList.remove('hidden');
        updateHousieBoard();
        startGameTimer();
        updateTicketsDisplay();
    });

    // Handle game stop
    stopGame.addEventListener('click', function() {
        if (!isGameRunning) {
            alert('Game is not running');
            return;
        }
        isGameRunning = false;
        document.getElementById('notRunning').classList.remove('hidden');
        document.getElementById('running').classList.add('hidden');
        stopGameTimer();
        announcedNumbers.clear();
        updateHousieBoard();
    });

    // Handle booking ticket
    bookTicket.addEventListener('click', function() {
        const number = ticketNumber.value;
        const owner = ticketOwner.value;
        if (number && owner) {
            if (!tickets.some(ticket => ticket.number === number)) {
                tickets.push({ number, owner });
                updateTicketsDisplay();
            } else {
                alert('Ticket number already booked.');
            }
        } else {
            alert('Please enter ticket number and owner');
        }
    });

    // Handle dividend addition
    addDividend.addEventListener('click', function() {
        const name = dividendName.value;
        if (name) {
            if (!dividendsList.includes(name)) {
                dividendsList.push(name);
                updateDividendsDisplay();
            } else {
                alert('Dividend already exists.');
            }
        } else {
            alert('Please enter dividend name');
        }
    });

    function updateHousieBoard() {
        // Create a 9x10 housie board
        housieBoard.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            let row = '<tr>';
            for (let j = 1; j <= 10; j++) {
                const number = i * 10 + j;
                const isAnnounced = announcedNumbers.has(number) ? 'bg-yellow-400' : '';
                row += `<td class="border p-2 ${isAnnounced}" data-number="${number}">${number}</td>`;
            }
            row += '</tr>';
            housieBoard.innerHTML += row;
        }
    }

    function startGameTimer() {
        gameStartTime = new Date();
        gameInterval = setInterval(function() {
            const now = new Date();
            const timeLeft = Math.max(0, 60000 - (now - gameStartTime));
            document.getElementById('gameStartTime').textContent = `Time Left: ${Math.ceil(timeLeft / 1000)} seconds`;
        }, 1000);
    }

    function stopGameTimer() {
        clearInterval(gameInterval);
        document.getElementById('gameStartTime').textContent = 'Game Stopped';
    }

    function updateTicketsDisplay() {
        ticketsContainer.innerHTML = '';
        tickets.forEach(ticket => {
            ticketsContainer.innerHTML += `
                <div class="ticket bg-white p-4 shadow-lg rounded" data-number="${ticket.number}">
                    <p>Ticket Number: ${ticket.number}</p>
                    <p>Owner: ${ticket.owner}</p>
                </div>
            `;
        });
    }

    function updateDividendsDisplay() {
        dividends.innerHTML = '';
        dividendsList.forEach(dividend => {
            dividends.innerHTML += `<li>${dividend}</li>`;
        });
    }

    // Mock function to simulate announcing a number
    function announceNumber(number) {
        announcedNumbers.add(number);
        updateHousieBoard();
        // Announce the number with voice (implement using Web Speech API or similar)
    }

    // Example of usage
    if (isGameRunning) {
        announceNumber(Math.floor(Math.random() * 90) + 1);
    }
});
