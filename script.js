// Get references to elements
const taskForm = document.getElementById('taskForm');
const tasksTableDiv = document.getElementById('tasksTableDiv');
const taskFormDiv = document.getElementById('taskFormDiv');
const tasksTableBody = document.getElementById('tasksTableBody');
const viewTasksButton = document.getElementById('viewTasksButton');
const backToTaskManagementButton = document.getElementById('backToTaskManagementButton');
const taskIndexInput = document.getElementById('taskIndex');

// Load tasks from localStorage (if any)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Handle task form submission
taskForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const taskIndex = taskIndexInput.value; // Get the task index from the hidden input field
    const taskName = document.getElementById('taskName').value;
    const taskCategory = document.getElementById('taskCategory').value;
    const taskPriority = document.getElementById('taskPriority').value;
    const taskDueDate = document.getElementById('taskDueDate').value;

    if (taskIndex !== "") {
        // Edit existing task
        tasks[taskIndex] = {
            name: taskName,
            category: taskCategory,
            priority: taskPriority,
            dueDate: taskDueDate,
            completed: tasks[taskIndex].completed
        };
        alert('Task updated successfully!');
    } else {
        // Add new task
        const newTask = {
            name: taskName,
            category: taskCategory,
            priority: taskPriority,
            dueDate: taskDueDate,
            completed: false
        };
        tasks.push(newTask);
        alert('Task added successfully!');
    }

    // Save tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Reset the form and refresh task list
    taskForm.reset();
    taskIndexInput.value = "";  // Reset the task index (for new task creation)
    viewTasksButton.click(); // Refresh the task list view
});

// Handle the "View Tasks" button click
viewTasksButton.addEventListener('click', function () {
    // Hide the form and show the table
    taskFormDiv.style.display = 'none';
    tasksTableDiv.style.display = 'block';

    // Populate the table with tasks
    tasksTableBody.innerHTML = ''; // Clear the table
    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="${task.completed ? 'completed-task' : ''}">${task.name}</td>
            <td class="${task.completed ? 'completed-task' : ''}">${task.category}</td>
            <td class="${task.completed ? 'completed-task' : ''}">${task.priority}</td>
            <td class="${task.completed ? 'completed-task' : ''}">${task.dueDate}</td>
            <td><input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTaskComplete(${index})"></td>
            <td><button class="edit-btn" onclick="editTask(${index})">Edit</button></td>
            <td><button class="delete-btn" onclick="deleteTask(${index})">Delete</button></td>
        `;
        tasksTableBody.appendChild(row);
    });
});

// Handle the "Back to Task Management" button click
backToTaskManagementButton.addEventListener('click', function () {
    // Hide the table and show the form
    taskFormDiv.style.display = 'block';
    tasksTableDiv.style.display = 'none';
});

// Function to mark task as complete
function toggleTaskComplete(index) {
    tasks[index].completed = !tasks[index].completed; // Toggle the task completion status
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated tasks to localStorage
    viewTasksButton.click(); // Refresh the task list view
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1); // Remove the task from the array
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated tasks to localStorage
    viewTasksButton.click(); // Refresh the task list view
}

// Function to edit a task
function editTask(index) {
    const task = tasks[index];

    // Pre-fill the form with the task data
    document.getElementById('taskName').value = task.name;
    document.getElementById('taskCategory').value = task.category;
    document.getElementById('taskPriority').value = task.priority;
    document.getElementById('taskDueDate').value = task.dueDate;

    // Set the task index in the hidden input (to identify it for editing)
    taskIndexInput.value = index;

    // Show the form (and hide the table)
    taskFormDiv.style.display = 'block';
    tasksTableDiv.style.display = 'none';
}
