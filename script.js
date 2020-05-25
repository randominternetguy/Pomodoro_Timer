const changeTimeButtons = document.querySelectorAll('.change-time');
const sessionTime = document.querySelector('#session-time');
const restTime = document.querySelector('#rest-time');

// rest buttons
const restStartButton = document.querySelector('#start-rest');
const restResetButton = document.querySelector('#reset-rest')
const restPauseButton = document.querySelector('#pause-rest')

// session buttons
const sessionStartButton = document.querySelector('#start-session');
const sessionResetButton = document.querySelector('#reset-session');
const sessionPauseButton = document.querySelector('#pause-session');

let sessionIsRunning = false;
let restIsRunning = false;
let sessionPaused = false;
let sessionReset = false;
let restPaused = false;
let restReset = false;

const startPomodoro = (pomodoroType) => {
  if (pomodoroType == 'session'){
    let time = sessionTime.textContent.split(':');
    let sessionInMinutes = parseInt(time[0]);
    let sessionInSeconds = sessionInMinutes * 60;
    sessionIsRunning = true
    let interval = setInterval(() => {
      if (!sessionPaused){
        sessionInSeconds--;
        sessionTime.textContent = `${Math.floor(sessionInSeconds / 60)}:${sessionInSeconds % 60}`;
        if (sessionInSeconds == 0){
          sessionTime.textContent = '0:0';
          alert('Finished');
          sessionIsRunning = false;
          clearInterval(interval);
        }
      }
      else if (sessionReset){
        sessionTime.textContent = '25:00';
        sessionReset = false;
        sessionIsRunning = false;
        sessionPauseButton.textContent = 'Pause';
        sessionPaused = false;
        clearInterval(interval);
      }
    }, 1000);
  }
  else {
    let time = restTime.textContent.split(':');
    let restInMinutes = parseInt(time[0]);
    let restInSeconds = restInMinutes * 60;
    restIsRunning = true
    let interval = setInterval(() => {
      if (!restPaused){
        restInSeconds--;
        restTime.textContent = `${Math.floor(restInSeconds / 60)}:${restInSeconds % 60}`;
        if (restInSeconds == 0){
          restTime.textContent = '0:0';
          alert('Finished');
          restIsRunning = false;
          clearInterval(interval);
        }
      }
      else if (restReset){
        restTime.textContent = '5:00';
        restReset = false;
        restIsRunning = false;
        restPauseButton.textContent = 'Pause';
        restPaused = false;
        clearInterval(interval);
      }
    }, 1000);
  }
}


// event listeners for the buttons

sessionStartButton.addEventListener('click', () => {
  if (!sessionIsRunning && !restIsRunning){
    startPomodoro('session')
  }
  else {
    return;
  }
});

sessionPauseButton.addEventListener('click', () => {
  if (sessionIsRunning){
    if (sessionPaused){
      sessionPaused = false;
      sessionPauseButton.textContent = 'Pause';
    }
    else {
      sessionPaused = true;
      sessionPauseButton.textContent = 'Resume';
    }
  }
  else {
    return;
  }
});

sessionResetButton.addEventListener('click', () => {
  if (sessionIsRunning && sessionPaused){
    sessionReset = true
  }
});

restStartButton.addEventListener('click', () => {
  if (!restIsRunning && !sessionIsRunning){
    startPomodoro('rest');
  }
  else {
    return;
  }
});

restPauseButton.addEventListener('click', () => {
  if (restIsRunning){
    if (restPaused){
      restPaused = false;
      restPauseButton.textContent = 'Pause';
    }
    else {
      restPaused = true;
      restPauseButton.textContent = 'Resume';
    }
  }
  else {
    return;
  }
});

restResetButton.addEventListener('click', () => {
  if (restIsRunning && restPaused){
    restReset = true
  }
});


// adding and reducing the rest and session timings.
changeTimeButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.parentNode.id == 'session'){
      if (sessionIsRunning){
        return;
      }
      else {
        let sessionDuration = sessionTime.textContent.split(':');
        if (button.textContent == '+'){
          sessionDuration[0]++;
        }
        else {
          sessionDuration[0]--;
        }
        sessionTime.textContent = sessionDuration.join(':');
      }
    }
    else {
      if (restIsRunning){
        return;
      }
      else {
        let restDuration = restTime.textContent.split(':');
        if (button.textContent == '+'){
          restDuration[0]++;
        }
        else {
          restDuration[0]--;
        }
        restTime.textContent = restDuration.join(':');
      }
    }
  })
})