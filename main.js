//Define Ui Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners

loadEventListeners();


// Load all event listeners
function loadEventListeners() {
  // Dom Load Event 
  document.addEventListener('DOMContentLoaded', getTasks)
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

//Showing Saved Items From Local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task) {
    //Creating Ui Elements
    const li = document.createElement('li');
    //Add a class
    li.className = 'collection-item';
    //Create Text Node And Append To Li
    li.appendChild(document.createTextNode(task));
    //Create New Link Element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    //Add Icon HTML
    link.innerHTML = '<i class="small material-icons">cancel</i>';
    //Append Link To Li
    li.appendChild(link);

    // Append Li To The Ul
    taskList.appendChild(li);
  });
}

//Add Task Callback
function addTask(e) {
  if (taskInput.value === '') {
    alert('Please add a task')
  }

  //Creating Ui Elements
  const li = document.createElement('li');
  //Add a class
  li.className = 'collection-item';
  //Create Text Node And Append To Li
  li.appendChild(document.createTextNode(taskInput.value));
  //Create New Link Element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  //Add Icon HTML
  link.innerHTML = '<i class="small material-icons">cancel</i>';
  //Append Link To Li
  li.appendChild(link);

  // Append Li To The Ul
  taskList.appendChild(li);

  //Store In Local Storage
  storeTaskInLocalStorage(taskInput.value);

  //Clear Input
  taskInput.value = '';

  e.preventDefault();
}

//Store Task 
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task Function
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove()
      //Remove From Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
  }
}

//Remove From Local Storage Function
function removeTaskFromLocalStorage(taskItem)
{
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  
  tasks.forEach(function(task) {
   if(taskItem.textContent === task) {
     task.splice(index, 1)
   }
  });
  
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Clear Tasks
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  //Calling The Function
  clearTasksFromLocalStorage();
}

//Clear Tasks From Local Storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
