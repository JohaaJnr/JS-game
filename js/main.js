const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');
const scoreboard = {
  player: 0,
  computer: 0,
  draw: 0
};

// Play game
function play(e) {
  restart.style.display = 'inline-block';
  const playerChoice = e.target.id;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);
  showWinner(winner, computerChoice);
}

// Get computers choice
function getComputerChoice() {
  const rand = Math.random();
  if (rand < 0.34) {
    return 'rock';
  } else if (rand <= 0.67) {
    return 'paper';
  } else {
    return 'scissors';
  }
}

// Get game winner
function getWinner(p, c) {
  if (p === c) {
    return 'draw';
  } else if (p === 'rock') {
    if (c === 'paper') {
      return 'computer';
    } else {
      return 'player';
    }
  } else if (p === 'paper') {
    if (c === 'scissors') {
      return 'computer';
    } else {
      return 'player';
    }
  } else if (p === 'scissors') {
    if (c === 'rock') {
      return 'computer';
    } else {
      return 'player';
    }
  }
}

function showWinner(winner, computerChoice) {
  if (winner === 'player') {
    // Inc player score
    scoreboard.player++;
    // Show modal result
    result.innerHTML = `
      <h1 class="text-win">জিতছেন ভাই </h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>কম্পিউটার নিয়েছে <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}</strong></p>
    `;
  } else if (winner === 'computer') {
    // Inc computer score
    scoreboard.computer++;
    // Show modal result
    result.innerHTML = `
      <h1 class="text-lose">ঠকছেন ভাই </h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>কম্পিউটার নিয়েছে <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}</strong></p>
    `;
  } else {
scoreboard.draw++;
    result.innerHTML = `
      <h1>ড্র </h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p> <strong>হইলোনা ভাই</strong></p>
        <p>আবার খেলি চলেন... </p>
    `;
  }
  // Show score
  score.innerHTML = `
    <p>আপনি: ${scoreboard.player}</p>
    <p>'ড্র' কাউন্টার: ${scoreboard.draw}</p>
    <p>কম্পিউটার: ${scoreboard.computer}</p>
    `;

  modal.style.display = 'block';
}

// Restart game
function restartGame() {
  scoreboard.player = 0;
  scoreboard.draw = 0;
  scoreboard.computer = 0;
  score.innerHTML = `
    <p>আপনি: ${scoreboard.player}</p>
    <p>'ড্র' কাউন্টার: ${scoreboard.draw}</p>
    <p>কম্পিউটার: ${scoreboard.computer}</p>
  `;
}

// Clear modal
function clearModal(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

// Event listeners
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);
