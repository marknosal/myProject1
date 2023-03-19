// initial fetch listener
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('formContainer').style.display='none'
  fetchAllGames()
})

//Listener that brings up the form to add a new game
document.getElementById('newGameButton').addEventListener('click', () => {
  document.getElementById('formContainer').style.display='block'
  document.getElementById('pButton').style.display='none'
})
//listener for submitting the newGameForm
document.querySelector('form.addGameForm').addEventListener('submit', submitNewGameForm)

//initial fetch function
function fetchAllGames() {
  fetch('http://localhost:3000/games')
    .then(response => response.json())
    .then(function(data) {
      data.forEach(game => createGame(game))
    })
}

//creates a game
function createGame(game) {
  const newGame = document.createElement('div')
  newGame.className = 'game'
  newGame.id = `game${game.id}`
  document.getElementById('gameList').prepend(newGame)

  const gameName = document.createElement('h2')
  gameName.textContent = game.title
  newGame.appendChild(gameName)

  const gameDev = document.createElement('h3')
  gameDev.textContent = game.developer
  newGame.appendChild(gameDev)

  const gameGenre = document.createElement('h3')
  gameGenre.textContent = game.genre
  newGame.appendChild(gameGenre)

  const gameLogo = document.createElement('img')
  gameLogo.src = game.photo
  gameLogo.className = 'gameLogo'
  gameLogo.addEventListener('mouseover', thickBorder)
  gameLogo.addEventListener('mouseout', thinBorder)
  newGame.appendChild(gameLogo)

  const completionText = document.createElement('h3')
  completionText.textContent = 'Game Unfinished'
  newGame.appendChild(completionText)

  const completeBox = document.createElement('input')
  completeBox.type = 'checkbox'
  completeBox.id = `checkbox${game.id}`
  completeBox.addEventListener('click', checkBox)
  newGame.appendChild(completeBox)
}
/*thickens border when Mouse Over*/
function thickBorder(event) {
  event.relatedTarget.style = 'border-width: 10px';
}
/*thins border when Mouse over*/
function thinBorder (event) {
  event.relatedTarget.style = 'border-width: 1px';
}
//DOM changes when checkbox is clicked
function checkBox(event) {
  if(event.target.checked) {
    const gameBorder = event.target.parentNode
    const message = event.target.previousSibling
    gameBorder.style = 'border-color: green; border-width: 5px;'
    message.style = 'color: green'
    message.textContent = 'Game Complete'
  } else  {
    const gameBorder = event.target.parentNode
    const message = event.target.previousSibling
    gameBorder.style = 'border-color: black; border-width: 1px;'
    message.style = 'color: black'
    message.textContent = 'Game Unfinished'
  }
}
// submits newGameForm
function submitNewGameForm(event) {
  event.preventDefault()
  document.getElementById('formContainer').style.display='none'
  document.getElementById('pButton').style.display='block'
  if (event.target[0].value != '') {
  const gamePost = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      'title': event.target[0].value,
      'developer': event.target[1].value,
      'genre': event.target[2].value,
      'photo': event.target[3].value,
    }),
  }
  //posts server response to DOM
  fetch('http://localhost:3000/games', gamePost)
    .then(response => response.json())
    .then(postedGame => createGame(postedGame))
  }
  //resets addGameForm for a new game post
  document.querySelector('form.addGameForm').reset()
}
