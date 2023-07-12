import './style.css';

const tasklist = document.getElementById('list-item');
const taskInput = document.getElementById('task-input');
const clearall = document.querySelector('#clearall');
let tasks = [];
// save to local storage the object coming from the tasks array
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// updating the index of the array elements by order
function updateTaskIndexes() {
  tasks.forEach((task, i) => {
    task.index = i + 1;
  });
}
// deleting elements by the splice method by index one by one
function deleteTask(index) {
  tasks.splice(index, 1);
  updateTaskIndexes();
  saveTasksToLocalStorage();
}

// displaying the elemnts to the current dom with events
function renderTasks() {
  tasklist.innerHTML = '';
  tasks.forEach((element, index) => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'li-div';

    const taskText = document.createElement('div');
    taskText.id = 'li-id';
    taskText.innerHTML = `<input type="checkbox"><p class="description">${element.description}</p>`;
    taskDiv.appendChild(taskText);

    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fa-solid delete fa-ellipsis-vertical';
    taskDiv.appendChild(deleteIcon);

    tasklist.appendChild(taskDiv);

    const checkbox = taskText.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        taskText.style.textDecoration = 'line-through';

        deleteIcon.addEventListener('click', () => {
          deleteTask(index);
          renderTasks();
        });
      } else {
        taskText.style.textDecoration = 'none';
      }
    });

    const Span = taskText.querySelector('.description');
    Span.addEventListener('click', () => {
      Span.contentEditable = true;
    });
  });

  clearall.addEventListener('click', () => {
    tasklist.innerHTML = '';
    tasks = [];
    localStorage.removeItem('tasks');
  });
}
// just to make sure if there was an items in the local storage we grap it
if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  renderTasks();
}
// assigning the object to the array with the input value
function addTask(description) {
  const newTask = {
    description,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(newTask);
  renderTasks();
  saveTasksToLocalStorage();
  taskInput.value = '';
}

document.getElementById('task-input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && taskInput.value !== '') {
    // important part which takes the value data coming from the input to our object in the array
    addTask(taskInput.value);
  }
});

document.querySelector('.sign').addEventListener('click', () => {
  if (taskInput.value !== '') {
    addTask(taskInput.value);
  }
});
