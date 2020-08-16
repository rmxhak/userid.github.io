const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const pendingList = document.querySelector(".js-first");
const finishedList = document.querySelector(".js-seconds");

const PENDING = 'Pending';
const FINISHED = 'Finished';

let pendingTasks, finishedTasks;

function getTaskObject(text){
  return {
    id: String(Date.now()),
    text
  }
}
function savePendingTask(task){
  pendingTasks.push(task);
}

function findInFinished(taskId){
  return finishedTasks.find(function(task){
    console.log(taskId)
    console.log(task)
    return task.id === taskId;
  })
}
function findInPending(taskId){
  return pendingTasks.find(function(task){
    return task.id === taskId;
  })
}
function removeFormPending(taskId){
  pendingTasks = pendingTasks.filter(function(task){
    return task.id !== taskId;
  })
}
function removeFormFinished(taskId){
  finishedTasks = finishedTasks.filter(function(task){
    return task.id !== taskId;
  })
}
function addToFinished(task){
  finishedTasks.push(task);
}
function addToPending(task){
  pendingTasks.push(task);
}

function deleteTask(e){
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  removeFormFinished(li.id);
  removeFormPending(li.id);
  saveState();
}

function handleFinishClick(e){
  const li = e.target.parentNode;
  console.log(li)
  li.parentNode.removeChild(li);
  const task = findInPending(li.id);
  
  removeFormPending(li.id);
  addToFinished(task);
  paintFinishedTask(task);
  saveState();
}
function handleBackClick(e){
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInFinished(li.id)
  removeFormFinished(li.id);
  addToPending(task);
  paintPendingTask(task);
  saveState();
}

function buildGenericLi(task){
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");
  span.innerText = task.text;
  deleteBtn.innerText = "❌";
  deleteBtn.addEventListener("click", deleteTask);
  li.append(span, deleteBtn);
  li.id = task.id;
 
  return li;
}
function paintPendingTask(task){
  const genericLi = buildGenericLi(task);
  const completeBtn = document.createElement("button");
  completeBtn.innerText = "✅";
  completeBtn.addEventListener("click", handleFinishClick);
  genericLi.append(completeBtn);
  pendingList.append(genericLi);
}

function paintFinishedTask(task){
  const genericLi = buildGenericLi(task);
  const backBtn = document.createElement("button");
  backBtn.innerText = "⏪";
  backBtn.addEventListener("click", handleBackClick);
  genericLi.append(backBtn);
  finishedList.append(genericLi);
}

function saveState(){
  localStorage.setItem(PENDING, JSON.stringify(pendingTasks));
  localStorage.setItem(FINISHED, JSON.stringify(finishedTasks));
}
function loadState(){
  pendingTasks = JSON.parse(localStorage.getItem(PENDING)) || [];
  finishedTasks = JSON.parse(localStorage.getItem(FINISHED)) || [];
}

function restoreState(){
  pendingTasks.forEach(function(task){
    paintPendingTask(task);
  });
  finishedTasks.forEach(function(task){
    paintFinishedTask(task)
  });
}
function handleSubmit(e){
  e.preventDefault();
  const currentValue = getTaskObject(toDoInput.value);
  toDoInput.value = "";
  paintPendingTask(currentValue);
  savePendingTask(currentValue);
  saveState();
}




function init(){
  toDoForm.addEventListener("submit", handleSubmit)
  loadState();
  restoreState();
}


init();