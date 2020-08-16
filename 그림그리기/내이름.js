const nameForm = document.querySelector(".js-nameForm"),
      nameInput = nameForm.querySelector("input"),
      nameSpan = document.querySelector(".js-nameSpan");

const NAME = "name";
const showing = "showing";

function setName(nameValue){
    localStorage.setItem(NAME, nameValue )
    
}
function paintName(text){

    nameSpan.innerText = `Hellow ${text}`;
    nameInput.classList.add(showing);
    setName(text);
}

function handleSubmit(event){
    event.preventDefault();
    const nameValue = nameInput.value;
    if(nameValue !== null){
        paintName(nameValue)
        

    }
}

function loadName(){
   const loadedName = localStorage.getItem(NAME);
   if(loadedName !== null){
       paintName(loadedName)
   }

}

function init(){
    loadName();
    nameForm.addEventListener("submit", handleSubmit)
   

}


init();