
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks(){

    const tasks = getTasksFromlocalStorage();

    tasks.forEach(task => {
        addTaskToDOM(task)
        
    });

};

//adding submit

todoForm.addEventListener("submit", addTask);

function addTask(e) {
    e.preventDefault();

    const taskText = todoInput.value.trim();

    // console.log(new Date(Date.now()).getFullYear());

    if (taskText !== "") {

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false

        }
        addTaskToDOM(task);
        saveTaskToLocal(task)

        todoInput.value = "";

    }

}

function addTaskToDOM(task) {

    const li = document.createElement("li");
    li.className = `todo-item ${task.completed ? "completed" : "" }`;
    li.dataset.id = task.id;
    li.innerHTML = `<input type="checkbox" class="complete-checkbox">
                <span class="task">${task.text}</span>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>`

todoList.appendChild(li);


attachEventListener(li, task)


}
function attachEventListener(li, task){
    const deleteBtn = li.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function(){
        handleDelete(task.id, li)
    })

}

function handleDelete(id, li){
    let tasks = getTasksFromlocalStorage();
    tasks = tasks.filter(task => task.id != id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    li.remove();
    console.log(tasks)
}
function saveTaskToLocal(task){
    const oldTasks = getTasksFromlocalStorage();

    oldTasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(oldTasks))
}

function getTasksFromlocalStorage(){
    const oldTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    return oldTasks

}

