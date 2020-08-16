const today = document.querySelector(".js-today");




function loadToday(){
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    today.innerText = `${year}년 . ${month}월 . ${day}일`
}


function init(){
    loadToday();
    setInterval(loadToday, 1000);
}


init();