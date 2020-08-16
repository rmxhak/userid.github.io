const titleName = document.querySelector("h1");


const blue = "blue";


function handleName(){
    const inspection = titleName.classList.contains(blue)
    if(!inspection){
        titleName.classList.add(blue)
    } else{
        titleName.classList.remove(blue)
    }
}

function init(){
    titleName.addEventListener("mouseenter", handleName);
    setInterval(handleName, 3000)
}

init();