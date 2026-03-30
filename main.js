// Select elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Load tasks from Local Storage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Event Listener for adding a new task
todoForm.addEventListener('submit', addTask);

// Functions
function addTask(e) {
    e.preventDefault(); // Prevent form submission

    const taskText = todoInput.value.trim();

    if (taskText !== '') {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        addTaskToDOM(task);
        saveTaskToLocalStorage(task);

        // Clear the input field
        todoInput.value = '';
    }
}

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.className = `todo-item${task.completed ? ' completed' : ''}`;
    li.dataset.id = task.id;

    li.innerHTML = `
        <input type="checkbox" class="complete-checkbox" ${task.completed ? 'checked' : ''}>
        <span class="task">${task.text}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;

    todoList.appendChild(li);

    // Attach event listeners
    attachEventListeners(li, task);
}

function attachEventListeners(li, task) {
    const checkbox = li.querySelector('.complete-checkbox');
    const editButton = li.querySelector('.edit-btn');
    const deleteButton = li.querySelector('.delete-btn');

    checkbox.addEventListener('change', function () {
        toggleTaskCompletion(task.id, li, checkbox.checked);
    });

    editButton.addEventListener('click', function () {
        handleEdit(task.id, li);
    });

    deleteButton.addEventListener('click', function () {
        handleDelete(task.id, li);
    });
}

function handleDelete(taskId, li) {
    deleteTask(taskId);
    li.remove();
}

function handleEdit(taskId, li) {
    const taskSpan = li.querySelector('.task');
    const newTaskText = prompt('Edit your task:', taskSpan.textContent);

    if (newTaskText !== null && newTaskText.trim() !== '') {
        updateTask(taskId, newTaskText);
        taskSpan.textContent = newTaskText;
    }
}

function toggleTaskCompletion(taskId, li, isCompleted) {
    const tasks = getTasksFromLocalStorage();
    const task = tasks.find(task => task.id == taskId);
    if (task) {
        task.completed = isCompleted;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        li.classList.toggle('completed', isCompleted);
    }
}

function deleteTask(id) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.id != id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTask(id, newText) {
    const tasks = getTasksFromLocalStorage();
    const task = tasks.find(task => task.id == id);
    if (task) {
        task.text = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function loadTasks() {
    const tasks = getTasksFromLocalStorage();

    tasks.forEach(task => {
        addTaskToDOM(task);
    });
}

function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');

    return tasks ? JSON.parse(tasks) : [];
}

function saveTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
