# Ex03 - To-Do List Application Using JavaScript

### Date: 16-11-2026
### Name: IYYAPPAN S
### Register Number: 212225230108

## AIM
To create a fully functional To-Do List Application using HTML, CSS, and JavaScript with features such as adding, editing, deleting, searching, filtering, and completing tasks. The application also uses Local Storage to save tasks even after refreshing or closing the browser.

## ALGORITHM

### STEP 1: Build the HTML Structure (index.html)
Create the basic structure of the To-Do application using HTML. Add a heading, task input field, Add Task button, search box, filter buttons, task list, and task counters.

### STEP 2: Style the Application (style.css)
Use CSS to design the application with an attractive layout, proper spacing, colors, buttons, backgrounds, and responsive elements.

### STEP 3: Plan the Features
Identify and plan the essential features of the To-Do application:

- Add new tasks.
- Display all tasks.
- Edit existing tasks.
- Delete individual tasks.
- Mark tasks as completed.
- Search tasks by name.
- Filter tasks (All, Active, Completed).
- Clear all completed tasks.
- Display total, active, and completed task counts.
- Store tasks using Local Storage.

### STEP 4: Create the To-Do Application Using JavaScript
Create the JavaScript file (script.js) and initialize an array to store task details. Use JavaScript objects to maintain task ID, task name, and completion status.

### STEP 5: Add Functionalities
Implement JavaScript functions for all application operations:

- `addTask()` – Adds a new task.
- `displayTasks()` – Displays tasks on the webpage.
- `editTask()` – Updates an existing task.
- `deleteTask()` – Deletes a selected task.
- `toggleTask()` – Changes the completion status.
- `filterTasks()` – Filters tasks based on their status.
- `clearCompleted()` – Removes completed tasks.
- `updateCounter()` – Updates task statistics.
- `saveTasks()` – Saves tasks in Local Storage.

### STEP 6: Implement Local Storage
Use `localStorage.setItem()` to save task details and `localStorage.getItem()` to retrieve previously saved tasks. Use `JSON.stringify()` and `JSON.parse()` to convert task data between JavaScript objects and JSON format.

### STEP 7: Test the Application
Test all functionalities by adding, editing, deleting, completing, searching, and filtering tasks. Verify that task counters display the correct values.

### STEP 8: Fix Styling Issues and Refine the Application
Check the application layout, button alignment, input fields, task list, and overall appearance. Correct any errors and improve the user interface.

### STEP 9: Open the HTML File in a Browser
Run the `index.html` file using a browser or the VS Code Live Server extension. Verify that all features work correctly.

### STEP 10: Deploy the Website
Upload the project files to a GitHub repository and enable GitHub Pages to host the To-Do List application online for free.

## PROGRAM

The application is developed using three files:

1. **index.html** – Defines the structure of the application.
2. **style.css** – Provides styling and visual design.
3. **script.js** – Implements all application functionalities using JavaScript.

### HTML CODE:
```
<!DOCTYPE html>
<html>
<head>
    <title>TODO List Application</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="container">

        <h1>My TODO List</h1>


        <div class="input-section">

            <input type="text" id="taskInput"
            placeholder="Enter your task">

            <button onclick="addTask()">Add Task</button>

        </div>

        <input type="text" id="searchInput"
        placeholder="Search tasks..." onkeyup="displayTasks()">

        <div class="filter-buttons">

            <button onclick="filterTasks('all')">All</button>

            <button onclick="filterTasks('active')">Active</button>

            <button onclick="filterTasks('completed')">Completed</button>

        </div>

        
        <ul id="taskList"></ul>

        <div class="counter">

            <p>Total Tasks: <span id="totalTasks">0</span></p>

            <p>Active Tasks: <span id="activeTasks">0</span></p>

            <p>Completed Tasks: <span id="completedTasks">0</span></p>

        </div>

        <button class="clear-btn" onclick="clearCompleted()">
            Clear Completed Tasks
        </button>

    </div>

    <script src="script.js"></script>

</body>
</html>
```

## CSS CODE:
```
body {
    font-family: Arial, sans-serif;
    background-color: #f0f2f5;
    margin: 0;
    padding: 30px;
}

.container {
    width: 450px;
    margin: auto;
    background-color: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 0 10px gray;
}

h1 {
    text-align: center;
    color: #333;
}

.input-section {
    display: flex;
    gap: 10px;
}

input {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 15px;
}

#taskInput {
    flex: 1;
}

#searchInput {
    width: 95%;
    margin-top: 15px;
}

button {
    padding: 10px 15px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.filter-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 20px 0;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f5f5f5;
    padding: 12px;
    margin-bottom: 10px;
    border-radius: 5px;
}

.completed {
    text-decoration: line-through;
    color: gray;
}

.task-text {
    flex: 1;
    margin-left: 10px;
    overflow-wrap: anywhere;
}

.task-buttons {
    display: flex;
    gap: 5px;
}

.edit-btn {
    background-color: orange;
}

.delete-btn {
    background-color: red;
}

.counter {
    margin-top: 20px;
    padding: 10px;
    background-color: #e9f2ff;
    border-radius: 5px;
}

.clear-btn {
    width: 100%;
    background-color: #dc3545;
    margin-top: 10px;
}
```

## JavaScript File(script.js)
```

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

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


        let editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.className = "edit-btn";

        editButton.onclick = function() {
            editTask(task.id);
        };


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



function deleteTask(id) {

    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    saveTasks();

    displayTasks();

}

function toggleTask(id) {

    tasks.forEach(function(task) {

        if (task.id === id) {

            task.completed = !task.completed;

        }

    });

    saveTasks();

    displayTasks();

}


function filterTasks(filter) {

    currentFilter = filter;

    displayTasks();

}


function clearCompleted() {

    tasks = tasks.filter(function(task) {
        return !task.completed;
    });

    saveTasks();

    displayTasks();

}

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

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

displayTasks();
```

## Output:
<img width="1535" height="818" alt="image" src="https://github.com/user-attachments/assets/5448e83f-7970-4042-9064-3fa7b999d6fb" />

<img width="1535" height="819" alt="image" src="https://github.com/user-attachments/assets/6e37110f-251c-4e75-a652-3f7a376e1d94" />

