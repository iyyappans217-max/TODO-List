// Get tasks from Local Storage

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";


// Add Task

function addTask() {

    let input = document.getElementById("taskInput");

    let taskName = input.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    let task = {
        id: Date.now(),
        name: taskName,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    input.value = "";

    displayTasks();
}


// Display Tasks

function displayTasks() {

    let taskList = document.getElementById("taskList");

    let searchValue = document.getElementById("searchInput").value.toLowerCase();

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(function(task) {

        let matchesSearch = task.name.toLowerCase().includes(searchValue);

        let matchesFilter = true;

        if (currentFilter === "active") {
            matchesFilter = !task.completed;
        }

        else if (currentFilter === "completed") {
            matchesFilter = task.completed;
        }

        return matchesSearch && matchesFilter;

    });


    filteredTasks.forEach(function(task) {

        let li = document.createElement("li");

        let checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.completed;

        checkbox.onchange = function() {
            toggleTask(task.id);
        };


        let span = document.createElement("span");

        span.textContent = task.name;

        span.className = "task-text";

        if (task.completed) {
            span.classList.add("completed");
        }


        // Edit Button

        let editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.className = "edit-btn";

        editButton.onclick = function() {
            editTask(task.id);
        };


        // Delete Button

        let deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-btn";

        deleteButton.onclick = function() {
            deleteTask(task.id);
        };


        let buttonDiv = document.createElement("div");

        buttonDiv.className = "task-buttons";

        buttonDiv.appendChild(editButton);

        buttonDiv.appendChild(deleteButton);


        li.appendChild(checkbox);

        li.appendChild(span);

        li.appendChild(buttonDiv);

        taskList.appendChild(li);

    });


    updateCounter();

}


// Edit Task

function editTask(id) {

    let task = tasks.find(function(task) {
        return task.id === id;
    });

    let newName = prompt("Edit your task:", task.name);

    if (newName !== null && newName.trim() !== "") {

        task.name = newName.trim();

        saveTasks();

        displayTasks();

    }

}


// Delete Task

function deleteTask(id) {

    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    saveTasks();

    displayTasks();

}


// Complete Task

function toggleTask(id) {

    tasks.forEach(function(task) {

        if (task.id === id) {

            task.completed = !task.completed;

        }

    });

    saveTasks();

    displayTasks();

}


// Filter Tasks

function filterTasks(filter) {

    currentFilter = filter;

    displayTasks();

}


// Clear Completed Tasks

function clearCompleted() {

    tasks = tasks.filter(function(task) {
        return !task.completed;
    });

    saveTasks();

    displayTasks();

}


// Update Task Counter

function updateCounter() {

    let total = tasks.length;

    let completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    let active = total - completed;

    document.getElementById("totalTasks").textContent = total;

    document.getElementById("activeTasks").textContent = active;

    document.getElementById("completedTasks").textContent = completed;

}


// Save Tasks in Local Storage

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}


// Display tasks when application starts

displayTasks();
