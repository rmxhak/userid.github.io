const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const firstList = document.querySelector(".js-firstToDo");
const secondList = document.querySelector(".js-secondToDo");

const TODAY = "today";
const TOMORROW = "tomorrow";

let todayTask, tomorrowTask;

function getDefault(text){
    return {
        id: String(Date.now()),
        text
    };
}

function saveState(){
    localStorage.setItem(TODAY, JSON.stringify(todayTask));
    localStorage.setItem(TOMORROW, JSON.stringify(tomorrowTask));

}

function findInFirstTask(taskId){
    return todayTask.find(function(task){
        
        return task.id === taskId;
    })
};
function findInSecondTask(taskId){
    return tomorrowTask.find(function(task){
        return task.id === taskId;
    })
}

function removeTodayTask(taskId){
    todayTask = todayTask.filter(function(task){
        return task.id !== taskId;
    })
    console.log(todayTask)
}
function removeTomorrowTask(taskId){
    tomorrowTask = tomorrowTask.filter(function(task){
        return task.id !== taskId
    })
}

function saveTodayTask(task){
    todayTask.push(task);
    
}
function saveTomorrowTask(task){
    tomorrowTask.push(task)
};

function moveSecondToDo(e){
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    const task = findInFirstTask(li.id);
    removeTodayTask(li.id);
    console.log(todayTask)
    saveTomorrowTask(task);
    handleTomorrowTask(task);
    saveState();
}
function moveFirstToDo(e){
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    const task = findInSecondTask(li.id);
    removeTomorrowTask(li.id);
    saveTodayTask(task);
    handleTodayTask(task);
    saveState();
}

function delteToDo(e){
    const li = e.target.parentNode;
    li.parentNode.removeChild(li);
    removeTomorrowTask(li.id);
    removeTodayTask(li.id);
    saveState();
}
function generic(task){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", delteToDo)
    span.innerText = task.text;
    li.append(span, delBtn);
    li.id = task.id;
    return li;
}

function handleTodayTask(task){
    const genericLi = generic(task);
    const btn = document.createElement("button");
    btn.innerText = "✅";
    btn.addEventListener("click", moveSecondToDo)
    genericLi.append(btn);
    firstList.append(genericLi);
}
function handleTomorrowTask(task){
    const genericLi = generic(task);
    const btn = document.createElement("button");
    btn.innerText = "⏪";
    btn.addEventListener("click", moveFirstToDo);
    genericLi.append(btn);
    secondList.append(genericLi);
}

function handleSubmit(e){
    e.preventDefault();
   const currentValue = getDefault(toDoInput.value);
    toDoInput.value = "";
    handleTodayTask(currentValue);
    saveTodayTask(currentValue);
    saveState();
}

function loadToDo(){
    todayTask = JSON.parse(localStorage.getItem(TODAY)) || [];
    tomorrowTask = JSON.parse(localStorage.getItem(TOMORROW)) || [];

}
function loadState(){
    todayTask.forEach(function(task){
        handleTodayTask(task)
    });
    tomorrowTask.forEach(function(task){
        handleTomorrowTask(task);
    })
}
function init(){
    toDoForm.addEventListener("submit", handleSubmit)
    loadToDo();
    loadState();
}

init();