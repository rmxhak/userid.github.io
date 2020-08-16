const clock = document.querySelector("h2");



function getClock(){
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds()
  
  const clockObj = `${
      hours < 10 ? `0${hours}` : hours} : ${
      minutes < 10 ? `0${minutes}` : minutes} : ${
      seconds < 10 ? `0${seconds}` : seconds}`;
  
  clock.innerText = clockObj;
}


function init(){
  getClock();
  setInterval(getClock, 1000)
}

init();
