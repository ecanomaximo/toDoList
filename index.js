const pushInputTask = document.querySelector('.inputTask');
const pushTaskButton = document.querySelector('.taskButton');
const pushTaskList = document.querySelector('.taskList');

function createElementLi() {
    const elementLi = document.createElement('li')
    return elementLi;
}

function showTask(inputText) {
    const elementLi = createElementLi();
    elementLi.innerHTML = inputText;
    pushTaskList.appendChild(elementLi);
    resetInput();
    createButtonDel(elementLi);
    saveTasks();
}

function resetInput() {
    pushInputTask.value = '';
    pushInputTask.focus();
}

function createButtonDel(elementLi) {
    const elementButtonDel = document.createElement('button');
    elementButtonDel.innerHTML = '<img src="./assets/img/trash.png">';
    elementButtonDel.setAttribute('class', 'buttonDeleteTask');
    elementButtonDel.setAttribute('title', 'Delete task');
    elementLi.appendChild(elementButtonDel);
}

function saveTasks() {
    const tasksList = pushTaskList.querySelectorAll('li');
    const arrayOfTasks = [];

    for (let task of tasksList) {
        let taskText = task.innerText;
        taskText = taskText.replace('delete', '').trim();
        arrayOfTasks.push(taskText);
    }

    const taskJSON = JSON.stringify(arrayOfTasks);
    localStorage.setItem('pushTaskList', taskJSON)
}

function addSavedTasks() {
    const savedTasks = localStorage.getItem('pushTaskList');
    const arrayOfTasks = JSON.parse(savedTasks);

    for(let task of arrayOfTasks) {
        showTask(task);
    }
}

pushInputTask.addEventListener('keypress', function(event) {
    if(event.keyCode === 13) {
        if(!pushInputTask.value) return;
        showTask(pushInputTask.value);
    }
});

pushTaskButton.addEventListener('click', function(event) {
    if (!pushInputTask.value) return;
    showTask(pushInputTask.value);
});

document.addEventListener('click', function(event){ 
    const element = event.target;
    if(element.classList.contains('buttonDeleteTask')) {
        element.parentElement.remove();
        saveTasks();
    }
});

addSavedTasks()