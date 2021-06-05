document.addEventListener('DOMContentLoaded', () => {
  const bird = document.querySelector('.bird')
  const gameDisplay = document.querySelector('.game-container')
  const ground = document.querySelector('.ground')
  const scoreview = document.querySelector('.scoreview')

  let birdLeft = 220
  let birdBottom = 100
  let gravity = 2
  let isGameOver = false
  let gap = 430
  let score = 0
  let gameTimerId
  let isClicked = false

  function startGame() {
    birdBottom -= gravity
    bird.style.bottom = birdBottom + 'px'
    bird.style.left = birdLeft + 'px'
  }


  function control(e) {
    if (e.key === "ArrowUp") {
      jump()
    }
  }

  function jump() {
    if (birdBottom < 500) {
      birdBottom += 50
    }
    bird.style.bottom = birdBottom + 'px'
  }



  function generateObstacle() {
    let obstacleLeft = 500
    let randomHeight = Math.random() * 60
    let obstacleBottom = randomHeight
    const obstacle = document.createElement('div')
    const topObstacle = document.createElement('div')
    if (!isGameOver) {
      obstacle.classList.add('obstacle')
      topObstacle.classList.add('topObstacle')
    }
    gameDisplay.appendChild(obstacle)
    gameDisplay.appendChild(topObstacle)
    obstacle.style.left = obstacleLeft + 'px'
    obstacle.style.bottom = obstacleBottom + 'px'
    topObstacle.style.left = obstacleLeft + 'px'
    topObstacle.style.bottom = obstacleBottom + gap + 'px'

    function moveObstacle() {
      obstacleLeft -= 2
      obstacle.style.left = obstacleLeft + 'px'
      topObstacle.style.left = obstacleLeft + 'px'
      if (obstacleLeft === 158) {
        score++
      }
      if (obstacleLeft === -60) {
        clearInterval(timerId)
        gameDisplay.removeChild(obstacle)
        gameDisplay.removeChild(topObstacle)
      }
      if (
        obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
        (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200) ||
        birdBottom === 0
      ) {
        gameOver()
        clearInterval(timerId)
      }
    }
    let timerId = setInterval(moveObstacle, 20)
    if (!isGameOver) setTimeout(generateObstacle, 3000)
  }


  function gameOver() {
    clearInterval(gameTimerId)
    console.log('game over', score)
    isGameOver = true
    scoreview.innerHTML = score
    document.removeEventListener('keyup', control)
  }

  function start() {
    gameTimerId = setInterval(startGame, 20)
    document.addEventListener('keyup', control)
    generateObstacle()
  }

  //button
  /* document.getElementById("clickMe").onclick = function () {
    scoreview.innerHTML = ""
    birdLeft = 220
    birdBottom = 100
    isGameOver = false
    if (isGameOver && isClicked) {
      document.location.reload()
      isGameOver = false
      start()
    }
    else if (!isGameOver && isClicked) {
      console.log('')
    }
    else if (!isGameOver && !isClicked) {
      start()
      isClicked = true
    }
  } */

  start()
})