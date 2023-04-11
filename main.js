//reload page when click on header
document.querySelector("header h1").addEventListener('click', _=> location.reload());

/**
 * @breif readTask - read task from input field
 * @returns {String} Task
 */
const readTaskName = _ => {
    let task = document.querySelector(".input").value;

    //clear input field
    document.querySelector(".input").value = "";

    document.querySelector(".input").focus();

    return task;
};

/**
 * @breif createTask - Create task div
 * @param {String} taskName 
 * @returns div contains this task
 */
const createTask = taskName => {
    let taskDiv = document.createElement('div');
    taskDiv.className = "task";
    taskDiv.innerHTML = `
    <p class="task-name">${taskName}</p>
    <button class="delete-task">Delete</button>
    `;

    return taskDiv;
};

// let taskList = Array();

/**
 * @breif fillTasksDiv - used to add Tasks to tasks-div
 * @param {Array} taskList 
 */
const fillTasksDiv = taskList => {
    let tasksDiv = document.querySelector(".tasks");

    taskList.forEach(taskName => {
        tasksDiv.appendChild(createTask(taskName));
    });
}

/**
 * @breif clearTasksDiv - clear tasks div
 * @param {Function} fn 
 * @returns Function
 */
const clearTasksDiv = fn => taskList => {
    document.querySelector(".tasks").innerHTML = "";
    return fn(taskList);
}

/**
 * @breif updateTasksDiv - update tasks div by clearing it's contnet and add new content
 * @param {Array} taskList 
 */
const updateTasksDiv = taskList => {
    clearTasksDiv(fillTasksDiv)(taskList);
}

/**
 * @breif addTask - read user input and add it to tasks div
 */
const addTask = _ => {
    let taskName = readTaskName();
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    taskList.unshift(taskName);
    localStorage.setItem('taskList', JSON.stringify(taskList));
    updateTasksDiv(taskList);
    console.log(taskName);
    console.table(taskList);
}

//add task event with using add button
document.querySelector(".add").addEventListener('click', addTask);

//add task event with using of enter key press
document.querySelector(".input").addEventListener('keydown', e => {
    if (e.keyCode !== 13)
        return;
    addTask();
});



onload = () => {
    document.querySelector(".input").focus();

    //retrive taskList from localStorage
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];

    if (taskList) {
        updateTasksDiv(taskList)
        console.table(taskList);
    }
    else {
        localStorage.setItem('taskList', JSON.stringify(taskList));
    }
};